import { createSlice } from '@reduxjs/toolkit';

import { DEFAULT_SHORT_PAGINATED_STATE } from '@/shared/types';

import { getTokenTransfersAsync, getTransactionsAsync } from './thunk';
import { GetTransactionsParams, SLICE_NAME, TransactionsState } from './types';

const initialState: TransactionsState = {
  cosmos: { ...DEFAULT_SHORT_PAGINATED_STATE },
  evm: { ...DEFAULT_SHORT_PAGINATED_STATE },
  tokenTransfers: { ...DEFAULT_SHORT_PAGINATED_STATE },
};

const getTxsStateFieldName = (params: GetTransactionsParams): keyof TransactionsState => {
  return params.existsEVM ? 'evm' : 'cosmos';
};

const txsSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getTransactionsAsync.pending, (state, { meta }) => {
      const fieldName = getTxsStateFieldName(meta.arg);

      state[fieldName].isLoading = true;
      state[fieldName].error = null;
    });
    builder.addCase(getTransactionsAsync.fulfilled, (state, { payload, meta }) => {
      const { data, hasNext, limit, page } = payload;
      const fieldName = getTxsStateFieldName(meta.arg);

      state[fieldName].data = data;
      state[fieldName].isLoading = false;
      state[fieldName].hasNext = hasNext;
      state[fieldName].limit = limit;
      state[fieldName].page = page;
    });
    builder.addCase(getTransactionsAsync.rejected, (state, { payload, meta }) => {
      const fieldName = getTxsStateFieldName(meta.arg);

      state[fieldName].isLoading = false;

      if (payload) {
        state[fieldName].error = payload;
      }
    });
    builder.addCase(getTokenTransfersAsync.pending, state => {
      state.tokenTransfers.isLoading = true;
      state.tokenTransfers.error = null;
    });
    builder.addCase(getTokenTransfersAsync.fulfilled, (state, { payload: { data, hasNext, limit, page } }) => {
      state.tokenTransfers.data = data;
      state.tokenTransfers.hasNext = hasNext;
      state.tokenTransfers.limit = limit;
      state.tokenTransfers.page = page;
      state.tokenTransfers.isLoading = false;
    });
    builder.addCase(getTokenTransfersAsync.rejected, (state, { payload }) => {
      state.tokenTransfers.isLoading = false;

      if (payload) state.tokenTransfers.error = payload;
    });
  },
});

export default txsSlice.reducer;
