import { useCallback, useEffect, useMemo } from 'react';
import useAppDispatch from '../useAppDispatch';

type UsePrimaryNameOptions = {
  address: string;
  isEnabled?: boolean;
};

const usePrimaryName = ({ address: addressParam, isEnabled = true }: UsePrimaryNameOptions) => {
  const dispatch = useAppDispatch();
  const address = useMemo(() => addressParam.toLowerCase(), [addressParam]);
  const getPrimaryName = useCallback((address: string) => {
  }, []);
  
  useEffect(() => {
    if (isEnabled) {
      getPrimaryName(address);
    }
  }, [isEnabled, address]);

  return {
    getPrimaryName,
  };
};

export default usePrimaryName;
