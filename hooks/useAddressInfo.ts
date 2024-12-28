import { useCallback, useMemo } from 'react';

import { addressDataSelector, addressSelector, getAddressInfoAsync } from '@/store/address';

import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';

type UseAddressInfoParams = {
  withoutRewards?: boolean;
};

const useAddressInfo = (address = '', { withoutRewards }: UseAddressInfoParams = {}) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(addressSelector);
  const addressInfo = useAppSelector(addressDataSelector(address));
  const { unbondingDelegations = [], delegations = [], rewards, totalDelegatedBalance } = addressInfo || {};

  const fetchAddressInfo = useCallback(() => {
    if (address) {
      dispatch(getAddressInfoAsync({ address, withoutRewards }));
    }
  }, [dispatch, address, withoutRewards]);

  return useMemo(
    () => ({
      fetchAddressInfo,
      unbondingDelegations,
      delegations,
      isLoading: loading,
      hasAddressInfo: Boolean(addressInfo),
      rewards,
      totalDelegatedBalance,
    }),
    [unbondingDelegations, rewards, totalDelegatedBalance, loading, delegations, addressInfo, fetchAddressInfo]
  );
};

export default useAddressInfo;
