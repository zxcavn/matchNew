import { ErrorType } from '@/shared/types';

export const SLICE_NAME = 'APP';

export const enum AppFetchMethodsEnum {
  initAppAsync = `${SLICE_NAME}/initAppAsync`,
}

export type AutoLockData = {
  expiresIn: number;
  timer: number;
};

export interface AppInitialState {
  loading: boolean;
  error: ErrorType;
  autoDetectToken: boolean;
  autoDetectNft: boolean;
  autoLock: AutoLockData;
}
