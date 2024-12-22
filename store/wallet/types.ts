import type { CosmosCurrency, WalletType } from '@/shared/types';

export const SLICE_NAME = 'WALLET';

export enum CreateWalletStepEnum {
  privacy = 'privacy',
  mnemonic = 'mnemonic',
  confirm = 'confirm',
}

export type OldWallet = {
  address: string;
  balance: WalletBalance;
};

export type NewWallet = {
  address: string;
  evmAddress: string;
  balance: WalletBalance;
};

export type WalletBalance = {
  [CosmosCurrency.MPX]: string;
  [CosmosCurrency.XFI]: string;
};

export interface WalletInitialState {
  mnemonic: string;
  createWalletStep: keyof typeof CreateWalletStepEnum | null;
  walletType: WalletType;
  wallet: {
    old: OldWallet;
    new: NewWallet;
  };
  error?: string;
}
