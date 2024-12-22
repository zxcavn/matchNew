import { createSlice } from '@reduxjs/toolkit';

import { getValidatorsAsync } from '@/store/validators/thunk';
import { SLICE_NAME, ValidatorsInitialState } from '@/store/validators/types';

const initialState: ValidatorsInitialState = {
  loading: false,
  error: null,
  data: [],
};

const validatorsSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getValidatorsAsync.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getValidatorsAsync.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.loading = false;
    });
    builder.addCase(getValidatorsAsync.rejected, (state, { payload }) => {
      state.loading = false;
      if (payload) state.error = payload;
    });
  },
});

export default validatorsSlice.reducer;
