import { Block, Subscription } from './types';

export type BlockListener = (block: Block) => void;

export class BlockSubscription {
  static listeners: BlockListener[] = [];

  static removeAllListeners() {
    this.listeners = [];
  }

  static subscribe(listener: BlockListener): Subscription {
    const hasListener = Boolean(this.listeners.find(_listener => _listener === listener));

    if (!hasListener) this.listeners.push(listener);

    return {
      unsubscribe: () => BlockSubscription.unsubscribe(listener),
    };
  }

  static unsubscribe(listener: BlockListener) {
    const index = this.listeners.findIndex(_listener => _listener === listener);

    if (index !== -1) this.listeners.splice(index, 1);
  }

  static callListeners(block: Block) {
    this.listeners.forEach(listener => {
      if (this.listeners.includes(listener)) {
        listener(block);
      }
    });
  }
}
