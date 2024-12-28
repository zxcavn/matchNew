import type { BasePaginationResponse } from '@/crud/types';

export enum ValidatorStatus {
  UNSPECIFIED = 'BOND_STATUS_UNSPECIFIED',
  UNBONDED = 'BOND_STATUS_UNBONDED',
  UNBONDING = 'BOND_STATUS_UNBONDING',
  BONDED = 'BOND_STATUS_BONDED',
}

export type Picture = {
  url: string;
};

export type Pictures = {
  primary: Picture;
};

export type ValidatorListResponse = BasePaginationResponse<{
  validator: Validator;
  delegators_count: string;
  pictures?: Pictures;
}>;

export type Validator = {
  operator_address: string;
  jailed: boolean;
  status: ValidatorStatus;
  tokens: string;
  delegator_shares: string;
  description: {
    moniker: string;
    identity: string;
    website: string;
    security_contact: string;
    details: string;
  };
  unbonding_height: string;
  unbonding_time: string;
  commission: {
    commission_rates: {
      rate: string;
      max_rate: string;
      max_change_rate: string;
    };
    update_time: string;
  };
  min_self_delegation: string;
};
