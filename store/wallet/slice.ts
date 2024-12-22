import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CosmosService } from '@/services/cosmos';
import { EthersService } from '@/services/evm';
import { LocalStorageService } from '@/services/localStorage';
import { WalletType } from '@/shared/types';

import type { NewWallet, OldWallet, WalletBalance, WalletInitialState } from './types';
import { CreateWalletStepEnum, SLICE_NAME } from './types';

export const walletInitialState: WalletInitialState['wallet'] = {
  old: {
    address: '',
    balance: {
      mpx: '0',
      xfi: '0',
    },
  },
  new: {
    address: '',
    evmAddress: '',
    balance: {
      mpx: '0',
      xfi: '0',
    },
  },
};

const initialState: WalletInitialState = {
  mnemonic: '',
  createWalletStep: CreateWalletStepEnum.privacy,
  walletType: WalletType.NEW,
  error: '',
  wallet: walletInitialState,
};

const walletSlice = createSlice({
  name: SLICE_NAME,
  initialState,

  reducers: {
    setMnemonic(state, { payload }: PayloadAction<string>) {
      state.mnemonic = payload;
    },
    setWalletStep(state, { payload }: PayloadAction<WalletInitialState['createWalletStep']>) {
      state.createWalletStep = payload;
    },
    setWalletType(state, { payload }: PayloadAction<WalletType>) {
      state.walletType = payload;
    },
    setNewWalletData(state, { payload }: PayloadAction<NewWallet>) {
      state.wallet.new = payload;
    },
    setNewWalletBalance: (state, { payload }: PayloadAction<WalletBalance>) => {
      state.wallet.new.balance = payload;
    },
    setOldWalletData(state, { payload }: PayloadAction<OldWallet>) {
      state.wallet.old = payload;
    },
    setOldWalletBalance: (state, { payload }: PayloadAction<WalletBalance>) => {
      state.wallet.old.balance = payload;
    },
    logout(state) {
      state.mnemonic = initialState.mnemonic;
      state.wallet = initialState.wallet;
      state.walletType = initialState.walletType;
      state.error = initialState.error;
      state.createWalletStep = initialState.createWalletStep;

      LocalStorageService.remove('mnemonic');
      EthersService.destroyInstance();
      CosmosService.destroyInstance();
    },
  },
});

export const {
  setMnemonic,
  setWalletStep,
  logout,
  setWalletType,
  setNewWalletData,
  setOldWalletData,
  setNewWalletBalance,
  setOldWalletBalance,
} = walletSlice.actions;

export default walletSlice.reducer;
