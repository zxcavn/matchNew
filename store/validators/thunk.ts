import { createAsyncThunk } from '@reduxjs/toolkit';

import { xfiScanApi } from '@/crud';
import { getApiErrorMessage } from '@/helpers';
import type { ValidatorsList } from '@/store/validators/types';

import { mapValidatorsListResponse } from './mappers';
import { ValidatorsFetchMethodsEnum } from './types';

export const getValidatorsAsync = createAsyncThunk<ValidatorsList, void, { rejectValue: string }>(
  ValidatorsFetchMethodsEnum.getValidators,
  async (_, { rejectWithValue, signal }) => {
    try {
      const {
        data: {
          validators: { active, inactive },
        },
      } = await xfiScanApi.getStat();
      const { data } = await xfiScanApi.getValidators({ page: 1, limit: active + inactive }, { signal });

      return mapValidatorsListResponse(data);
    } catch (error) {
      const errorMessage = getApiErrorMessage(error);

      return rejectWithValue(errorMessage);
    }
  }
);
