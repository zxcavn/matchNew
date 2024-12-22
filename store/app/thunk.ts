import { createAsyncThunk } from '@reduxjs/toolkit';

import type { AppDispatch } from '@/store';

import { AppFetchMethodsEnum } from './types';

export const initAppAsync = createAsyncThunk<void, void, { dispatch: AppDispatch; rejectValue: string }>(
  AppFetchMethodsEnum.initAppAsync,
  async _ => {
    try {
      // const api = await getApi();
      // return api.data;
    } catch (error) {
      // const errorMessage = (error as ErrorsType).response?.data?.message;
      // return rejectWithValue(errorMessage);
    }
  }
);
