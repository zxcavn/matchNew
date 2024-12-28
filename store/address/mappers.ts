import { MxNumberFormatter } from '@xfi/formatters';
import flatten from 'lodash/flatten';

import { AddressInfoResponse, RedelegationEntry, UnbondingDelegation } from '@/crud/xfiScan';

const mapDelegation = (delegation: AddressInfoResponse['delegations'][0]) => ({
  balance: delegation.balance,
  delegatorAddress: delegation.delegation.delegator_address,
  validatorAddress: delegation.delegation.validator_address,
  shares: delegation.delegation.shares,
});

export const mapRedelegationEntry = (entry: RedelegationEntry) => ({
  creationHeight: entry.creation_height,
  completionTime: entry.completion_time,
  initialBalance: entry.initial_balance,
  sharesDst: entry.shares_dst,
  unbondingId: entry.unbonding_id,
  unbondingOnHoldRefCount: entry.unbonding_on_hold_ref_count,
});

const mapUnbondingDelegations = (unbondingDelegations: UnbondingDelegation[]) => {
  const delegations = unbondingDelegations.map(({ delegator_address, validator_address, entries }) => {
    return entries.map(({ balance, completion_time }) => ({
      balance,
      completionTime: completion_time,
      delegatorAddress: delegator_address,
      validatorAddress: validator_address,
    }));
  });

  return flatten(delegations);
};

const mapRewards = ({ total, rewards }: AddressInfoResponse['rewards'] = { total: [], rewards: [] }) => {
  const rewardsList = rewards.map(({ reward, validator_address }) => ({ reward, validatorAddress: validator_address }));

  return { total, rewards: rewardsList };
};

const mapRedelegation = ({ redelegation, entries }: AddressInfoResponse['redelegations'][0]) => {
  return {
    delegatorAddress: redelegation.delegator_address,
    validatorSrcAddress: redelegation.validator_src_address,
    validatorDstAddress: redelegation.validator_dst_address,
    entries: entries.map(({ redelegation_entry, balance }) => ({
      redelegationEntry: mapRedelegationEntry(redelegation_entry),
      balance,
    })),
  };
};

export const mapAddressInfoResponse = (addressInfo: AddressInfoResponse) => {
  let totalDelegatedBalance = 0n;

  const delegations = addressInfo.delegations.map(delegation => {
    totalDelegatedBalance += MxNumberFormatter.toBigInt(delegation.balance.amount);

    return mapDelegation(delegation);
  });

  return {
    coins: addressInfo.coins,
    number: addressInfo.number,
    sequence: addressInfo.sequence,
    delegations,
    totalDelegatedBalance: totalDelegatedBalance.toString(),
    unbondingDelegations: mapUnbondingDelegations(addressInfo.unbonding_delegations),
    rewards: mapRewards(addressInfo.rewards),
    redelegations: addressInfo.redelegations.map(mapRedelegation),
  };
};
