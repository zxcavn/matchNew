import { StdFee } from '@cosmjs/stargate';

import { TransactionResponse } from '@/shared/types';

export interface ICosmosTransactionService<P = unknown> {
  calculateFee(params: P): Promise<StdFee>;

  send(params: P): Promise<TransactionResponse>;

  /**
   * @throws {InsufficientBalanceError}
   * @throws {NotEnoughCoinsForCommissionError}
   */
  checkEnoughCoinsOrThrowError(...params: unknown[]): void;
}
