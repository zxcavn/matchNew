import {
  type FormValues,
  GET_FORM_BLOCK_INITIAL_VALUES_CONFIG,
  GET_FORMIK_ERROR_CONFIG,
  INITIAL_VALUES,
  INPUTS_DATA,
  VALIDATION_RULES,
} from './__mocks__';
import { getFormBlockInitialValues, getFormBlockValidationRules, getFormikError } from './helpers';
import { type FormBlockInputsData, type FormBlockValues, FormBlockInputTypesEnum } from './types';

type AnyFormValues = any;

describe('getFormikError function', () => {
  test('should return correct values from error object', () => {
    GET_FORMIK_ERROR_CONFIG.forEach(({ param, expected }) => {
      expect(getFormikError<AnyFormValues>(param)).toBe(expected);
    });
  });

  test('getFormikError should join array errors with a period and a space', () => {
    const MOCKS = {
      props: ['Error 1', 'Error 2', 'Error 3'],
      expected: 'Error 1. Error 2. Error 3',
    };

    expect(getFormikError<AnyFormValues>(MOCKS.props)).toBe(MOCKS.expected);
  });

  test('getFormikError should join object errors with a period and a space', () => {
    const MOCKS = {
      props: { field1: 'Error 1', field2: 'Error 2', field3: 'Error 3' },
      expected: 'Error 1. Error 2. Error 3',
    };

    expect(getFormikError<AnyFormValues>(MOCKS.props)).toBe(MOCKS.expected);
  });

  test('getFormikError should return string error as is', () => {
    const MOCKS = {
      props: 'This is an error.',
      expected: 'This is an error.',
    };

    expect(getFormikError<AnyFormValues>(MOCKS.props)).toBe(MOCKS.expected);
  });

  test('getFormikError should return undefined error if called with undefined props', () => {
    const MOCKS = {
      props: undefined,
      expected: undefined,
    };

    expect(getFormikError<AnyFormValues>(MOCKS.props)).toBe(MOCKS.expected);
  });
});

describe('getFormBlockInitialValues function', () => {
  test('should return correct initial values for input type', () => {
    GET_FORM_BLOCK_INITIAL_VALUES_CONFIG.forEach(({ input, expected }) => {
      if (input.type !== FormBlockInputTypesEnum.jsx && input.inputName) {
        const initialValues = getFormBlockInitialValues<FormValues>({ inputsData: [input] });

        expect(initialValues[input.inputName]).toEqual(expected);

        const initialValuesWithDefault = getFormBlockInitialValues<FormValues>({
          inputsData: [input],
          initialValues: INITIAL_VALUES,
        });

        expect(initialValuesWithDefault[input.inputName]).toEqual(INITIAL_VALUES[input.inputName]);
      }
    });
  });
});

describe('getFormBlockValidationRules function', () => {
  test('should return correct validation rules for input types', () => {
    const result = getFormBlockValidationRules({ inputsData: INPUTS_DATA, validationRules: VALIDATION_RULES });

    expect(Object.keys(result)).toHaveLength(INPUTS_DATA.length);

    INPUTS_DATA.forEach(input => {
      if (input.type !== FormBlockInputTypesEnum.jsx && input.inputName) {
        expect(result[input.inputName]).toEqual(VALIDATION_RULES[input.inputName]);
      }
    });
  });

  test('should skip JSX inputs', () => {
    const inputsData: FormBlockInputsData<FormBlockValues> = [
      { type: FormBlockInputTypesEnum.text, inputName: 'text', inputProps: {} },
      { type: FormBlockInputTypesEnum.jsx, inputProps: { component: null } },
      {
        type: FormBlockInputTypesEnum.component,
        inputName: 'component',
        inputProps: {
          render: () => 'div',
        },
      },
    ];

    const result = getFormBlockValidationRules({ inputsData, validationRules: VALIDATION_RULES });

    expect(Object.keys(result)).toHaveLength(2);
    expect(result).toHaveProperty('text');
    expect(result).toHaveProperty('component');
  });
});
