import { type PropsWithChildren, createContext, useContext, useEffect } from 'react';
import { io } from 'socket.io-client';
import urlJoin from 'url-join';

import type { TransactionResponse } from '@/lib/xfi.lib/helpers';
import { XFI_SCAN_URL } from '@/shared/constants';

import { BlockListener, BlockSubscription } from './blockSubscription';
import { type TxListener, TransactionSubscription } from './transactionSubscription';
import { type Block, type Subscription, SocketEvent } from './types';

interface ContextValues {
  subscribeBlock: (listener: BlockListener) => Subscription;
  unsubscribeBlock: (listener: BlockListener) => void;
  subscribeTx: (txHash: string, listener: TxListener) => Subscription;
  unsubscribeTx: (listener: TxListener) => void;
}

const contextValues: ContextValues = {
  subscribeBlock: BlockSubscription.subscribe.bind(BlockSubscription),
  unsubscribeBlock: BlockSubscription.unsubscribe.bind(BlockSubscription),
  subscribeTx: TransactionSubscription.subscribe.bind(TransactionSubscription),
  unsubscribeTx: TransactionSubscription.unsubscribe.bind(TransactionSubscription),
};

const Context = createContext(contextValues);

const SocketSubscriptionProvider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    const socket = io(urlJoin(XFI_SCAN_URL, 'stream'), {
      path: '/api/1.0/stream',
      reconnectionDelay: 2000,
    });

    socket.on(SocketEvent.NEW_BLOCK, (block: Block) => {
      BlockSubscription.callListeners(block);
    });

    socket.on(SocketEvent.NEW_TX, (tx: TransactionResponse) => {
      TransactionSubscription.callListeners(tx);
    });

    return () => {
      socket.off(SocketEvent.NEW_BLOCK);
      socket.off(SocketEvent.NEW_TX);
      socket.disconnect();
      TransactionSubscription.removeAllListeners();
      BlockSubscription.removeAllListeners();
    };
  }, []);

  return <Context.Provider value={contextValues}>{children}</Context.Provider>;
};

export const useSocketSubscription = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('useSocket must be used within a SocketSubscriptionProvider');
  }

  return context;
};

export default SocketSubscriptionProvider;
