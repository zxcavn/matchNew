import { useCallback, useMemo } from 'react';

import { autoDetectTokenSelector } from '@/store/app/selectors';
import { evmWalletAddressSelector } from '@/store/wallet';
import {
  addToken as addTokenAction,
  deleteToken as deleteTokenAction,
  StorageToken,
  updateTokenBalancesAsync,
  updateTokensListAsync,
  walletTokensSelector,
} from '@/store/walletTokens';

import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';

const useWalletTokens = () => {
  const dispatch = useAppDispatch();
  const address = useAppSelector(evmWalletAddressSelector);
  const autoDetectToken = useAppSelector(autoDetectTokenSelector);
  const { tokens: walletTokens, isLoading } = useAppSelector(walletTokensSelector);

  const tokens = useMemo(() => walletTokens[address] || [], [walletTokens, address]);

  const updateTokens = useCallback(async () => {
    if (autoDetectToken) {
      await dispatch(updateTokensListAsync({ emvWalletAddress: address })).unwrap();
    }

    dispatch(updateTokenBalancesAsync({ emvWalletAddress: address }));
  }, [address, autoDetectToken, dispatch]);

  const updateBalances = useCallback(() => {
    dispatch(updateTokenBalancesAsync({ emvWalletAddress: address }));
  }, [address, dispatch]);

  const addToken = useCallback(
    (token: StorageToken) => {
      dispatch(addTokenAction({ evmWalletAddress: address, token }));
    },
    [address, dispatch]
  );

  const deleteToken = useCallback(
    (contractAddress: string) => {
      dispatch(deleteTokenAction({ evmWalletAddress: address, contractAddress }));
    },
    [address, dispatch]
  );

  return {
    tokens,
    isLoading,
    updateBalances,
    addToken,
    deleteToken,
    updateTokens,
  };
};

export default useWalletTokens;
