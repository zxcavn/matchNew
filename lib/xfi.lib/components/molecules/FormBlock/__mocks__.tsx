import * as Yup from 'yup';

import type { InputText } from '../../atoms';
import { TEST_ID as CHECKBOX_TEST_ID } from '../../atoms/inputs/Checkbox/Checkbox';
import { TEST_ID as CHECKBOX_GROUP_TEST_ID } from '../../atoms/inputs/CheckboxGroup/CheckboxGroup';
import { TEST_ID as TEXT_TEST_ID } from '../../atoms/inputs/Input/Input';
import { TEST_ID as FILE_TEST_ID } from '../../atoms/inputs/InputFile/InputFile';
import { TEST_ID as NUMBER_TEST_ID } from '../../atoms/inputs/NumberInput/NumberInput';
import { TEST_ID as RADIO_GROUP_TEST_ID } from '../../atoms/inputs/RadioGroup/RadioGroup';
import { TEST_ID as SELECT_TEST_ID } from '../../atoms/inputs/Select/Select';
import { TEST_ID as SWITCH_TEST_ID } from '../../atoms/inputs/Switch/Switch';
import {
  type FormBlockGenericValidationRules,
  type FormBlockInput,
  type FormBlockInputsData,
  type FormBlockValue,
  type FormBlockValues,
  FormBlockInputTypesEnum,
} from './types';

const COMPONENT_TEST_ID = 'component-test-id';

export const INPUT_TEST_IDS = [
  SWITCH_TEST_ID,
  CHECKBOX_TEST_ID,
  CHECKBOX_GROUP_TEST_ID,
  RADIO_GROUP_TEST_ID,
  SELECT_TEST_ID,
  TEXT_TEST_ID,
  NUMBER_TEST_ID,
  FILE_TEST_ID,
  COMPONENT_TEST_ID,
];

export const GET_FORMIK_ERROR_CONFIG = [
  { param: undefined, expected: undefined },
  { param: 'This is an error.', expected: 'This is an error.' },
  { param: ['Error 1', 'Error 2', 'Error 3'], expected: 'Error 1. Error 2. Error 3' },
  { param: { field1: 'Error 1', field2: 'Error 2', field3: 'Error 3' }, expected: 'Error 1. Error 2. Error 3' },
];

export type FormValues = {
  switch: boolean;
  checkbox: boolean;
  checkboxGroup: string;
  radioGroup: string;
  select: string | string[];
  autocomplete: string | string[];
  text: string;
  number: string;
  copy: string;
  file: [];
  component: string;
};

export const INITIAL_VALUES: FormValues = {
  switch: true,
  checkbox: false,
  checkboxGroup: 'checkboxGroup2',
  radioGroup: 'radioGroup2',
  select: 'select',
  autocomplete: 'autocomplete',
  text: 'text2',
  number: '1',
  copy: 'copy2',
  file: [],
  component: 'component',
};

export const EXPECTED_INITIAL_VALUES: FormValues = {
  switch: true,
  checkbox: true,
  checkboxGroup: 'checkboxGroup',
  radioGroup: 'radioGroup',
  select: 'select',
  autocomplete: 'autocomplete',
  text: 'text',
  number: '1',
  copy: 'copy',
  file: [],
  component: 'component',
};

export const GET_FORM_BLOCK_INITIAL_VALUES_CONFIG: Array<{
  input: FormBlockInput<FormValues>;
  expected: FormBlockValue;
}> = [
  {
    input: {
      type: FormBlockInputTypesEnum.switch,
      inputName: 'switch',
      inputProps: {
        defaultChecked: EXPECTED_INITIAL_VALUES.switch,
      },
    },
    expected: EXPECTED_INITIAL_VALUES.switch,
  },
  {
    input: {
      type: FormBlockInputTypesEnum.checkbox,
      inputName: 'checkbox',
      inputProps: {
        defaultChecked: EXPECTED_INITIAL_VALUES.checkbox,
      },
    },
    expected: EXPECTED_INITIAL_VALUES.checkbox,
  },
  {
    input: {
      type: FormBlockInputTypesEnum.checkboxGroup,
      inputName: 'checkboxGroup',
      inputProps: {
        options: [],
        value: [],
        defaultValue: [EXPECTED_INITIAL_VALUES.checkboxGroup],
      },
    },
    expected: [EXPECTED_INITIAL_VALUES.checkboxGroup],
  },
  {
    input: {
      type: FormBlockInputTypesEnum.radioGroup,
      inputName: 'radioGroup',
      inputProps: {
        defaultValue: EXPECTED_INITIAL_VALUES.radioGroup,
      },
    },
    expected: EXPECTED_INITIAL_VALUES.radioGroup,
  },
  {
    input: {
      type: FormBlockInputTypesEnum.select,
      inputName: 'select',
      inputProps: {
        value: '',
        options: [{ value: EXPECTED_INITIAL_VALUES.select }],
        placeholder: { type: 'intl', id: 'INPUT.PLACEHOLDER' },
      },
    },
    expected: EXPECTED_INITIAL_VALUES.select,
  },
  {
    input: {
      type: FormBlockInputTypesEnum.text,
      inputName: 'text',
      inputProps: {
        defaultValue: EXPECTED_INITIAL_VALUES.text,
        placeholder: {
          type: 'text',
          text: 'Enter Text',
        },
      },
    },
    expected: EXPECTED_INITIAL_VALUES.text,
  },
  {
    input: {
      type: FormBlockInputTypesEnum.number,
      inputName: 'number',
      inputProps: {
        defaultValue: EXPECTED_INITIAL_VALUES.number,
      },
    },
    expected: EXPECTED_INITIAL_VALUES.number,
  },
  {
    input: {
      type: FormBlockInputTypesEnum.copy,
      inputName: 'copy',
      inputProps: {
        defaultValue: EXPECTED_INITIAL_VALUES.copy,
      },
    },
    expected: EXPECTED_INITIAL_VALUES.copy,
  },
  {
    input: {
      type: FormBlockInputTypesEnum.file,
      inputName: 'file',
      inputProps: {
        name: 'file',
        value: [],
      },
    },
    expected: EXPECTED_INITIAL_VALUES.file,
  },
  {
    input: {
      type: FormBlockInputTypesEnum.component,
      inputName: 'component',
      inputProps: {
        defaultValue: EXPECTED_INITIAL_VALUES.component,
        render: () => 'text',
      },
    },
    expected: EXPECTED_INITIAL_VALUES.component,
  },
];

