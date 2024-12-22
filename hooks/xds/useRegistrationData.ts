import { useCallback } from 'react';

import { EVM_CHAIN_ID } from '@/shared/constants';
import { evmWalletAddressSelector } from '@/store/wallet/selectors';
import {
  ActionPayload,
  currentRegistrationItemSelector,
  deleteRegistrationData,
  RegistrationData,
  registrationItemsSelector,
  setCurrentRegistrationData,
  updateCurrentRegistrationData,
  updateRegistrationData,
} from '@/store/xds';

import useAppDispatch from '../useAppDispatch';
import useAppSelector from '../useAppSelector';

const useRegistrationData = () => {
  const dispatch = useAppDispatch();
  const evmAddress = useAppSelector(evmWalletAddressSelector);

  const updateData = useCallback(
    ({ name, data }: Omit<ActionPayload.UpdateRegistrationData, 'address' | 'chainId'>) => {
      dispatch(
        updateRegistrationData({
          name,
          data,
          address: evmAddress,
          chainId: EVM_CHAIN_ID,
        })
      );
    },
    [evmAddress]
  );

  const deleteData = useCallback(
    (name: string) => {
      dispatch(
        deleteRegistrationData({
          name,
          address: evmAddress,
          chainId: EVM_CHAIN_ID,
        })
      );
    },
    [evmAddress]
  );

  const setCurrentData = useCallback((registrationItem: RegistrationData | null) => {
    dispatch(setCurrentRegistrationData(registrationItem));
  }, []);

  const updateCurrentData = useCallback((registrationItem: Partial<RegistrationData>) => {
    dispatch(updateCurrentRegistrationData(registrationItem));
  }, []);

  return {
    updateData,
    deleteData,
    setCurrentData,
    updateCurrentData,
  };
};

export const useRegistrationItems = () => {
  const evmAddress = useAppSelector(evmWalletAddressSelector);
  const items = useAppSelector(registrationItemsSelector(evmAddress, EVM_CHAIN_ID));

  return items;
};

export const useCurrentRegistrationItem = () => {
  const data = useAppSelector(currentRegistrationItemSelector);

  return data;
};

export default useRegistrationData;
