import { createAsyncThunk } from '@reduxjs/toolkit';

import { xfiScanApi } from '@/crud';
import { getApiErrorMessage } from '@/helpers';
import { type Transaction, mapTransactionResponse } from '@/lib/xfi.lib/helpers';
import { PaginatedState } from '@/shared/types';

import { TOKEN_TRANSFERS_LIMIT, TRANSACTIONS_LIMIT } from './constants';
import { mapTokenTransferResponse } from './mappers';
import { GetTokenTransfersParams, GetTransactionsParams, TransactionsState, TxsFetchMethod } from './types';

export const getTransactionsAsync = createAsyncThunk<
  PaginatedState.Short<Transaction>,
  GetTransactionsParams,
  { rejectValue: string }
>(TxsFetchMethod.getTransactionsAsync, async (params, { rejectWithValue, signal }) => {
  try {
    const { data } = await xfiScanApi.getTransactions({ limit: TRANSACTIONS_LIMIT, ...params }, { signal });
    const { docs, ...other } = data;

    return { data: docs.map(mapTransactionResponse), ...other };
  } catch (error) {
    const errorMessage = getApiErrorMessage(error);

    return rejectWithValue(errorMessage);
  }
});

export const getTokenTransfersAsync = createAsyncThunk<
  TransactionsState['tokenTransfers'],
  GetTokenTransfersParams,
  { rejectValue: string }
>(TxsFetchMethod.getTokenTransfersAsync, async (params, { rejectWithValue, signal }) => {
  try {
    const { data } = await xfiScanApi.getTokenTransfers({ limit: TOKEN_TRANSFERS_LIMIT, ...params }, { signal });
    const { docs, ...other } = data;

    return { data: docs.map(mapTokenTransferResponse), ...other };
  } catch (error) {
    const errorMessage = getApiErrorMessage(error);

    return rejectWithValue(errorMessage);
  }
});
