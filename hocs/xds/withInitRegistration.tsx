import { useIsomorphicLayoutEffect } from '@xfi/hooks';
import { ComponentType, useCallback, useEffect } from 'react';

import { generateRegistrationData } from '@/helpers/xds';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useEthRegistrarController, useRegistrationData, useRegistrationItems, useXdsNamePageParam } from '@/hooks/xds';
import type { PropsWithLoading } from '@/shared/types';
import { newWalletSelector } from '@/store/wallet';
import { isLoadingInitRegistrationSelector, setIsLoadingInit } from '@/store/xds';

const withInitRegistration = <T extends PropsWithLoading>(Wrapped: ComponentType<T>) => {
  return function WithInitRegistrationWrapper(props: T) {
    const dispatch = useAppDispatch();
    const isLoadingInit = useAppSelector(isLoadingInitRegistrationSelector);
    const { evmAddress } = useAppSelector(newWalletSelector);

    const { name } = useXdsNamePageParam();
    const ethRegistrarController = useEthRegistrarController();
    const { setCurrentData, deleteData } = useRegistrationData();
    const items = useRegistrationItems();

    const initRegistrationForName = useCallback(
      async (name: string, address: string) => {
        const setNewRegistrationData = () => {
          setCurrentData(generateRegistrationData({ name, address }));
        };
        const registrationItem = items.find(({ payload }) => payload.name === name);

        try {
          dispatch(setIsLoadingInit(true));

          if (!registrationItem) {
            setNewRegistrationData();
          } else {
            if (registrationItem.commitmentData) {
              const commitmentAge = await ethRegistrarController.getCommitmentAge(
                registrationItem.commitmentData.commitment
              );
              const maxCommitmentAge = await ethRegistrarController.maxCommitmentAge();

              if (commitmentAge > maxCommitmentAge) {
                deleteData(registrationItem.payload.name);
                setNewRegistrationData();
              } else {
                setCurrentData(registrationItem);
              }
            } else {
              setCurrentData(registrationItem);
            }
          }
        } catch (error) {
          console.error('initRegistrationForName error', error);
          setNewRegistrationData();
        } finally {
          dispatch(setIsLoadingInit(false));
        }
      },
      [ethRegistrarController, items, setCurrentData, deleteData]
    );

    useIsomorphicLayoutEffect(() => {
      initRegistrationForName(name, evmAddress);
    }, [name, evmAddress]);

    useEffect(() => {
      return () => {
        setCurrentData(null);
      };
    }, []);

    return <Wrapped {...props} isLoading={isLoadingInit} />;
  };
};

export default withInitRegistration;
