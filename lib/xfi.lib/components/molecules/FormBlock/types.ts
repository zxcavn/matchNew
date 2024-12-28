import type { useFormik } from 'formik';
import type { ReactNode } from 'react';
import type * as Yup from 'yup';

import type {
  AutocompleteProps,
  CheckboxGroupProps,
  CheckboxProps,
  CopyInputProps,
  InputFileProps,
  InputProps,
  PasswordInputProps,
  RadioGroupProps,
  SelectProps,
  SwitchProps,
} from '../../atoms';
import { LargeInputProps } from '../../atoms/inputs/LargeInput';

export type FormBlockHandlers<TValues extends FormBlockValues> = Pick<
  ReturnType<typeof useFormik<FormBlockGenericValues<TValues>>>,
  'setTouched' | 'validateForm' | 'validateField' | 'setFieldValue' | 'setFieldTouched' | 'resetForm'
>;

export enum FormBlockInputTypesEnum {
  text = 'text',
  copy = 'copy',
  number = 'number',
  select = 'select',
  autocomplete = 'autocomplete',
  switch = 'switch',
  checkbox = 'checkbox',
  checkboxGroup = 'checkboxGroup',
  radioGroup = 'radioGroup',
  file = 'file',
  password = 'password',
  largeInput = 'largeInput',
  jsx = 'jsx',
  component = 'component',
}

export type FormBlockValue = number | string | string[] | boolean | File[] | undefined;

export type FormBlockValues = { [key: string]: FormBlockValue };

export type GenericFormBlockInput<Data, InputProps, Type> = InputProps & {
  inputName: Exclude<keyof Data, symbol | number>;
  type: Type;
};

export type FormBlockInput<T extends FormBlockValues> =
  | {
      type: FormBlockInputTypesEnum.text | FormBlockInputTypesEnum.number;
      inputName: keyof T;
      inputProps: InputProps;
    }
  | {
      type: FormBlockInputTypesEnum.largeInput;
      inputName: keyof T;
      inputProps: LargeInputProps;
    }
  | {
      type: FormBlockInputTypesEnum.copy;
      inputName: keyof T;
      inputProps: CopyInputProps;
    }
  | {
      type: FormBlockInputTypesEnum.password;
      inputName: keyof T;
      inputProps: PasswordInputProps;
    }
  | {
      type: FormBlockInputTypesEnum.select;
      inputName: keyof T;
      inputProps: SelectProps;
    }
  | {
      type: FormBlockInputTypesEnum.autocomplete;
      inputName: keyof T;
      inputProps: AutocompleteProps;
    }
  | {
      type: FormBlockInputTypesEnum.checkbox;
      inputName: keyof T;
      inputProps: CheckboxProps;
    }
  | {
      type: FormBlockInputTypesEnum.checkboxGroup;
      inputName: keyof T;
      inputProps: CheckboxGroupProps;
    }
  | {
      type: FormBlockInputTypesEnum.radioGroup;
      inputName: keyof T;
      inputProps: RadioGroupProps;
    }
  | {
      type: FormBlockInputTypesEnum.switch;
      inputName: keyof T;
      inputProps: SwitchProps;
    }
  | {
      type: FormBlockInputTypesEnum.file;
      inputName: keyof T;
      inputProps: InputFileProps;
    }
  | {
      type: FormBlockInputTypesEnum.jsx;
      inputProps: {
        component: ReactNode;
      };
    }
  | {
      type: FormBlockInputTypesEnum.component;
      inputName?: keyof T;
      inputProps: {
        defaultValue?: T[keyof T];
        render: (params: RenderFunctionParams<T>) => ReactNode;
      };
    };

export type UseFormikReturnValue<Values extends FormBlockValues> = ReturnType<
  typeof useFormik<FormBlockGenericValues<Values>>
>;

type RenderFunctionParams<Values extends FormBlockValues> = {
  getField: (fieldName: keyof Values extends string ? keyof Values : never) => { value: string; error?: string };
  handleBlur: UseFormikReturnValue<Values>['handleBlur'];
  handleChange: UseFormikReturnValue<Values>['handleChange'];
  isDisabled?: boolean;
  setFieldValue: UseFormikReturnValue<Values>['setFieldValue'];
};

export type FormBlockInputsData<T extends FormBlockValues> = Array<FormBlockInput<T>>;

export type FormBlockGenericValues<T extends FormBlockValues> = {
  [K in keyof T]: T[K];
};

export type FormBlockGenericValidationRules<T extends FormBlockValues = FormBlockValues> = {
  [K in keyof T]?:
    | Yup.Schema<string | undefined>
    | Yup.Schema<number | undefined>
    | Yup.StringSchema
    | Yup.Schema<File[] | undefined>
    | Yup.NumberSchema
    | Yup.BooleanSchema;
};
