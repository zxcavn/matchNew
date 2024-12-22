import { useDebouncedCallback } from '@xfi/hooks';
import { useCallback, useEffect, useRef, useState } from 'react';

import { mapXdsErrorMessage } from '@/helpers';
import { Subscription, useSocketSubscription } from '@/hocs/SocketSubscriptionProvider';
import { calculateCommission, mapTransactionResponse } from '@/lib/xfi.lib/helpers/txs';

import useReverseRegistrar from './useReverseRegistrar';

type UseSetPrimaryNameOptions = {
  name: string;
  isEnabledFeeCalculation?: boolean;
};

const useSetPrimaryName = ({ name, isEnabledFeeCalculation }: UseSetPrimaryNameOptions) => {
  const subscriptionRef = useRef<Subscription | null>();
  const reverseRegistrar = useReverseRegistrar();
  const { subscribeTx } = useSocketSubscription();

  const [isLoadingTx, setIsLoadingTx] = useState(false);
  const [isLoadingFee, setIsLoadingFee] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fee, setFee] = useState<bigint | null>(null);

  const setPrimaryName = useCallback(
    async ({ onSuccess }: { onSuccess: (params: { fee: string }) => void }) => {
      try {
        setIsLoadingTx(true);
        const tx = await reverseRegistrar.setName({ name });

        subscriptionRef.current = subscribeTx(tx.hash, (_, txResponse) => {
          const tx = mapTransactionResponse(txResponse);
          const fee = calculateCommission(tx.messages[0], tx);

          onSuccess({ fee: fee.amount });
          setIsLoadingTx(false);
        });
      } catch (error) {
        console.error(error);
        setIsLoadingTx(false);
        setError(mapXdsErrorMessage(error));
      }
    },
    [name, reverseRegistrar, subscribeTx]
  );

  const calculateFee = useCallback(async ({ name }: Omit<UseSetPrimaryNameOptions, 'isEnabledFeeCalculation'>) => {
    try {
      setIsLoadingFee(true);
      setError(null);
      setFee(await reverseRegistrar.estimateSetNameFee({ name }));
    } catch (error) {
      console.error(error);
      setError(mapXdsErrorMessage(error));
      setFee(null);
    } finally {
      setIsLoadingFee(false);
    }
  }, []);

  const debouncedCalculateFee = useDebouncedCallback(calculateFee);

  useEffect(() => {
    if (isEnabledFeeCalculation) {
      setIsLoadingFee(true);
      debouncedCalculateFee({ name });
    }

    if (!isEnabledFeeCalculation && !isLoadingTx) {
      setFee(null);
      setError(null);
    }
  }, [name, isEnabledFeeCalculation]);

  useEffect(() => {
    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
      }
    };
  }, []);

  return {
    isLoadingFee,
    isLoadingTx,
    error,
    fee,
    setPrimaryName,
  };
};

export default useSetPrimaryName;
