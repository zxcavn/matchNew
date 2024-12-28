import { useCallback, useMemo } from 'react';

import { EthersService } from '@/services/evm';
import { EMpxToken } from '@/shared/types';
import { eMpxTokensSelector, updateEMpxTokenBalance } from '@/store/walletTokens';

import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';

const useWalletEMpxToken = (tokenKey: EMpxToken) => {
  const dispatch = useAppDispatch();
  const eMpxTokens = useAppSelector(eMpxTokensSelector);
  const eMpxToken = eMpxTokens[tokenKey];

  const service = useMemo(() => EthersService.getInstance(), []);

  const updateBalance = useCallback(async () => {
    if (!eMpxToken) return;

    if (!EthersService.isAddress(eMpxToken.contractAddress)) return;

    const balance = await service.balanceOfContract({ address: eMpxToken.contractAddress });

    if (balance) dispatch(updateEMpxTokenBalance({ key: tokenKey, balance }));
  }, [dispatch, service, tokenKey, eMpxToken]);

  return {
    updateBalance,
    eMpxToken,
  };
};

export default useWalletEMpxToken;
