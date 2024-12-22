import type { BasePaginationParams, BasePaginationResponse } from '@/crud';
import type { TransactionResponse } from '@/lib/xfi.lib/helpers';

export type TransactionListPaginatedResponse = BasePaginationResponse<TransactionResponse>;

export type GetTransactionListParams = BasePaginationParams &
  Partial<{
    address: string;
    from_height: string;
    to_height: string;
    existsEVM: boolean;
  }>;
