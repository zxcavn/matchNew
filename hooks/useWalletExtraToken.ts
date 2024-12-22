import { useCallback, useMemo } from 'react';

import { EthersService } from '@/services/evm';
import { EVM_EXTRA_TOKEN } from '@/shared/constants';
import { extraTokenSelector, updateExtraTokenBalance } from '@/store/walletTokens';

import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';

const useWalletExtraToken = () => {
  const dispatch = useAppDispatch();
  const { data: extraToken } = useAppSelector(extraTokenSelector);

  const service = useMemo(() => EthersService.getInstance(), []);

  const updateBalance = useCallback(async () => {
    if (!EthersService.isAddress(EVM_EXTRA_TOKEN)) return;

    const balance = await service.balanceOfContract({ address: EVM_EXTRA_TOKEN });

    if (balance) dispatch(updateExtraTokenBalance(balance));
  }, [service, dispatch]);

  return {
    updateBalance,
    extraToken,
  };
};

export default useWalletExtraToken;
