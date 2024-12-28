import { Typography } from '@mui/material';
import { useDebouncedValue } from '@xfi/hooks';
import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { NumberInput } from '../../inputs';
import { StyledPaginationInputContainer } from './styles';

export const INPUT_PAGINATION_CONTAINER_TEST_ID = 'input-pagination-container-test-id';
export const INPUT_PAGINATION_TEST_ID = 'input-pagination-test-id';

export type PaginationInputProps = {
  count: number;
  onChange: (page: number) => void;
};

export const CHANGE_VALUE_DEBOUNCE_DELAY = 1500;
const INPUT_VALUE_REGEXP = /[^0-9]/g;

const getInputValue = (value: string): string => {
  return value.replaceAll(INPUT_VALUE_REGEXP, '');
};

export const PaginationInput = ({ count, onChange }: PaginationInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const [isError, setIsError] = useState(false);
  const debouncedInputValue = useDebouncedValue(inputValue, CHANGE_VALUE_DEBOUNCE_DELAY);
  const inputEvent = useRef<null | ChangeEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>>(null);

  useEffect(() => {
    if (isValidInputValue(debouncedInputValue, false)) {
      onChange(Number(debouncedInputValue));
      setInputValue('');

      if (inputEvent.current?.target instanceof HTMLInputElement) {
        inputEvent.current.target.blur();
      }
    }
  }, [debouncedInputValue]);

  const isValidInputValue = useCallback(
    (value: string, allowEmptyString = true): boolean => {
      if (value === '' && allowEmptyString) {
        return true;
      }

      return !INPUT_VALUE_REGEXP.test(value) && Number(value) <= count && Number(value) > 0;
    },
    [count]
  );

  const onInputPageKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter' && event.target instanceof HTMLInputElement) {
        const value = getInputValue(event.target.value);

        if (isValidInputValue(value, false)) {
          onChange(Number(value));
          setInputValue('');
          event.target.blur();
        }
      }
    },
    [onChange, isValidInputValue]
  );

  const onInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = getInputValue(event.target.value);

      inputEvent.current = event;

      setInputValue(value);
      setIsError(!isValidInputValue(value));
    },
    [isValidInputValue]
  );

  return (
    <StyledPaginationInputContainer data-testid={INPUT_PAGINATION_CONTAINER_TEST_ID}>
      <Typography variant={'body2'} color={'neutrals.secondaryText'}>
        <FormattedMessage id={'LIB.GO_TO'} />
      </Typography>
      <NumberInput
        data-testid={INPUT_PAGINATION_TEST_ID}
        className={'paginationInput'}
        value={inputValue}
        onChange={onInputChange}
        onKeyDown={onInputPageKeyDown}
        isError={isError}
      />
      <Typography variant={'body2'} color={'neutrals.secondaryText'}>
        <FormattedMessage id={'LIB.PAGE'} />
      </Typography>
    </StyledPaginationInputContainer>
  );
};
