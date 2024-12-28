import { useDebouncedCallback } from '@xfi/hooks';
import { isAddress } from 'ethers';
import { useCallback, useEffect, useRef, useState } from 'react';

import { mapXdsErrorMessage, normalizeName } from '@/helpers';
import { Subscription, useSocketSubscription } from '@/hocs/SocketSubscriptionProvider';
import { calculateCommission, mapTransactionResponse } from '@/lib/xfi.lib/helpers';

import usePublicResolver from './usePublicResolver';

type UseUpdateXdsRecordOptions = {
  nameOrLabel: string;
  newAddress: string;
  isEnabledFeeCalculation?: boolean;
};

const useUpdateXdsRecord = ({ nameOrLabel, newAddress, isEnabledFeeCalculation }: UseUpdateXdsRecordOptions) => {
  const subscriptionRef = useRef<Subscription | null>();
  const resolver = usePublicResolver();
  const { subscribeTx } = useSocketSubscription();

  const [isLoadingTx, setIsLoadingTx] = useState(false);
  const [isLoadingFee, setIsLoadingFee] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fee, setFee] = useState<bigint | null>(null);

  const updateXdsRecord = useCallback(
    async ({ onSuccess }: { onSuccess: (params: { fee: string }) => void }) => {
      try {
        setIsLoadingTx(true);

        const label = normalizeName(nameOrLabel)?.label || '';
        const tx = await resolver.setAddr(label, newAddress);

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
    [nameOrLabel, newAddress]
  );

  const calculateFee = useCallback(
    async ({ nameOrLabel, newAddress }: Omit<UseUpdateXdsRecordOptions, 'isEnabledFeeCalculation'>) => {
      try {
        setIsLoadingFee(true);
        setError(null);
        const label = normalizeName(nameOrLabel)?.label || '';
        const fee = await resolver.estimateSetAddrFee(label, newAddress);

        setFee(fee);
      } catch (error) {
        console.error(error);
        setError(mapXdsErrorMessage(error));
        setFee(null);
      } finally {
        setIsLoadingFee(false);
      }
    },
    []
  );

  const debouncedCalculateFee = useDebouncedCallback(calculateFee);

  useEffect(() => {
    if (isEnabledFeeCalculation && nameOrLabel && isAddress(newAddress) && !isLoadingTx) {
      setIsLoadingFee(true);
      debouncedCalculateFee({ nameOrLabel, newAddress });
    }

    if (!isEnabledFeeCalculation && !isLoadingTx) {
      setFee(null);
      setError(null);
    }
  }, [nameOrLabel, newAddress, isEnabledFeeCalculation]);

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
    updateXdsRecord,
  };
};

export default useUpdateXdsRecord;
