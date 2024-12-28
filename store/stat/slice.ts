import { createSlice } from '@reduxjs/toolkit';

import { getStatisticAsync } from './thunk';
import { type StatState, PREFIX } from './types';

const initialState: StatState = {
  data: {
    stakedCoins: [],
  },
  isLoading: false,
};

const statSlice = createSlice({
  name: PREFIX,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getStatisticAsync.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getStatisticAsync.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
    });
    builder.addCase(getStatisticAsync.rejected, state => {
      state.isLoading = false;
    });
  },
});

export default statSlice.reducer;
