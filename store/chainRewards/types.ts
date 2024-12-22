import type { ChainRewardResponse } from '@/crud/xfiPad';

export const SLICE_NAME = 'CHAIN_REWARDS';

export type ChainRewardsState = {
  rewards: {
    data: ChainRewardResponse[];
    isLoading?: boolean;
    error?: string | null;
  };
  claim: {
    isLoading?: boolean;
    rewardId?: string | null;
    error?: string | null;
  };
};

export enum ChainRewardsFetchMethod {
  getChainRewardsAsync = `${SLICE_NAME}/getChainRewardsAsync`,
  claimChainRewardsAsync = `${SLICE_NAME}/claimChainRewardsAsync`,
}
