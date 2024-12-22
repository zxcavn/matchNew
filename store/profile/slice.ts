import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProfileResponse } from '@/crud/xfiPad';
import { LocalStorageService } from '@/services';

import { authorizeAsync, getProfileAsync } from './thunk';
import type { ProfileState } from './types';
import { SLICE_NAME } from './types';

const initialState: ProfileState = {
  data: null,
  isLoading: false,
  isReady: false,
};

const profileSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    logout: state => {
      state.data = null;
      LocalStorageService.removeTokens();
    },
    updateBalance: (state, { payload }: PayloadAction<ProfileResponse['balance']>) => {
      if (state.data) {
        state.data.balance = payload;
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(getProfileAsync.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getProfileAsync.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
      state.isReady = true;
    });
    builder.addCase(getProfileAsync.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isReady = true;
      state.error = payload;
    });

    builder.addCase(authorizeAsync.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(authorizeAsync.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
    });
    builder.addCase(authorizeAsync.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
  },
});

export const { logout, updateBalance } = profileSlice.actions;

export default profileSlice.reducer;