export const VALIDATION_RULES: FormBlockGenericValidationRules<FormBlockValues> = {
  text: Yup.string().required('Text field is required'),
  number: Yup.number().required('Number field is required'),
  select: Yup.string().required('Select field is required'),
  checkbox: Yup.boolean().required('Checkbox field is required'),
  checkboxGroup: Yup.array().required('Checkbox group field is required'),
  radioGroup: Yup.string().required('Radio group selection is required'),
  switch: Yup.boolean().required('Switch field is required'),
  file: Yup.boolean().required('File upload is required'),
  component: Yup.number().required('Component field is required'),
};

export const INPUTS_DATA: FormBlockInputsData<FormBlockValues> = [
  { type: FormBlockInputTypesEnum.text, inputName: 'text', inputProps: {} },
  { type: FormBlockInputTypesEnum.number, inputName: 'number', inputProps: {} },
  {
    type: FormBlockInputTypesEnum.select,
    inputName: 'select',
    inputProps: {
      value: '',
      options: [{ value: EXPECTED_INITIAL_VALUES.select }],
    },
  },
  { type: FormBlockInputTypesEnum.checkbox, inputName: 'checkbox', inputProps: {} },
  {
    type: FormBlockInputTypesEnum.checkboxGroup,
    inputName: 'checkboxGroup',
    inputProps: {
      options: [],
      value: [],
      defaultValue: [EXPECTED_INITIAL_VALUES.checkboxGroup],
    },
  },
  { type: FormBlockInputTypesEnum.radioGroup, inputName: 'radioGroup', inputProps: {} },
  { type: FormBlockInputTypesEnum.switch, inputName: 'switch', inputProps: {} },
  { type: FormBlockInputTypesEnum.file, inputName: 'file', inputProps: { name: 'file', value: [] } },
  {
    type: FormBlockInputTypesEnum.component,
    inputName: 'component',
    inputProps: {
      render: () => <div data-testid={COMPONENT_TEST_ID}>component</div>,
    },
  },
];

const NAME_TEXT_1 = 'name-text-1';
const NAME_TEXT_2 = 'name-text-2';
const OPTION_LABEL_TEXT_1 = 'option-label-text-1';
const OPTION_LABEL_TEXT_2 = 'option-label-text-2';

const MOCK_OPTIONS: { label: InputText; name: string }[] = [
  { label: { type: 'text', text: OPTION_LABEL_TEXT_1 }, name: NAME_TEXT_1 },
  { label: { type: 'text', text: OPTION_LABEL_TEXT_2 }, name: NAME_TEXT_2 },
];

export const FILLED_INPUTS_DATA: FormBlockInputsData<FormBlockValues> = [
  {
    type: FormBlockInputTypesEnum.text,
    inputName: 'text',
    inputProps: {
      defaultValue: EXPECTED_INITIAL_VALUES.text,
    },
  },
  {
    type: FormBlockInputTypesEnum.number,
    inputName: 'number',
    inputProps: {
      defaultValue: '1',
    },
  },
  {
    type: FormBlockInputTypesEnum.select,
    inputName: 'select',
    inputProps: {
      value: 'select',
      options: [{ value: EXPECTED_INITIAL_VALUES.select }],
    },
  },
  {
    type: FormBlockInputTypesEnum.checkbox,
    inputName: 'checkbox',
    inputProps: {
      defaultChecked: EXPECTED_INITIAL_VALUES.checkbox,
    },
  },
  {
    type: FormBlockInputTypesEnum.checkboxGroup,
    inputName: 'checkboxGroup',
    inputProps: {
      options: MOCK_OPTIONS,
      value: [NAME_TEXT_1],
    },
  },
  {
    type: FormBlockInputTypesEnum.radioGroup,
    inputName: 'radioGroup',
    inputProps: {
      defaultValue: EXPECTED_INITIAL_VALUES.radioGroup,
    },
  },
  {
    type: FormBlockInputTypesEnum.switch,
    inputName: 'switch',
    inputProps: {
      defaultChecked: EXPECTED_INITIAL_VALUES.switch,
    },
  },
];

export {
  CHECKBOX_GROUP_TEST_ID,
  CHECKBOX_TEST_ID,
  FILE_TEST_ID,
  NUMBER_TEST_ID,
  RADIO_GROUP_TEST_ID,
  SELECT_TEST_ID,
  SWITCH_TEST_ID,
  TEXT_TEST_ID,
};
