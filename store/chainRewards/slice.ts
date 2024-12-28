import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { claimChainRewardsAsync, getChainRewardsAsync } from './thunk';
import { ChainRewardsState, SLICE_NAME } from './types';

const initialState: ChainRewardsState = {
  rewards: {
    data: [],
    error: null,
    isLoading: false,
  },
  claim: {
    isLoading: false,
    error: null,
  },
};

const chainRewardsSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setClaimRewardId: (state, { payload }: PayloadAction<string | null>) => {
      state.claim.rewardId = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getChainRewardsAsync.pending, state => {
      state.rewards.isLoading = true;
      state.rewards.error = null;
    });
    builder.addCase(getChainRewardsAsync.fulfilled, (state, { payload }) => {
      state.rewards.isLoading = false;
      state.rewards.data = payload.docs;
    });
    builder.addCase(getChainRewardsAsync.rejected, (state, { payload }) => {
      state.rewards.isLoading = false;
      state.rewards.error = payload;
    });

    builder.addCase(claimChainRewardsAsync.pending, (state, { meta }) => {
      state.claim.isLoading = true;
      state.claim.error = null;
      state.claim.rewardId = meta.arg.id;
    });
    builder.addCase(claimChainRewardsAsync.fulfilled, state => {
      state.claim.isLoading = false;
      state.claim.rewardId = null;
    });
    builder.addCase(claimChainRewardsAsync.rejected, (state, { payload }) => {
      state.claim.isLoading = false;
      state.claim.error = payload;
      state.claim.rewardId = null;
    });
  },
});

export const { setClaimRewardId } = chainRewardsSlice.actions;

export default chainRewardsSlice.reducer;
