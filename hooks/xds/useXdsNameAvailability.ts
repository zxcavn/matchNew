import { useDebouncedCallback, useValueChanging } from '@xfi/hooks';
import { useCallback, useEffect, useRef, useState } from 'react';

import { xfiScanApi } from '@/crud';
import { normalizeName } from '@/helpers/xds';

import useEthRegistrarController from './useEthRegistrarController';

export enum XdsNameAvailabilityStatus {
  AVAILABLE = 'available',
  UNAVAILABLE = 'unavailable',
  INVALID = 'invalid',
}

type Options = {
  debounceTimeout: number;
};

const DEFAULT_DEBOUNCE_TIMEOUT = 1000;
const BUFFER_TIMEOUT = 100;

const useXdsNameAvailability = (
  name: string,
  { debounceTimeout }: Options = { debounceTimeout: DEFAULT_DEBOUNCE_TIMEOUT }
) => {
  const ethRegistrarController = useEthRegistrarController();

  const [isNameChanging, triggerNameChanging] = useValueChanging(
    debounceTimeout ? debounceTimeout + BUFFER_TIMEOUT : 0
  );
  const [status, setStatus] = useState<XdsNameAvailabilityStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const currentNameRef = useRef(name);

  currentNameRef.current = name;

  const checkNameAvailability = useCallback(async (name: string) => {
    const performForSameName = (func: () => void) => currentNameRef.current === name && func();

    try {
      setIsLoading(true);
      setError(null);

      const normalized = normalizeName(name);

      if (!normalized) {
        setStatus(XdsNameAvailabilityStatus.INVALID);
        setIsLoading(false);

        return;
      }

      const { label } = normalized;
      const isValid = label && (await ethRegistrarController.valid(label));

      if (!isValid) {
        performForSameName(() => setStatus(XdsNameAvailabilityStatus.INVALID));
      } else {
        const response = await xfiScanApi.getXdsName(label).catch(() => null);
        const isAvailable = !response;

        performForSameName(() =>
          setStatus(isAvailable ? XdsNameAvailabilityStatus.AVAILABLE : XdsNameAvailabilityStatus.UNAVAILABLE)
        );
      }
    } catch (error) {
      performForSameName(() => setError(error instanceof Error ? error : new Error('Unknown error')));
    } finally {
      performForSameName(() => setIsLoading(false));
    }
  }, []);

  const debouncedCheckNameAvailability = useDebouncedCallback(checkNameAvailability, debounceTimeout);

  useEffect(() => {
    if (name) {
      triggerNameChanging();
      debouncedCheckNameAvailability(name);
    }
  }, [name]);

  return {
    isLoading: isLoading || isNameChanging,
    error,
    status,
  };
};

export default useXdsNameAvailability;
