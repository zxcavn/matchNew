import { Erc20 } from '@/services/evm';
import { EMpxToken } from '@/shared/types';

export const SLICE_NAME = 'WALLET_TOKENS';

export const enum UpdateTokenFetchMethodsEnum {
  updateTokenBalances = `${SLICE_NAME}/updateTokenBalances`,
  updateTokensListAsync = `${SLICE_NAME}/updateTokensListAsync`,
}

export type StorageToken = Erc20.TokenInfo & { balance: string };

export type WalletStorageTokens = {
  [evmWalletAddress: string]: Array<StorageToken>;
};

export type EmpxTokens = {
  [key in EMpxToken]: StorageToken | null;
};

export type WalletTokensState = {
  tokens: WalletStorageTokens;
  isLoading: boolean;
  extraToken: {
    data: StorageToken | null;
  };
  eMpxTokens: EmpxTokens;
};
