import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LocalStorageService } from '@/services/localStorage';

import { initAppAsync } from './thunk';
import { AppInitialState, AutoLockData, SLICE_NAME } from './types';

const initialState: AppInitialState = {
  loading: true,
  error: null,
  autoDetectToken: LocalStorageService.getAutoDetectToken() || false,
  autoDetectNft: LocalStorageService.getAutoDetectNft(),
  autoLock: LocalStorageService.getAutoLockData(),
};

const appSlice = createSlice({
  name: SLICE_NAME,
  initialState,

  reducers: {
    setAppLoading(state, { payload }: PayloadAction<boolean>) {
      state.loading = payload;
    },
    setAutoDetectToken(state, { payload }: PayloadAction<boolean>) {
      state.autoDetectToken = payload;
      LocalStorageService.setAutoDetectToken(payload);
    },
    setAutoDetectNft(state, { payload }: PayloadAction<boolean>) {
      state.autoDetectNft = payload;
      LocalStorageService.setAutoDetectNft(payload);
    },
    setAutoLockData(state, { payload }: PayloadAction<AutoLockData>) {
      state.autoLock = payload;
      LocalStorageService.setAutoLockData(payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(initAppAsync.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(initAppAsync.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(initAppAsync.rejected, (state, { payload }) => {
      state.loading = false;

      if (payload) state.error = payload;
    });
  },
});

export const { setAutoDetectNft, setAppLoading, setAutoDetectToken, setAutoLockData } = appSlice.actions;

export default appSlice.reducer;
