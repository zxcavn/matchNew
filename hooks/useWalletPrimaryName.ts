import { useCallback } from 'react';

import { normalizeName } from '@/helpers';
import { evmWalletAddressSelector } from '@/store/wallet';
import { setPrimaryName } from '@/store/xds';

import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';
import usePrimaryName from './xds/usePrimaryName';

type UseWalletPrimaryNameOptions = {
  isEnabled?: boolean;
};

const useWalletPrimaryName = ({ isEnabled = true }: UseWalletPrimaryNameOptions = {}) => {
  const dispatch = useAppDispatch();
  const address = useAppSelector(evmWalletAddressSelector);
  const { name, isLoading, getPrimaryName } = usePrimaryName({ address, isEnabled });

  const updatePrimaryName = useCallback(
    (name: string | null) => {
      if (!name) {
        return dispatch(setPrimaryName({ address: address.toLowerCase(), name: '' }));
      }

      const normalized = normalizeName(name);

      if (normalized) {
        dispatch(setPrimaryName({ address: address.toLowerCase(), name: normalized.name }));
      }
    },
    [dispatch, address]
  );

  return {
    name,
    isLoading,
    getPrimaryName: useCallback(() => getPrimaryName(address), [address, getPrimaryName]),
    updatePrimaryName,
  };
};

export default useWalletPrimaryName;
