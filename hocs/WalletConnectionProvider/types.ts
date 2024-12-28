import type { EventEmitter } from '@/services';

export enum ConnectionType {
  MNEMONIC = 'mnemonic',
  EXTENSION = 'extension',
}

export enum WalletConnectionEvent {
  ACCOUNT_CHANGE = 'accountChange',
}

export enum KeplrEvent {
  KEYSTORE_CHANGE = 'keplr_keystorechange',
}

export type LoadingState = Partial<{
  mnemonic: boolean;
  extension: boolean;
}>;

export type ContextHandlers = {
  connectByMnemonic: (mnemonic: string) => Promise<void>;
  connectByExtension: () => Promise<void>;
  disconnect: () => void;
};

export type ContextValues = {
  isLoading: LoadingState;
  events: EventEmitter;
  isExtensionSupported?: boolean;
  isConnected?: boolean;
  connectionType?: ConnectionType | null;
};
