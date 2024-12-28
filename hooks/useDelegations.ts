import { useMemo } from 'react';

import { XfiIcon } from '@/lib/xfi.lib/icons';
import { GROUPED_VALIDATORS_BY_ADDRESS, VIEW_BOX_DEFAULT } from '@/shared/constants';
import { CosmosCurrency } from '@/shared/types';
import { AddressInfo } from '@/store/address';
import { ValidatorsList } from '@/store/validators';

import useAddressInfo from './useAddressInfo';
import useAppSelector from './useAppSelector';

const DEFAULT_FETCH_TIMEOUT = 1000;

const mapResultToDelegationList = ({
  validators,
  rewards,
  delegations,
}: {
  validators: ValidatorsList;
  rewards: AddressInfo['rewards'];
  delegations: AddressInfo['delegations'];
}) => {
  return delegations
    .map(delegation => {
      const validatorAddress = delegation.validatorAddress;
      const validator = validators.find(validator => validator.validator.operatorAddress === validatorAddress);
      const reward = rewards.rewards.find(reward => reward.validatorAddress === validatorAddress);
      const rewardCoin = reward?.reward.find(({ denom }) => denom === CosmosCurrency.XFI);

      const validatorData = GROUPED_VALIDATORS_BY_ADDRESS[validatorAddress];

      return {
        delegation: {
          denom: CosmosCurrency.MPX,
          amount: delegation.balance.amount,
        },
        reward: {
          denom: CosmosCurrency.XFI,
          amount: rewardCoin?.amount || '0',
        },
        validator: {
          address: validatorAddress,
          moniker: validator?.validator.description.moniker || validatorData?.name || '',
          ratePercent: 100 * Number(validator?.validator.commission.rate || 0),
          status: validator?.validator.status,
          picture: validator?.picture,
          iconSrc: validatorData?.iconSrc || XfiIcon,
          viewBox: validatorData?.viewBox || VIEW_BOX_DEFAULT,
        },
      };
    })
    .filter(delegation => Number(delegation.delegation.amount) > 0);
};

export type Delegation = ReturnType<typeof mapResultToDelegationList>[0];

type FetchParams = {
  withTimeout?: boolean;
  timeout?: number;
};

const useDelegations = (walletAddress: string) => {
  const { data: validators, loading: isLoadingValidators } = useAppSelector(state => state.validators);

  const {
    fetchAddressInfo,
    isLoading: isLoadingAddressInfo,
    hasAddressInfo,
    rewards,
    delegations,
    unbondingDelegations,
  } = useAddressInfo(walletAddress);

  const isLoading = isLoadingAddressInfo || isLoadingValidators;

  const delegationList = useMemo(
    () => (isLoading && !hasAddressInfo ? [] : mapResultToDelegationList({ validators, rewards, delegations })),
    [validators, rewards, delegations, isLoading, hasAddressInfo]
  );

  const fetch = ({ withTimeout, timeout }: FetchParams = {}) => {
    const fetchData = () => {
      fetchAddressInfo();
    };

    if (withTimeout) {
      setTimeout(fetchData, timeout || DEFAULT_FETCH_TIMEOUT);
    } else {
      fetchData();
    }
  };

  return {
    fetch,
    isLoading,
    delegationList,
    unbondingDelegations,
  };
};

export default useDelegations;
