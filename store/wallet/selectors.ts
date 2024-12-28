import type { RootState } from '@/store';

import { createDeepEqualSelector } from '../helpers';

const walletStateSelector = (state: RootState) => state.wallet;

export const walletMnemonicSelector = (state: RootState) => walletStateSelector(state).mnemonic;
export const createWalletStepSelector = (state: RootState) => walletStateSelector(state).createWalletStep;
export const walletTypeSelector = (state: RootState) => walletStateSelector(state).walletType;
export const newWalletSelector = createDeepEqualSelector(walletStateSelector, state => state.wallet.new);
export const oldWalletSelector = createDeepEqualSelector(walletStateSelector, state => state.wallet.old);

export const evmWalletAddressSelector = (state: RootState) => walletStateSelector(state).wallet.new.evmAddress;
