import { useDebouncedCallback, useDeepEffect } from '@xfi/hooks';
import isEqual from 'lodash/isEqual';
import { useCallback, useEffect, useRef, useState } from 'react';

import { isHandledEvmError, mapXdsErrorMessage } from '@/helpers/evmErrors';
import { Subscription, useSocketSubscription } from '@/hocs/SocketSubscriptionProvider';
import { LoggerService } from '@/services';
import { RenewOptions } from '@/services/xds';

import useEthRegistrarController from './useEthRegistrarController';

type UseRenewPageOptions = {
  isEnabledFeeCalculation?: boolean;
} & Omit<RenewOptions, 'value'>;

type EstimatedRenewData = {
  renewPrice: bigint;
  networkFee: bigint;
  totalPrice: bigint;
};

type Listeners = {
  onSuccess: (params: { txHash: string }) => void;
};

const DEFAULT_DEBOUNCE_TIMEOUT = 500;
const DEFAULT_ESTIMATED_DATA: EstimatedRenewData = {
  renewPrice: 0n,
  networkFee: 0n,
  totalPrice: 0n,
};

const useRenewName = ({ isEnabledFeeCalculation, ...options }: UseRenewPageOptions) => {
  const [isLoadingTx, setIsLoadingTx] = useState(false);
  const [isLoadingFee, setIsLoadingFee] = useState(false);
  const [error, setError] = useState<string | null>('');
  const [estimatedRenewData, setEstimatedRenewData] = useState<EstimatedRenewData>(DEFAULT_ESTIMATED_DATA);

  const subscriptionRef = useRef<Subscription | null>();
  const ethRegistrarController = useEthRegistrarController();
  const { subscribeTx } = useSocketSubscription();

  const { nameLabel, duration } = options;
  const optionsRef = useRef(options);

  optionsRef.current = options;

  const calculateFee = useCallback(async (options: Omit<RenewOptions, 'value'>) => {
    const performForSameOptions = (func: () => void) => isEqual(options, optionsRef.current) && func();

    try {
      setIsLoadingFee(true);

      const { nameLabel, duration } = options;
      const [renewPrice] = await ethRegistrarController.rentPrice(nameLabel, duration);
      const fee = await ethRegistrarController.estimateRenewFee({
        nameLabel,
        duration,
        value: renewPrice,
      });

      performForSameOptions(() =>
        setEstimatedRenewData({
          networkFee: fee,
          renewPrice,
          totalPrice: renewPrice + fee,
        })
      );
    } catch (error) {
      performForSameOptions(() => {
        console.error(error);
        setError(mapXdsErrorMessage(error));

        if (!isHandledEvmError(error)) {
          LoggerService.error({
            name: 'useRenewName: calculateFee',
            error,
            payload: options,
          });
        }
      });
    } finally {
      performForSameOptions(() => setIsLoadingFee(false));
    }
  }, []);

  const renew = useCallback(
    async ({ onSuccess }: Listeners) => {
      try {
        setIsLoadingTx(true);

        const [value] = await ethRegistrarController.rentPrice(nameLabel, duration);
        const tx = await ethRegistrarController.renew({
          nameLabel,
          duration,
          value,
        });

        subscriptionRef.current = subscribeTx(tx.hash, () => {
          onSuccess({ txHash: tx.hash });
          setIsLoadingTx(false);
        });
      } catch (error) {
        console.error(error);
        setError(mapXdsErrorMessage(error));

        if (!isHandledEvmError(error)) {
          LoggerService.error({
            name: 'useRenewName: renew',
            error,
            payload: { nameLabel, duration },
          });
        }

        setIsLoadingTx(false);
      }
    },
    [nameLabel, duration]
  );

  const debouncedCalculateFee = useDebouncedCallback(calculateFee, DEFAULT_DEBOUNCE_TIMEOUT);

  useDeepEffect(() => {
    if (isEnabledFeeCalculation) {
      setIsLoadingFee(true);
      debouncedCalculateFee(options);
    } else {
      setError(null);
      setEstimatedRenewData(DEFAULT_ESTIMATED_DATA);
    }
  }, [options, isEnabledFeeCalculation]);

  useEffect(() => {
    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
      }
    };
  }, []);

  return {
    renew,
    isLoadingTx,
    isLoadingFee,
    error,
    estimatedRenewData,
  };
};

export default useRenewName;
