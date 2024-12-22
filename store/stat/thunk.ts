import { createAsyncThunk } from '@reduxjs/toolkit';

import { xfiScanApi } from '@/crud';
import { getApiErrorMessage } from '@/helpers';

import { mapStatisticResponse } from './mappers';
import { PREFIX, StatFetchMethodsEnum, Statistic } from './types';

export const getStatisticAsync = createAsyncThunk<Statistic, void, { rejectValue: string }>(
  `${PREFIX}/${StatFetchMethodsEnum.getStatisticAsync}`,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await xfiScanApi.getStat();

      return mapStatisticResponse(data);
    } catch (error) {
      const errorMessage = getApiErrorMessage(error);

      return rejectWithValue(errorMessage);
    }
  }
);
