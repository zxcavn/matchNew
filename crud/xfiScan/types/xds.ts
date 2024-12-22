import type { BasePaginationParams, BasePaginationResponse } from '@/crud/types';

export type XdsNameShortResponse = {
  address: string;
  name?: string;
  expires: string;
};

export type XdsNameResponse = {
  id: string;
  name: string;
  owner: string;
  address: string;
  expires: string;
  createDate: string;
  label: string;
  cost: number;
  premium: number;
  primary: boolean;
  node: string;
  ownerXds?: XdsNameShortResponse;
};

export type ResolvedXdsNameOrAddressResponse = Pick<XdsNameResponse, 'address' | 'name'>;

export type GracePeriodResponse = {
  gracePeriod: number;
};

export type XdsNamesResponse = BasePaginationResponse<XdsNameResponse>;

type GetXdsNamesBaseParams = Partial<{
  owner: string;
  address: string;
  name: string;
  primary: boolean;
}>;

export type GetXdsNamesParams = BasePaginationParams & GetXdsNamesBaseParams;
