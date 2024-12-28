import { createSlice } from '@reduxjs/toolkit';

import { PREFIX } from './constants';
import { checkAuthAsync, getClaimCoinAsync, getLinkAsync } from './thunk';
import { FaucetState, FaucetWidgetStep } from './types';

const initialState: FaucetState = {
  tgAccount: null,
  tgAuthToken: null,
  step: FaucetWidgetStep.OPEN_TELEGRAM,
  mpx: {
    lastClaimTime: null,
    isLoading: false,
  },
  xfi: {
    lastClaimTime: null,
    isLoading: false,
  },
  isLoading: false,
  error: null,
};

const faucetSlice = createSlice({
  name: PREFIX,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getLinkAsync.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getLinkAsync.fulfilled, (state, { payload }) => {
      state.tgAuthToken = payload;
      state.step = FaucetWidgetStep.LOGIN_TELEGRAM;
      state.isLoading = false;
    });
    builder.addCase(getLinkAsync.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
    builder.addCase(checkAuthAsync.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(checkAuthAsync.fulfilled, (state, { payload }) => {
      state.tgAccount = payload;
      state.mpx.lastClaimTime = payload.mpx.lastClaimTime;
      state.xfi.lastClaimTime = payload.xfi.lastClaimTime;
      state.step = FaucetWidgetStep.CLAIM;
      state.isLoading = false;
    });
    builder.addCase(checkAuthAsync.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
    builder.addCase(getClaimCoinAsync.pending, (state, { meta }) => {
      state[meta.arg.coin].isLoading = true;
    });
    builder.addCase(getClaimCoinAsync.fulfilled, (state, { payload, meta }) => {
      state[meta.arg.coin].lastClaimTime = payload.lastClaimTime;
      state.step = FaucetWidgetStep.CLAIM;
      state[meta.arg.coin].isLoading = false;
    });
    builder.addCase(getClaimCoinAsync.rejected, (state, { meta }) => {
      state[meta.arg.coin].isLoading = false;
    });
  },
});

export default faucetSlice.reducer;
