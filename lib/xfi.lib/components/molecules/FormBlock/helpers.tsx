import { FormikErrors, FormikTouched, FormikValues } from 'formik';

import {
  type FormBlockGenericValidationRules,
  type FormBlockGenericValues,
  type FormBlockInputsData,
  type FormBlockValues,
  FormBlockInputTypesEnum,
} from './types';

export const getFormikError = <T extends FormBlockValues>(
  err: FormikErrors<T>[keyof FormikErrors<T>]
): string | undefined => {
  if (Array.isArray(err)) {
    return err.join('. ');
  }

  if (typeof err === 'object') {
    return Object.values(err).join('. ');
  }

  return err;
};

export const getFormBlockInitialValues = <T extends FormBlockValues>({
  inputsData,
  initialValues = {} as FormBlockGenericValues<T>,
}: {
  inputsData: FormBlockInputsData<T>;
  initialValues?: FormBlockGenericValues<T>;
}) => {
  const result = inputsData.reduce((acc, { inputProps, type, ...rest }) => {
    let initialValue;

    if (type === FormBlockInputTypesEnum.jsx) {
      return acc;
    }

    switch (type) {
      case FormBlockInputTypesEnum.switch:

      case FormBlockInputTypesEnum.checkbox:
        initialValue = inputProps.defaultChecked || false;
        break;

      case FormBlockInputTypesEnum.checkboxGroup:
        initialValue = inputProps.defaultValue || [];
        break;

      case FormBlockInputTypesEnum.radioGroup:
        initialValue = inputProps.defaultValue || '';
        break;

      case FormBlockInputTypesEnum.select:
        initialValue = inputProps.options[0]?.value || '';
        break;

      case FormBlockInputTypesEnum.autocomplete:
        initialValue = inputProps.options[0]?.value || '';
        break;

      case FormBlockInputTypesEnum.file:
        initialValue = inputProps.value || [];
        break;

      case FormBlockInputTypesEnum.text:

      case FormBlockInputTypesEnum.password:

      case FormBlockInputTypesEnum.largeInput:

      case FormBlockInputTypesEnum.number:

      case FormBlockInputTypesEnum.copy:

      case FormBlockInputTypesEnum.component:
        initialValue = inputProps.defaultValue || '';
        break;
    }

    if (initialValue !== undefined && 'inputName' in rest && rest.inputName) {
      acc[rest.inputName] = initialValue as T[keyof T];
    }

    return acc;
  }, {} as FormBlockGenericValues<T>);

  return { ...result, ...initialValues };
};

export const getFormBlockValidationRules = <T extends FormBlockValues>({
  inputsData,
  validationRules,
}: {
  inputsData: FormBlockInputsData<T>;
  validationRules: FormBlockGenericValidationRules<T>;
}) => {
  return inputsData.reduce<FormBlockGenericValidationRules<T>>((acc, curr) => {
    if (curr.type === FormBlockInputTypesEnum.jsx || !curr.inputName) {
      return acc;
    }

    const validationRule = validationRules[curr.inputName];

    if (validationRule) {
      acc[curr.inputName] = validationRule;
    }

    return acc;
  }, {});
};

export const getField = <V extends FormBlockValues>(
  fieldName: string,
  {
    touched,
    errors,
    values,
  }: {
    touched: FormikTouched<FormBlockGenericValues<V>>;
    errors: FormikErrors<FormBlockGenericValues<V>>;
    values: FormikValues;
  }
) => ({
  value: values[fieldName],
  error: touched[fieldName] && errors[fieldName] ? getFormikError(errors[fieldName]) : undefined,
});
