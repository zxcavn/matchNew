import type { BaseGetTokensParams, BasePaginationParams, BasePaginationResponse } from '@/crud';

export type GetTokenInventoryParams = Partial<BaseGetTokensParams> &
  Omit<BasePaginationParams, 'limit' | 'page'> & { limit?: number; page?: number } & Partial<{
    contractAddress: string;
    creatorAddress: string;
    tokenIds: string;
  }> & { ownerAddress: string };

export type AttributeNftItem = Partial<{
  trait_type: string;
  display_type: string;
  value: string;
}>;

export type TokenInventoryItemMetadata = Partial<{
  image: string;
  image_data: string;
  external_url: string;
  description: string;
  name: string;
  attributes: AttributeNftItem[];
  background_color: string;
  animation_url: string;
  youtube_url: string;
}>;

export type TokenInventoryItem = {
  contractAddress: string;
  creatorAddress?: string;
  ownerAddress: string;
  tokenSymbol?: string;
  tokenName?: string;
  tokenURI?: string;
  blockNumber?: number;
  metadata?: TokenInventoryItemMetadata;
  tokenId: string;
  tokenType?: string;
  timestamp?: string;
  transferCount?: number;
};
export type TokenInventoryResponse = TokenInventoryItem;
export type TokenInventoryListResponse = BasePaginationResponse<TokenInventoryItem>;
