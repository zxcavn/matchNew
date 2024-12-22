import { createSlice } from '@reduxjs/toolkit';

import { getMissionHistory } from './thunk';
import { MissionHistoryState, SLICE_NAME } from './types';

const PAD_DEFAULT_STATE = {
  limit: 0,
  offset: 0,
  totalDocs: 0,
  totalPages: 0,
  hasNextPage: true,
  hasPrevPage: true,
  nextPage: 0,
  prevPage: 0,
  page: 0,
  docs: [],
};

const initialState: MissionHistoryState = {
  data: PAD_DEFAULT_STATE,
  isLoading: false,
  error: null,
};

const missionHistorySlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getMissionHistory.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getMissionHistory.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
    });
    builder.addCase(getMissionHistory.rejected, (state, { payload }) => {
      state.isLoading = false;

      if (payload) state.error = payload;
    });
  },
});

export default missionHistorySlice.reducer;
