import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import * as Yup from 'yup';

import { AUTOCOMPLETE_NONE_VALUE } from '../components/atoms';

export type ValidationData = {
  min?: number;
  max?: number;
};
const EMAIL_RX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const useValidationRules = (data: ValidationData = {}) => {
  const { formatMessage } = useIntl();
  const stringifiedData = JSON.stringify(data);

  const min = data?.min || 0;
  const max = data?.max || 0;

  const requiredString = Yup.string().test('trim', formatMessage({ id: 'LIB.ERRORS.REQUIRED_FIELD' }), value =>
    Boolean(value?.trim())
  );

  return useMemo(
    () => ({
      email: Yup.string()
        .required(formatMessage({ id: 'LIB.ERRORS.REQUIRED_FIELD' }))
        .matches(EMAIL_RX, formatMessage({ id: 'LIB.ERRORS.INCORRECT_EMAIL' })),
      required: Yup.string().required(formatMessage({ id: 'LIB.ERRORS.REQUIRED_FIELD' })),
      min: Yup.number().min(min, formatMessage({ id: 'LIB.ERRORS.MIN_VALUE' }, { min })),
      max: Yup.number().max(max, formatMessage({ id: 'LIB.ERRORS.MAX_VALUE' }, { max })),
      minMax: Yup.number()
        .required(formatMessage({ id: 'LIB.ERRORS.REQUIRED_FIELD' }))
        .min(min, formatMessage({ id: 'LIB.ERRORS.MIN_VALUE' }, { min }))
        .max(max, formatMessage({ id: 'LIB.ERRORS.MAX_VALUE' }, { max })),
      notEmptyArray: Yup.array().test(
        'isArrayNotEmpty',
        formatMessage({ id: 'LIB.ERRORS.REQUIRED_FIELD' }),
        arr => arr?.length !== 0
      ),
      notEmptyValue: Yup.string().test(
        'isValueNotEmpty',
        formatMessage({ id: 'LIB.ERRORS.REQUIRED_FIELD' }),
        v => v !== formatMessage({ id: 'LIB.SUMMARY.NOT_CHOSEN' })
      ),
      validNumber: Yup.string().test(
        'isValidNumber',
        formatMessage({ id: 'LIB.ERRORS.REQUIRED_FIELD' }),
        v => Boolean(Number(v)) && Boolean(v?.trim())
      ),

      requiredAutocomplete: requiredString.test(
        'isRequiredAutocomplete',
        formatMessage({
          id: 'LIB.ERRORS.REQUIRED_FIELD',
        }),
        value => value !== AUTOCOMPLETE_NONE_VALUE
      ),
      requiredString,
    }),
    [stringifiedData, formatMessage, min, max]
  );
};

export default useValidationRules;
