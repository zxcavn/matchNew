import { BaseGetTokensParams, BasePaginationParams, BasePaginationResponse } from '@/crud/types';

export type TokenResponse = {
  contractAddress: string;
  tokenSymbol?: string;
  name?: string;
  decimals?: number;
};

export type TokenHoldersResponse = {
  contractAddress: string;
  tokenSymbol?: string;
  tokenName?: string;
  decimals?: number;
  balance?: string;
};

export type GetTokenParams = BaseGetTokensParams &
  BasePaginationParams &
  Partial<{
    tokenSymbol: string;
  }>;

export type GetTokenHoldersParams = BaseGetTokensParams &
  BasePaginationParams &
  Partial<{
    tokenSymbol: string;
    address: string;
    contractAddress: string;
    blockNumber: number;
  }>;

export type TokensResponse = BasePaginationResponse<TokenResponse>;
export type TokensHoldersResponse = BasePaginationResponse<TokenHoldersResponse>;

export const TOKEN_SELECT = (<Array<keyof TokenResponse>>['contractAddress', 'tokenSymbol', 'name', 'decimals']).join(
  ' '
);
