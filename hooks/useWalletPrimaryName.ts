import { evmWalletAddressSelector } from '@/store/wallet';
import { useCallback } from 'react';
import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';
import usePrimaryName from './xds/usePrimaryName';

type UseWalletPrimaryNameOptions = {
  isEnabled?: boolean;
};

const useWalletPrimaryName = ({ isEnabled = true }: UseWalletPrimaryNameOptions = {}) => {
  const dispatch = useAppDispatch();
  const address = useAppSelector(evmWalletAddressSelector);
  const { getPrimaryName } = usePrimaryName({ address, isEnabled });

  const updatePrimaryName = useCallback(
    (name: string | null) => {
      if (!name) {
      }
    },
    [dispatch, address]
  );

  return {
    getPrimaryName: useCallback(() => getPrimaryName(address), [address, getPrimaryName]),
    updatePrimaryName,
  };
};

export default useWalletPrimaryName;
