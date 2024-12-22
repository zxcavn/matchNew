import { type GetTransactionListParams } from '@/crud/xfiScan';
import type { GetTokenTransfersParams as ApiGetTokenTransfersParams } from '@/crud/xfiScan/types/tokenTransfers';
import type { Transaction } from '@/lib/xfi.lib/helpers';
import type { PaginatedState } from '@/shared/types';

import { mapTokenTransferResponse } from './mappers';

export const SLICE_NAME = 'TRANSACTIONS';

export const enum TxsFetchMethod {
  getTransactionsAsync = `${SLICE_NAME}/getTransactionsAsync`,
  getTokenTransfersAsync = `${SLICE_NAME}/getTokenTransfersAsync`,
}

export type TokenTransfer = ReturnType<typeof mapTokenTransferResponse>;

export type TransactionsState = {
  cosmos: PaginatedState.Short<Transaction>;
  evm: PaginatedState.Short<Transaction>;
  tokenTransfers: PaginatedState.Short<TokenTransfer>;
};

export type GetTransactionsParams = Omit<GetTransactionListParams, 'limit'>;

export type GetTokenTransfersParams = Omit<ApiGetTokenTransfersParams, 'limit'>;
