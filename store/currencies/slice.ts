import { createSlice } from '@reduxjs/toolkit';

import { getSwapCurrenciesAsync } from './thunk';
import { SLICE_NAME, SwapCurrenciesInitialState } from './types';

const initialState: SwapCurrenciesInitialState = {
  isLoading: false,
  error: null,
  docs: {},
};

const currenciesSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getSwapCurrenciesAsync.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getSwapCurrenciesAsync.fulfilled, (state, { payload }) => {
      state.docs = payload;
      state.isLoading = false;
    });
    builder.addCase(getSwapCurrenciesAsync.rejected, (state, { payload }) => {
      state.isLoading = false;
      if (payload) state.error = payload;
    });
  },
});

export default currenciesSlice.reducer;
