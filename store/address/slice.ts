import { createSlice } from '@reduxjs/toolkit';

import { getAddressInfoAsync } from '@/store/address/thunk';
import { AddressInitialState, SLICE_NAME } from '@/store/address/types';

const initialState: AddressInitialState = {
  loading: false,
  error: null,
  data: {},
};

const addressSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAddressInfoAsync.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAddressInfoAsync.fulfilled, (state, { payload }) => {
      state.data[payload.address] = payload.data;
      state.loading = false;
    });
    builder.addCase(getAddressInfoAsync.rejected, (state, { payload }) => {
      state.loading = false;
      if (payload) state.error = payload;
    });
  },
});

export default addressSlice.reducer;
