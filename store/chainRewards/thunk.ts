import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  type ChainRewardsResponse,
  ClaimChainRewardsParams,
  ClaimChainRewardsResponse,
  GetChainRewardsParams,
  xfiPadApi,
} from '@/crud/xfiPad';
import { getApiErrorMessage } from '@/helpers';

import { ChainRewardsFetchMethod } from './types';

const GET_CHAIN_REWARDS_PARAMS: GetChainRewardsParams = {
  offset: 0,
  limit: 100,
};

export const getChainRewardsAsync = createAsyncThunk<ChainRewardsResponse, void, { rejectValue: string }>(
  ChainRewardsFetchMethod.getChainRewardsAsync,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await xfiPadApi.getChainRewards(GET_CHAIN_REWARDS_PARAMS);

      return data;
    } catch (error) {
      return rejectWithValue(getApiErrorMessage(error));
    }
  }
);

export const claimChainRewardsAsync = createAsyncThunk<
  ClaimChainRewardsResponse,
  ClaimChainRewardsParams,
  { rejectValue: string }
>(ChainRewardsFetchMethod.claimChainRewardsAsync, async (params, { rejectWithValue }) => {
  try {
    const { data } = await xfiPadApi.claimChainRewards(params);

    if (!data.ok) {
      throw new Error('Claim chain reward errors');
    }

    return data;
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});
