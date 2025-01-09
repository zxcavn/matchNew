import { useCallback } from 'react';
import useAppDispatch from './useAppDispatch';

type UseWalletPrimaryNameOptions = {
  isEnabled?: boolean;
};

const useWalletPrimaryName = ({ isEnabled = true }: UseWalletPrimaryNameOptions = {}) => {
  const dispatch = useAppDispatch();

  const updatePrimaryName = useCallback(
    (name: string | null) => {
      if (!name) {
      }
    },
    [dispatch]
  );

  return {
    updatePrimaryName,
  };
};

export default useWalletPrimaryName;
