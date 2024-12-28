import { GetXdsNamesParams } from '@/crud/xfiScan';
import { PaginatedState } from '@/shared/types';

import { SLICE_NAME } from './constants';

type Seconds = number;

export enum RegistrationStep {
  PRICING = 'pricing',
  TRANSACTION = 'transaction',
  COMPLETE = 'complete',
}

export const enum XdsFetchMethod {
  getXdsNameAsync = `${SLICE_NAME}/getXdsNameAsync`,
  getXdsNameListAsync = `${SLICE_NAME}/getXdsNameListAsync`,
  getXdsPrimaryNameAsync = `${SLICE_NAME}/getXdsPrimaryNameAsync`,
}

export type RegistrationData = {
  payload: {
    owner: string;
    name: string;
    reverseRecord: boolean;
    duration: Seconds;
    resolver: string;
    secret: string;
  };
  durationCount: number;
  chainId: number;
  stepIndex: number;
  queue: Array<RegistrationStep>;
  isCompleted?: boolean;
  isStarted?: boolean;
  commitmentData?: {
    commitment: string;
    startTimestamp: number;
    txHash: string;
    fee: string;
  };
  registerData?: {
    txHash: string;
    fee: string;
    rentPrice: string;
  };
};

type RegistrationDataState = {
  items: Array<RegistrationData>;
  currentItem: RegistrationData | null;
};

export type XdsState = {
  registration: RegistrationDataState;
  isLoadingInit?: boolean;
  isLoadingTx?: boolean;
  primaryNames: {
    isLoading?: boolean;
    names: {
      [address: string]: string | undefined;
    };
  };
  nameList: PaginatedState.Short<XdsName>;
  name: {
    data: XdsName | null;
    isLoading?: boolean;
  };
  gracePeriodTimestamp?: number;
};

export type XdsName = {
  id: string;
  label: string;
  name: string;
  address: string;
  expires: string;
  createDate: string;
  gracePeriodEnd: string;
  isPrimary: boolean;
  isExpired: boolean;
  ownerAddress: string;
  owner?: {
    address: string;
    name?: string;
    expires: string;
  };
};

export namespace ActionPayload {
  export type UpdateRegistrationData = {
    address: string;
    chainId: number;
    name: string;
    data: RegistrationData;
  };

  export type DeleteRegistrationData = {
    address: string;
    chainId: number;
    name: string;
  };

  export type SetCurrentRegistrationData = RegistrationData | null;

  export type UpdateCurrentRegistrationData = Partial<RegistrationData>;

  export type SetPrimaryName = {
    address: string;
    name: string;
  };
}

export type GetXdsNameThunkParams = {
  label: string;
  ownerAddress?: string;
};
export type GetXdsNameThunkResponse = {
  xdsName: XdsName | null;
  gracePeriodTimestamp: number;
};

export type GetXdsNameListThunkParams = Omit<Partial<GetXdsNamesParams>, 'limit'>;
export type GetXdsNameListThunkResponse = {
  state: Omit<PaginatedState.Short<XdsName>, 'isLoading' | 'error'>;
  gracePeriodTimestamp: number;
};
