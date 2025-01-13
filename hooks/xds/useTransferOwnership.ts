import { useDebouncedCallback } from '@xfi/hooks';
import { isAddress } from 'ethers';
import { useCallback, useEffect, useRef, useState } from 'react';

import { mapXdsErrorMessage, normalizeName } from '@/helpers';
import { Subscription, useSocketSubscription } from '@/hocs/SocketSubscriptionProvider';
import { calculateCommission, mapTransactionResponse } from '@/lib/xfi.lib/helpers';

import useNameWrapper from './useNameWrapper';

type UseTransferOwnershipOptions = {
  recipient: string;
  nameOrLabel: string;
  isEnabledFeeCalculation?: boolean;
};

const useTransferOwnership = ({ recipient, nameOrLabel, isEnabledFeeCalculation }: UseTransferOwnershipOptions) => {
  const subscriptionRef = useRef<Subscription | null>();
  const nameWrapper = useNameWrapper();
  const { subscribeTx } = useSocketSubscription();

  const [isLoadingTx, setIsLoadingTx] = useState(false);
  const [isLoadingFee, setIsLoadingFee] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fee, setFee] = useState<bigint | null>(null);

  const transferOwnership = useCallback(
    async ({ onSuccess }: { onSuccess: (params: { fee: string }) => void }) => {
      try {
        setIsLoadingTx(true);

        const tx = await nameWrapper.safeTransferFrom({
          to: recipient,
          nameLabel: normalizeName(nameOrLabel)?.label || '',
        });

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
    [recipient, nameOrLabel]
  );

  const calculateFee = useCallback(
    async ({ nameOrLabel, recipient }: Omit<UseTransferOwnershipOptions, 'isEnabledFeeCalculation'>) => {
      try {
        setIsLoadingFee(true);
        setError(null);
        const fee = await nameWrapper.estimateSafeTransferFromFee({
          to: recipient,
          nameLabel: normalizeName(nameOrLabel)?.label || '',
        });

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
    const isEnabled = isEnabledFeeCalculation && nameOrLabel && !isLoadingTx && isAddress(recipient);

    if (isEnabled) {
      setIsLoadingFee(true);
      debouncedCalculateFee({ nameOrLabel, recipient });
    }

    if (!isEnabledFeeCalculation && !isLoadingTx) {
      setFee(null);
      setError(null);
    }
  }, [nameOrLabel, recipient, isEnabledFeeCalculation]);

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
    transferOwnership,
  };
};

export default useTransferOwnership;
