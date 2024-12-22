import { useDeepEffect } from '@xfi/hooks';
import { useCallback, useEffect, useRef, useState } from 'react';

import { isHandledEvmError, mapRegistrationDataToCommitOptions, mapXdsErrorMessage } from '@/helpers';
import { type Subscription, useSocketSubscription } from '@/hocs/SocketSubscriptionProvider';
import { calculateCommission, mapTransactionResponse } from '@/lib/xfi.lib/helpers';
import { LoggerService } from '@/services';
import type { RegistrationData } from '@/store/xds';

import useEthRegistrarController from './useEthRegistrarController';

type Listeners = {
  onSuccess: ({ commitment }: { commitment: string; txHash: string; fee: string }) => void;
};

type UseCommitmentOptions = {
  registrationData: RegistrationData | null;
  isEnabledFeeCalculation?: boolean;
};

const useCommitment = ({ registrationData, isEnabledFeeCalculation }: UseCommitmentOptions) => {
  const [isLoadingTx, setIsLoadingTx] = useState(false);
  const [isLoadingFee, setIsLoadingFee] = useState(false);
  const [fee, setFee] = useState<bigint | null>(null);
  const [error, setError] = useState<string | null>('');

  const subscriptionRef = useRef<Subscription | null>();
  const ethRegistrarController = useEthRegistrarController();
  const { subscribeTx } = useSocketSubscription();

  const commitment = useCallback(
    async ({ onSuccess }: Listeners) => {
      if (!registrationData) return;

      try {
        setIsLoadingTx(true);
        setError(null);

        const _commitment = await ethRegistrarController.makeCommitment(
          mapRegistrationDataToCommitOptions(registrationData)
        );
        const tx = await ethRegistrarController.commit(_commitment);

        subscriptionRef.current = subscribeTx(tx.hash, (_, txResponse) => {
          const tx = mapTransactionResponse(txResponse);
          const fee = calculateCommission(tx.messages[0], tx);

          onSuccess({ commitment: _commitment, txHash: tx.txHash, fee: fee.amount });
          setIsLoadingTx(false);
        });
      } catch (error) {
        console.error(error);
        setError(mapXdsErrorMessage(error));

        if (!isHandledEvmError(error)) {
          LoggerService.error({
            name: 'useCommitment: commitment',
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

      const commitment = await ethRegistrarController.makeCommitment(mapRegistrationDataToCommitOptions(data));
      const fee = await ethRegistrarController.estimateCommitFee(commitment);

      setFee(fee);
    } catch (error) {
      console.error(error);
      setError(mapXdsErrorMessage(error));

      if (!isHandledEvmError(error)) {
        LoggerService.error({
          name: 'useCommitment: calculateFee',
          error,
          payload: data,
        });
      }
    } finally {
      setIsLoadingFee(false);
    }
  }, []);

  useDeepEffect(() => {
    if (isEnabledFeeCalculation && !isLoadingTx) {
      calculateFee(registrationData);
    } else {
      setError(null);
      setFee(null);
      setIsLoadingFee(false);
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
    commitment,
    isLoadingTx,
    isLoadingFee,
    error,
    fee,
  };
};

export default useCommitment;
