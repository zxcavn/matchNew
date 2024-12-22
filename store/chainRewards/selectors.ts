import { ChainRewardClaimStatus, ChainRewardResponse, isChainRewardRecipientType } from '@/crud/xfiPad';
import { getProfileWalletAddresses } from '@/helpers';
import type { RootState } from '@/store';

import { createDeepEqualSelector } from '../helpers';
import { profileSelector } from '../profile';
import { ProfileState } from '../profile/types';
import { ChainRewardsState } from './types';

const chainRewardsSelector = (state: RootState) => state.chainRewards.rewards;

const getWalletChainRewards = (rewards: ChainRewardsState['rewards'], profile: ProfileState): ChainRewardResponse[] => {
  const rewardList = rewards.data;
  const { evm: evmAddress, cosmos: cosmosAddress } = getProfileWalletAddresses(profile.data);
  const profileAddressList = [evmAddress.toLowerCase(), cosmosAddress.toLowerCase()];

  return rewardList.filter(({ claimStatus, recipientAddress, recipientType }) => {
    return (
      claimStatus === ChainRewardClaimStatus.NOT_CLAIM &&
      isChainRewardRecipientType(recipientType) &&
      profileAddressList.includes(recipientAddress.toLowerCase())
    );
  });
};

export const isLoadingChainRewardsSelector = (state: RootState) => state.chainRewards.rewards.isLoading;
export const walletChainRewardsSelector = createDeepEqualSelector(
  chainRewardsSelector,
  profileSelector,
  getWalletChainRewards
);
export const hasWalletChainRewardsSelector = createDeepEqualSelector(
  walletChainRewardsSelector,
  rewards => !!rewards.length
);
export const claimChainRewardsSelector = (state: RootState) => state.chainRewards.claim;
