import { createAsyncThunk } from '@reduxjs/toolkit';

import { swapApi } from '@/crud';
import { SwapCurrency } from '@/crud/swap';
import { getApiErrorMessage } from '@/helpers';
import { ErrorType } from '@/shared/types';

import { mapCurrenciesResponse } from './mappers';
import { SwapCurrenciesFetchMethodsEnum } from './types';

export const getSwapCurrenciesAsync = createAsyncThunk<
  Record<string, Omit<SwapCurrency, 'symbol'>>,
  void,
  { rejectValue: ErrorType }
>(SwapCurrenciesFetchMethodsEnum.getSwapCurrenciesAsync, async (_, { rejectWithValue }) => {
  try {
    const {
      data: { count },
    } = await swapApi.getSwapCurrenciesCount();

    const {
      data: { docs },
    } = await swapApi.getSwapCurrencies({ limit: count });

    return mapCurrenciesResponse(docs);
  } catch (error) {
    const errorMessage = getApiErrorMessage(error);

    return rejectWithValue(errorMessage);
  }
});
