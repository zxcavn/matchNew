import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  checkExchangeBuyXfiAsync,
  checkMissionProgressAsync,
  checkSocialNetworkSubscriptionAsync,
  checkSwapMissionAsync,
  getMissionsAsync,
} from './thunk';
import { MissionState, SLICE_NAME } from './types';

const initialState: MissionState = {
  data: null,
  isLoading: false,
  isSwapMissionSuccess: false,
  isCheckBuyXfiSuccess: false,
  error: null,
};

const missionSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setIsSwapMissionSuccess: (state, { payload }: PayloadAction<boolean>) => {
      state.isSwapMissionSuccess = payload;
    },
    setIsCheckBuyXfiSuccess: (state, { payload }: PayloadAction<boolean>) => {
      state.isCheckBuyXfiSuccess = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getMissionsAsync.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getMissionsAsync.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
    });
    builder.addCase(getMissionsAsync.rejected, (state, { payload }) => {
      state.isLoading = false;

      if (payload) state.error = payload;
    });
    builder.addCase(checkMissionProgressAsync.pending, (state, { meta }) => {
      state.isLoading = true;
      state.checkProgressMissionId = meta.arg.missionId;
    });
    builder.addCase(checkMissionProgressAsync.fulfilled, state => {
      state.isLoading = false;
      state.checkProgressMissionId = null;
    });
    builder.addCase(checkMissionProgressAsync.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
      state.checkProgressMissionId = null;
    });
    builder.addCase(checkSwapMissionAsync.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(checkSwapMissionAsync.fulfilled, state => {
      state.isLoading = false;
      state.isSwapMissionSuccess = true;
    });
    builder.addCase(checkSwapMissionAsync.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
    builder.addCase(checkExchangeBuyXfiAsync.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(checkExchangeBuyXfiAsync.fulfilled, state => {
      state.isLoading = false;
      state.isCheckBuyXfiSuccess = true;
    });
    builder.addCase(checkExchangeBuyXfiAsync.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
    builder.addCase(checkSocialNetworkSubscriptionAsync.pending, (state, { meta }) => {
      state.isLoading = true;
      state.checkProgressMissionId = meta.arg.missionId;
    });
    builder.addCase(checkSocialNetworkSubscriptionAsync.fulfilled, state => {
      state.isLoading = false;
      state.checkProgressMissionId = null;
    });
    builder.addCase(checkSocialNetworkSubscriptionAsync.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
      state.checkProgressMissionId = null;
    });
  },
});

export const { setIsSwapMissionSuccess, setIsCheckBuyXfiSuccess } = missionSlice.actions;

export default missionSlice.reducer;
