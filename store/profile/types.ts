import type { Signer } from 'ethers';

import type { ProfileResponse } from '@/crud/xfiPad';

export const SLICE_NAME = 'PROFILE';

export const enum ProfileFetchMethod {
  getProfileAsync = `${SLICE_NAME}/getProfileAsync`,
  authorizeAsync = `${SLICE_NAME}/authorizeAsync`,
}

export type ProfileState = {
  isLoading?: boolean;
  isReady?: boolean;
  error?: string | null;
  data: ProfileResponse | null;
};

export type AuthorizeParams = {
  signer: Signer;
};
