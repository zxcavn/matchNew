import type { FetchOptions } from '@/crud/types';
import type { Coin } from '@/shared/types';

export type AddressInfoResponse = {
  coins: Array<Coin>;
  number: string;
  sequence: string;
  delegations: Array<{
    delegation: Delegation;
    balance: Coin;
  }>;
  unbonding_delegations: Array<UnbondingDelegation>;
  redelegations: Array<{
    redelegation: Redelegation;
    entries: Array<{
      redelegation_entry: RedelegationEntry;
      balance: string;
    }>;
  }>;
  rewards?: {
    rewards: Array<{
      validator_address: string;
      reward: Array<Coin>;
    }>;
    total: Array<Coin>;
  };
  mx: string;
  evm: string;
};

export type UnbondingDelegationEntry = {
  creation_height: string;
  completion_time: string;
  initial_balance: string;
  unbonding_id: string;
  unbonding_on_hold_ref_count: string;
  balance: string;
};

export type RedelegationEntry = Omit<UnbondingDelegationEntry, 'balance'> & {
  shares_dst: string;
};

type Delegation = {
  delegator_address: string;
  validator_address: string;
  shares: string;
};

type Redelegation = {
  delegator_address: string;
  validator_src_address: string;
  validator_dst_address: string;
  entries: Array<RedelegationEntry>;
};

export type UnbondingDelegation = {
  delegator_address: string;
  validator_address: string;
  entries: Array<UnbondingDelegationEntry>;
};

export type GetAddressInfoParams = FetchOptions & {
  withoutRewards?: boolean;
};
