import { RootState } from '@/store/index';

import { createDeepEqualSelector } from '../helpers';

const appSelector = (state: RootState) => state.app;

export const autoLockSelector = createDeepEqualSelector(appSelector, app => app.autoLock);
export const autoDetectTokenSelector = (state: RootState) => appSelector(state).autoDetectToken;
export const autoDetectNftSelector = (state: RootState) => appSelector(state).autoDetectNft;
