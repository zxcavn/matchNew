import { createAsyncThunk } from '@reduxjs/toolkit';

import { xfiScanApi } from '@/crud';
import { getApiErrorMessage } from '@/helpers';

import { mapAddressInfoResponse } from './mappers';
import type { GetAddressInfoParams, SetAddressInfoPayload } from './types';
import { AddressFetchMethodsEnum } from './types';

export const getAddressInfoAsync = createAsyncThunk<
  SetAddressInfoPayload,
  GetAddressInfoParams,
  { rejectValue: string }
>(AddressFetchMethodsEnum.getAddressById, async ({ address, withoutRewards }, { rejectWithValue, signal }) => {
  try {
    const { data } = await xfiScanApi.getAddressInfo(address, { signal, withoutRewards });

    return { data: mapAddressInfoResponse(data), address };
  } catch (error) {
    const errorMessage = getApiErrorMessage(error);

    return rejectWithValue(errorMessage);
  }
});
