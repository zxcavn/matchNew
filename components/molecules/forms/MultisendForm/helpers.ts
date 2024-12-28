import type { IntlFormatters } from 'react-intl';
import * as Yup from 'yup';

import { isAccountAddress } from '@/services/cosmos/helpers';
import type { CosmosCurrency } from '@/shared/types';

import type { FormValues, InputName, SelectName } from './types';

export const MAX_FIELD_COUNT = 2;

export const ADDRESS_INPUT_NAME = 'address';

export const getInputsProps = (isFirst: boolean, values: FormValues) => {
  const selectName: SelectName = isFirst ? 'firstSelect' : 'secondSelect';
  const inputName: InputName = isFirst ? 'firstInput' : 'secondInput';
  const selectValue = values[selectName] as CosmosCurrency;
  const inputValue = values[inputName];

  return {
    selectName,
    selectValue,
    inputName,
    inputValue,
  };
};

export const getFormValidationRules = (fieldCount: number, formatMessage: IntlFormatters['formatMessage']) => {
  const shortMessage = formatMessage({ id: 'ERRORS.SHORT_REQUIRED_FIELD' });

  const shortRequired = Yup.string()
    .required(shortMessage)
    .test('trim', shortMessage, v => Boolean(v.trim()));

  const validationRules = {
    address: Yup.string()
      .required(formatMessage({ id: 'LIB.ERRORS.REQUIRED_FIELD' }))
      .test('isValidAddress', formatMessage({ id: 'ERRORS.INCORRECT_WALLET_ADDRESS' }), v => {
        const trimmedValue = v.trim();

        return isAccountAddress(trimmedValue);
      }),
    firstInput: shortRequired.test('equal zero', shortMessage, v => Boolean(Number(v))),
    firstSelect: shortRequired,
  };

  if (fieldCount < MAX_FIELD_COUNT) {
    return Yup.object().shape(validationRules);
  } else {
    return Yup.object().shape({
      ...validationRules,
      secondInput: shortRequired.test('equal zero', shortMessage, v => Boolean(Number(v))),
      secondSelect: shortRequired,
    });
  }
};

const SPACE = ' ';
const NEW_LINE = '\n';
const UNNECESSARY_SPACES_REGEXP = /\s\s+/g;

export const splitAndValidateAddresses = (value: string): string[] => {
  return value
    .trim()
    .replaceAll(NEW_LINE, SPACE)
    .replaceAll(UNNECESSARY_SPACES_REGEXP, SPACE)
    .split(' ')
    .filter(isAccountAddress);
};
