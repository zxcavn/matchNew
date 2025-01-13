import { isValidXdsName } from '@/helpers';
import { useDebouncedCallback } from '@xfi/hooks';
import { isAddress } from 'ethers';
import { useCallback, useEffect, useRef, useState } from 'react';

type ResolvedInputData = {
  name?: string | null;
  address: string;
};

type UseXdsAddressInputOptions = {
  inputValue: string;
  isEnabled?: boolean;
};

const ERROR_MESSAGES = {
  incorrectRecipientAddress: 'ERRORS.INCORRECT_RECIPIENT_ADDRESS',
  noResolutionsForDomain: 'ERRORS.NO_RESOLUTION_FOR_DOMAIN_PROVIDED',
  default: 'ERRORS.SOMETHING_WENT_WRONG_WHEN_TRYING_TO_SEARCH',
};

const useXdsAddressInput = ({ inputValue, isEnabled }: UseXdsAddressInputOptions) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ResolvedInputData>({
    address: '',
  });

  const inputValueRef = useRef(inputValue);

  inputValueRef.current = inputValue;

  const resolveInputValue = useCallback(async (input: string) => {
    const inputValue = input.toLowerCase().trim();

    const performForSameValue = (func: () => void) => {
      return inputValue.toLowerCase() === inputValueRef.current.toLowerCase() && func();
    };

    try {
      setIsLoading(true);

      const isValidAddress = isAddress(inputValue);
      const isValidName = isValidXdsName(inputValue);

      if (!isValidAddress && !isValidName) {
        throw new Error(ERROR_MESSAGES.incorrectRecipientAddress);
      }
    } catch (error) {
      performForSameValue(() => setError(getErrorMessage(error)));
    } finally {
      performForSameValue(() => setIsLoading(false));
    }
  }, []);

  const debouncedResolveInputValue = useDebouncedCallback(resolveInputValue);

  useEffect(() => {
    if (inputValue && isEnabled) {
      setIsLoading(true);
      debouncedResolveInputValue(inputValue);
    }
  }, [inputValue, isEnabled]);

  return {
    name: data.name,
    address: data.address,
    isLoading,
    error,
  };
};

const getErrorMessage = (error: unknown) => {
  if (!(error instanceof Error)) return ERROR_MESSAGES.default;

  return Object.values(ERROR_MESSAGES).includes(error.message) ? error.message : ERROR_MESSAGES.default;
};


export default useXdsAddressInput;
