import type { StorageToken } from '@/store/walletTokens';

import type { TabType } from './constants';

export type ImportTokenProps = {
  onNext: (token: StorageToken) => void;
  onCancel: () => void;
  initialContractAddress?: string;
  tab: TabType;
  setTab: (tab: TabType) => void;
};

export type ActiveStep = 'import' | 'confirm' | 'success' | null;
