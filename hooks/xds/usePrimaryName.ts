import { useCallback, useEffect, useMemo } from 'react';

import { getXdsPrimaryNameAsync, isLoadingPrimaryNameSelector, primaryNameSelector } from '@/store/xds';

import useAppDispatch from '../useAppDispatch';
import useAppSelector from '../useAppSelector';

type UsePrimaryNameOptions = {
  address: string;
  isEnabled?: boolean;
};

const usePrimaryName = ({ address: addressParam, isEnabled = true }: UsePrimaryNameOptions) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingPrimaryNameSelector);
  const address = useMemo(() => addressParam.toLowerCase(), [addressParam]);
  const name = useAppSelector(primaryNameSelector(address));

  const getPrimaryName = useCallback((address: string) => {
    dispatch(getXdsPrimaryNameAsync(address));
  }, []);

  useEffect(() => {
    if (isEnabled) {
      getPrimaryName(address);
    }
  }, [isEnabled, address]);

  return {
    isLoading,
    name,
    getPrimaryName,
  };
};

export default usePrimaryName;
