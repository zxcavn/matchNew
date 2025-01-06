import { isAddress } from 'ethers';
import { useCallback } from 'react';

import { ConnectionType } from '@/hocs/WalletConnectionProvider';
import { CosmosService } from '@/services';
import { EthersService } from '@/services/evm';
import { EMPX_TOKEN, EVM_EXTRA_TOKEN, IS_STAGING, MPX_CHEQUE_TOKEN } from '@/shared/constants';
import { EMpxToken } from '@/shared/types';
import { getChainRewardsAsync } from '@/store/chainRewards';


import useAppDispatch from './useAppDispatch';

const useFetchWalletInitialData = () => {
  const dispatch = useAppDispatch();

  const getInitialOldAddressData = useCallback(async () => {
    try {
      const service = CosmosService.getInstance();
      const { oldWallet } = await service.getAccounts();

    } catch (error) {
      console.error('useFetchWalletInitialData: getInitialOldAddressData:', error);
    }
  }, [dispatch]);

  const getInitialExtraTokenData = useCallback(async () => {
    try {
      if (!isAddress(EVM_EXTRA_TOKEN)) return;

      const service = EthersService.getInstance();
      const extraTokenData = await service.getErc20TokenInfo({ contractAddress: EVM_EXTRA_TOKEN });
      const balance = await service.balanceOfContract({ address: EVM_EXTRA_TOKEN });


    } catch (error) {

      console.error('useFetchWalletInitialData: getInitialExtraTokenData:', error);
    }
  }, [dispatch]);

  const getInitialEmpxTokensData = useCallback(async () => {
    const tokens: { key: EMpxToken; address: string }[] = [
      { key: EMpxToken.eMpx, address: EMPX_TOKEN },
      { key: EMpxToken.mpxCheque, address: MPX_CHEQUE_TOKEN },
    ];

    const service = EthersService.getInstance();

    const promises = tokens.map(async ({ key, address }) => {
      if (!isAddress(address)) return;

      try {
        const tokenData = await service.getErc20TokenInfo({ contractAddress: address });
        const balance = await service.balanceOfContract({ address });


      } catch (error) {
        console.error(`useFetchWalletInitialData: getInitialEmpxTokensData for ${key}:`, error);

      }
    });

    await Promise.all(promises);
  }, [dispatch]);

  const fetchChainRewards = useCallback(async () => {
    if (!IS_STAGING) {
      await dispatch(getChainRewardsAsync()).unwrap().catch(console.error);
    }
  }, [dispatch]);

  return useCallback(
    async (connectionType: ConnectionType) => {
      if (connectionType === ConnectionType.MNEMONIC) {
        await getInitialOldAddressData();
      }

      getInitialExtraTokenData();
      getInitialEmpxTokensData();
      await fetchChainRewards();
    },
    [getInitialOldAddressData, getInitialExtraTokenData, getInitialEmpxTokensData, fetchChainRewards]
  );
};

export default useFetchWalletInitialData;
