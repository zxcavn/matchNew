import type { TransactionResponse } from '@/lib/xfi.lib/helpers';

import type { Subscription } from './types';

export type TxListener = (txHash: string, tx: TransactionResponse) => void;

export class TransactionSubscription {
  private static readonly listeners = new Map<TxListener, string>();

  static removeAllListeners() {
    this.listeners.clear();
  }

  static subscribe(txHash: string, listener: TxListener): Subscription {
    if (!this.listeners.has(listener)) {
      this.listeners.set(listener, txHash);
    }

    return {
      unsubscribe: () => TransactionSubscription.unsubscribe(listener),
    };
  }

  static unsubscribe(listener: TxListener) {
    this.listeners.delete(listener);
  }

  static callListeners(tx: TransactionResponse) {
    const { txhash, evm_txhashes } = tx;
    const evmHashes = Array.isArray(evm_txhashes) ? evm_txhashes : [];
    const txs = [txhash, ...evmHashes];

    Array.from(this.listeners.entries()).forEach(([listener, txHash]) => {
      if (txs.includes(txHash.toLowerCase())) {
        listener(txHash, tx);
        this.unsubscribe(listener);
      }
    });
  }
}
