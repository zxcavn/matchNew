import type { RootState } from '../index';

export const walletTokensSelector = (state: RootState) => state.walletTokens;
export const extraTokenSelector = (state: RootState) => state.walletTokens.extraToken;
export const eMpxTokensSelector = (state: RootState) => state.walletTokens.eMpxTokens;
