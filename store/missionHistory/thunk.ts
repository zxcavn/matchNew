import { createAsyncThunk } from '@reduxjs/toolkit';

import { xfiPadApi } from '@/crud';
import type { MissionHistoryResponse } from '@/crud/xfiPad';
import { getApiErrorMessage } from '@/helpers';

import { MISSION_HISTORY_LIMIT } from './constants';
import { HistoryFetchMethod } from './types';

export const getMissionHistory = createAsyncThunk<MissionHistoryResponse, { offset: number }, { rejectValue: string }>(
  HistoryFetchMethod.getMissionHistoryAsync,
  async ({ offset }, { rejectWithValue }) => {
    try {
      const { data } = await xfiPadApi.getMissionHistory({ limit: MISSION_HISTORY_LIMIT, offset });

      return data;
    } catch (error) {
      const errorMessage = getApiErrorMessage(error);

      return rejectWithValue(errorMessage);
    }
  }
);
