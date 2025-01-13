import { useDebouncedCallback, useDeepEffect, useValueChanging } from '@xfi/hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { calculateUsdtPrice } from '@/helpers/xds';
import type { RegisterOptions } from '@/services/xds';
import { CosmosCurrency } from '@/shared/types';
import { currencyBySymbolSelector, getSwapCurrenciesAsync, isLoadingCurrenciesSelector } from '@/store/currencies';

import useAppDispatch from '../useAppDispatch';
import useAppSelector from '../useAppSelector';
import useEthRegistrarController from './useEthRegistrarController';

type EstimatedData = {
  duration: bigint;
  namePrice: bigint;
  hasPremium: boolean;
  networkFee: bigint;
  totalPrice: bigint;
};

const DEFAULT_DEBOUNCE_TIMEOUT = 500;
const BUFFER_TIMEOUT = 100;
const DEFAULT_ESTIMATED_DATA: EstimatedData = {
  duration: 0n,
  namePrice: 0n,
  hasPremium: false,
  networkFee: 0n,
  totalPrice: 0n,
};

export type UseEstimateRegistrationOptions = Omit<RegisterOptions, 'value'> & {
  debounceTimeout?: number;
};

export type UseEstimateRegistrationReturnValues = EstimatedData & {
  isLoading?: boolean;
  error?: Error | null;
  usdtPrice: string;
};

const useEstimateRegistration = ({
  debounceTimeout = DEFAULT_DEBOUNCE_TIMEOUT,
  ...registrationData
}: UseEstimateRegistrationOptions): UseEstimateRegistrationReturnValues => {
  const ethRegistrarController = useEthRegistrarController();

  const dispatch = useAppDispatch();
  const isLoadingCurrencies = useAppSelector(isLoadingCurrenciesSelector);
  const currency = useAppSelector(currencyBySymbolSelector(CosmosCurrency.XFI));

  const [isValueChanging, triggerChanging] = useValueChanging(debounceTimeout ? debounceTimeout + BUFFER_TIMEOUT : 0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [estimatedData, setEstimatedData] = useState<EstimatedData>(DEFAULT_ESTIMATED_DATA);

  const estimateRegistration = useCallback(async (registrationData: Omit<RegisterOptions, 'value'>) => {
    try {
      setIsLoading(true);
      setError(null);

      const { name, duration } = registrationData;

      const [basePrice, premiumPrice] = await ethRegistrarController.rentPrice(name, duration);
      const commitment = await ethRegistrarController.makeCommitment(registrationData);
      const networkFee = await ethRegistrarController.estimateCommitFee(commitment);

      const namePrice = basePrice + premiumPrice;
      const hasPremium = Boolean(premiumPrice);
      const totalPrice = namePrice + networkFee;

      setEstimatedData({
        duration,
        namePrice,
        hasPremium,
        networkFee,
        totalPrice,
      });
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error : new Error('unknown error'));
      setEstimatedData(DEFAULT_ESTIMATED_DATA);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const debouncedEstimateRegistration = useDebouncedCallback(estimateRegistration, debounceTimeout);

  useDeepEffect(() => {
    triggerChanging();
    debouncedEstimateRegistration(registrationData);
  }, [registrationData]);

  useEffect(() => {
    dispatch(getSwapCurrenciesAsync());
  }, [dispatch]);

  const xfiUsdtRate = currency?.rate || 0;
  const _isLoading = isLoadingCurrencies || isLoading || isValueChanging;

  return useMemo(
    () => ({
      isLoading: _isLoading,
      error: error,
      ...estimatedData,
      usdtPrice: calculateUsdtPrice(estimatedData.totalPrice, xfiUsdtRate),
    }),
    [_isLoading, error, xfiUsdtRate, estimatedData]
  );
};

export default useEstimateRegistration;
