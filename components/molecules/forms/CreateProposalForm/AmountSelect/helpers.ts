import { IntlFormatters } from 'react-intl';
import * as Yup from 'yup';

import type { CosmosCurrency } from '@/shared/types';

import { MAX_FIELD_COUNT } from './constants';
import type { FormValues, InputName, SelectName } from './types';

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
