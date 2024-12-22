import { createAsyncThunk } from '@reduxjs/toolkit';
import uniqBy from 'lodash/uniqBy';

import { TokenType } from '@/crud';
import { api } from '@/crud/xfiScan/api';
import { EthersService } from '@/services/evm';

import type { RootState } from '../index';
import { DEFAULT_TOKEN_DECIMALS } from '../txs/constants';
import { StorageToken, UpdateTokenFetchMethodsEnum } from './types';

type ThunkPayload = {
  emvWalletAddress: string;
};

type ThunkReturnValue = {
  emvWalletAddress: string;
  tokens: StorageToken[];
};

export const updateTokensListAsync = createAsyncThunk<ThunkReturnValue, ThunkPayload, { state: RootState }>(
  UpdateTokenFetchMethodsEnum.updateTokensListAsync,
  async (payload, { getState }) => {
    const { emvWalletAddress } = payload;
    const tokens = getState().walletTokens.tokens[emvWalletAddress] || [];

    try {
      const tokensHolders = await api.getTokensHolders({
        address: emvWalletAddress,
        page: 1,
        limit: 100,
        tokenType: TokenType.CFC_20,
      });

      const updateTokensHolders = tokensHolders.data.docs.map(item => {
        return {
          name: item.tokenName || '',
          symbol: item.tokenSymbol || '',
          decimals: item.decimals || DEFAULT_TOKEN_DECIMALS,
          contractAddress: item.contractAddress.toLowerCase() || '',
          balance: item.balance || '',
        };
      });

      return {
        emvWalletAddress,
        tokens: uniqBy([...tokens, ...updateTokensHolders], el => el.contractAddress.toLowerCase()),
      };
    } catch {
      return {
        emvWalletAddress,
        tokens,
      };
    }
  }
);

export const updateTokenBalancesAsync = createAsyncThunk<ThunkReturnValue, ThunkPayload, { state: RootState }>(
  UpdateTokenFetchMethodsEnum.updateTokenBalances,
  async (payload, { getState }) => {
    const { emvWalletAddress } = payload;
    const tokens = getState().walletTokens.tokens[emvWalletAddress] || [];
    const defaultResult = { emvWalletAddress, tokens };

    if (!tokens.length) {
      return defaultResult;
    }

    try {
      const ethersService = EthersService.getInstance();

      const result = await Promise.allSettled(
        tokens.map(({ contractAddress }) => ethersService.balanceOfContract({ address: contractAddress }))
      );

      const updatedTokens = result.map((promiseResult, index) =>
        promiseResult.status === 'fulfilled'
          ? {
              ...tokens[index],
              balance: promiseResult.value,
            }
          : tokens[index]
      );

      return {
        emvWalletAddress,
        tokens: updatedTokens,
      };
    } catch {
      return defaultResult;
    }
  }
);
