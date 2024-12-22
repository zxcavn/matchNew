import { useDeepEffect } from '@xfi/hooks';
import { useCallback, useEffect, useRef, useState } from 'react';

import {
  isHandledEvmError,
  mapRegistrationDataToRegisterOptions,
  mapXdsErrorMessage,
  prepareRentPriceForRegisterTx,
} from '@/helpers';
import { useSocketSubscription } from '@/hocs';
import { Subscription } from '@/hocs/SocketSubscriptionProvider/types';
import { calculateCommission, mapTransactionResponse } from '@/lib/xfi.lib/helpers';
import { LoggerService } from '@/services';
import type { RegistrationData } from '@/store/xds';

import useEthRegistrarController from './useEthRegistrarController';

type Listeners = {
  onSuccess: (params: { txHash: string; fee: string; rentPrice: string }) => void;
};

type UseRegisterOptions = {
  registrationData: RegistrationData | null;
  isEnabledFeeCalculation?: boolean;
};

const useRegister = ({ registrationData, isEnabledFeeCalculation }: UseRegisterOptions) => {
  const [isLoadingTx, setIsLoadingTx] = useState(false);
  const [isLoadingFee, setIsLoadingFee] = useState(false);
  const [fee, setFee] = useState<bigint | null>(null);
  const [error, setError] = useState<string | null>('');

  const subscriptionRef = useRef<Subscription | null>();
  const ethRegistrarController = useEthRegistrarController();
  const { subscribeTx } = useSocketSubscription();

  const getRentPrice = useCallback(async (data: RegistrationData) => {
    const { name, duration } = data.payload;
    const [base, premium] = await ethRegistrarController.rentPrice(name, BigInt(duration));
    const rentPrice = base + premium;
    const sendAmount = prepareRentPriceForRegisterTx(rentPrice);

    return { rentPrice, sendAmount };
  }, []);

  const register = useCallback(
    async ({ onSuccess }: Listeners) => {
      if (!registrationData) return;

      try {
        setIsLoadingTx(true);
        setError(null);

        const { rentPrice, sendAmount } = await getRentPrice(registrationData);
        const tx = await ethRegistrarController.register(
          mapRegistrationDataToRegisterOptions(registrationData, sendAmount)
        );

        subscriptionRef.current = subscribeTx(tx.hash, (_, txResponse) => {
          const tx = mapTransactionResponse(txResponse);
          const fee = calculateCommission(tx.messages[0], tx);

          onSuccess({ txHash: tx.txHash, fee: fee.amount, rentPrice: String(rentPrice) });
          setIsLoadingTx(false);
        });
      } catch (error) {
        console.error(error);
        setError(mapXdsErrorMessage(error));

        if (!isHandledEvmError(error)) {
          LoggerService.error({
            name: 'useRegister: register',
            error,
            payload: registrationData,
          });
        }

        setIsLoadingTx(false);
      }
    },
    [registrationData]
  );

  const calculateFee = useCallback(async (data: RegistrationData | null) => {
    if (!data) return;

    try {
      setIsLoadingFee(true);
      setError(null);

      const { sendAmount } = await getRentPrice(data);
      const fee = await ethRegistrarController.estimateRegisterFee(
        mapRegistrationDataToRegisterOptions(data, sendAmount)
      );

      setFee(fee);
    } catch (error) {
      console.error(error);
      setError(mapXdsErrorMessage(error));

      if (!isHandledEvmError(error)) {
        LoggerService.error({
          name: 'useRegister: calculateFee',
          error,
          payload: data,
        });
      }
    } finally {
      setIsLoadingFee(false);
    }
  }, []);

  useDeepEffect(() => {
    const isEnabled = isEnabledFeeCalculation && !isLoadingFee && (!fee || !!error);

    if (isEnabled) {
      calculateFee(registrationData);
    }

    if (!isEnabledFeeCalculation && !!error) {
      setError(null);
    }
  }, [registrationData, isEnabledFeeCalculation]);

  useEffect(() => {
    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
      }
    };
  }, []);

  return {
    register,
    isLoadingTx,
    isLoadingFee,
    error,
    fee,
  };
};

export default useRegister;
