import { ErrorType } from '@/shared/types';

import { mapAddressInfoResponse } from './mappers';

export const SLICE_NAME = 'ADDRESS';

export const enum AddressFetchMethodsEnum {
  getAddressById = `${SLICE_NAME}/getAddressById`,
}

export type AddressInfo = ReturnType<typeof mapAddressInfoResponse>;

export interface AddressInitialState {
  loading: boolean;
  error: ErrorType;
  data: { [address: string]: AddressInfo };
}

export interface SetAddressInfoPayload {
  address: string;
  data: AddressInfo;
}

export type GetAddressInfoParams = {
  address: string;
  withoutRewards?: boolean;
};
