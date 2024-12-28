import { BaseGetTokensParams, BasePaginationParams, BasePaginationResponse, TokenType } from '../../types';
import type { XdsNameShortResponse } from './xds';

export type TokenTransferResponse = {
  contractAddress: string;
  tokenSymbol: string;
  decimals: number;
  blockNumber: number;
  txHash: string;
  addressFrom: string;
  addressTo: string;
  timestamp: string;
  tokenName: string;
  xds?: Array<XdsNameShortResponse>;
} & ({ tokenType: TokenType.CFC_721; tokenId: string } | { tokenType: TokenType.CFC_20; quant: string });

export type GetTokenTransfersParams = BaseGetTokensParams &
  BasePaginationParams &
  Partial<{
    addressTo: string;
    addressFrom: string;
    address: string;
  }>;

export type TokenTransfersResponse = BasePaginationResponse<TokenTransferResponse>;
