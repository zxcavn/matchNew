import type { CosmosCurrency } from '@/shared/types';

export enum ChainRewardRecipientType {
  VALIDATORS = 'VALIDATORS',
  TMPX = 'TMPX',
  ZEALY = 'ZEALY',
  XFT = 'XFT',
}

export const isChainRewardRecipientType = (type: string): type is ChainRewardRecipientType => {
  return (<string[]>[
    ChainRewardRecipientType.VALIDATORS,
    ChainRewardRecipientType.TMPX,
    ChainRewardRecipientType.ZEALY,
    ChainRewardRecipientType.XFT,
  ]).includes(type);
};

export enum ChainRewardType {
  AMOUNT = 'AMOUNT',
}

export enum ChainRewardClaimStatus {
  NOT_CLAIM = 'NOT_CLAIM',
  CLAIM = 'CLAIM',
}

export type ChainReward = {
  type: ChainRewardType;
  amount: number;
  currency: CosmosCurrency;
};

export type ChainRewardResponse = {
  id: string;
  recipientType: ChainRewardRecipientType;
  recipientAddress: string;
  reward: ChainReward;
  claimStatus: ChainRewardClaimStatus;
};

export type ChainRewardsResponse = {
  docs: ChainRewardResponse[];
};

export type GetChainRewardsParams = {
  limit: number;
  offset: number;
};

export type ClaimChainRewardsParams = {
  id: string;
  hash?: string;
};

export type ClaimChainRewardsResponse = {
  ok: boolean;
};
