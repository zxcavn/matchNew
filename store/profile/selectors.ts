import type { RootState } from '@/store';

export const profileSelector = (state: RootState) => state.profile;
export const profileWalletsSelector = (state: RootState) => state.profile.data?.wallets;
