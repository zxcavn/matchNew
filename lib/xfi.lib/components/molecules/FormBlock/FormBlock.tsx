import { SelectChangeEvent, Stack } from '@mui/material';
import { useDeepEffect } from '@xfi/hooks';
import { FormikErrors, FormikTouched, useFormik } from 'formik';
import debounce from 'lodash/debounce';
import { Fragment, ReactNode, useCallback, useEffect, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import * as Yup from 'yup';
import { ObjectShape } from 'yup';

import { useIntlHelpers } from '../../../i18n';
import {
  type AutocompleteOptionType,
  type ButtonProps,
  type InputText,
  Autocomplete,
  Button,
  Checkbox,
  CheckboxGroup,
  CopyInput,
  Input,
  InputFile,
  LargeInput,
  NumberInput,
  PasswordInput,
  RadioGroup,
  Select,
  Switch,
} from '../../atoms';
import { getField, getFormBlockInitialValues, getFormikError } from './helpers';
import {
  type FormBlockGenericValidationRules,
  type FormBlockGenericValues,
  type FormBlockHandlers,
  type FormBlockInput,
  type FormBlockInputsData,
  type FormBlockValues,
  FormBlockInputTypesEnum,
} from './types';

export const TEST_ID = 'form-block-test-id';
export const SUBMIT_BUTTON_TEST_ID = 'submit-button-test-id';

export type Props<TValues extends FormBlockValues> = {
  id: string;
  className?: string;
  inputsWrapperClassName?: string;
  inputsData: FormBlockInputsData<TValues>;
  onSubmit?: (values: FormBlockGenericValues<TValues>) => void;
  initialValues?: FormBlockGenericValues<TValues>;
  withButton?: boolean;
  buttonProps?: ButtonProps;
  loading?: boolean;
  errors?: FormikErrors<FormBlockGenericValues<TValues>>;
  validationRules?: FormBlockGenericValidationRules<TValues>;
  observerHandler?: (values: FormBlockGenericValues<TValues>) => void;
  onHandleCheckError?: (errors: FormikErrors<FormBlockGenericValues<TValues>>) => void;
  additionalElements?: ReactNode;
  isInline?: boolean;
  buttonsContainerStyle?: unknown;
  formHandlersCb?: (handlers: FormBlockHandlers<TValues>) => void;
  /** @deprecated Use `formHandlersCb` instead */
  cbSetField?: (
    arg0: <V>(field: string, value: V, shouldValidate?: boolean) => Promise<FormikErrors<TValues>> | Promise<void>
  ) => void;
};

const FormBlock = <TValues extends FormBlockValues>(props: Props<TValues>) => {
  const {
    id: formId = 'default',
    className,
    inputsWrapperClassName,
    onSubmit = () => {},
    inputsData,
    initialValues: propsInitialValues,
    withButton = false,
    buttonProps = {},
    errors: propsErrors,
    validationRules: propsValidationRules = {},
    observerHandler,
    onHandleCheckError,
    additionalElements,
    cbSetField,
    formHandlersCb,
  } = props;
  const { locale } = useIntl();
  const { isFormattedMessageId } = useIntlHelpers();

  const getTouchedFields = <T extends FormBlockValues>(
    initValues: Partial<FormBlockGenericValues<T>>
  ): FormikTouched<TValues> => {
    const transformedObject: Record<string, boolean> = {};

    for (const key in initValues) {
      transformedObject[key] = true;
    }

    return transformedObject as FormikTouched<TValues>;
  };

  const initialValues = useMemo(
    () => getFormBlockInitialValues({ inputsData, initialValues: propsInitialValues }),
    [inputsData, propsInitialValues]
  );

  const onSubmitMemoized = useMemo(() => debounce(onSubmit, 500, { leading: true, trailing: false }), [onSubmit]);

  const {
    handleSubmit,
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    setFieldValue,
    setTouched,
    validateField,
    setFieldTouched,
    resetForm,
  } = useFormik<FormBlockGenericValues<TValues>>({
    enableReinitialize: true,
    initialValues,
    initialErrors: propsErrors,
    validationSchema: Yup.object().shape({
      ...propsValidationRules,
    } as ObjectShape),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: onSubmitMemoized,
  });

  useEffect(() => {
    Object.keys(touched).forEach(field => {
      try {
        validateField(field);
      } catch (error) {
        console.error(error);
      }
    });
  }, [locale]);

  const renderFormBlockInput = useCallback(
    (formBlockInput: FormBlockInput<TValues>) => {
      const { type, inputProps } = formBlockInput;

      if (type === FormBlockInputTypesEnum.component) {
        return inputProps.render({
          isDisabled: Boolean(Object.keys(errors).length),
          getField: fieldName => getField(fieldName, { touched, errors, values }),
          handleBlur,
          handleChange,
          setFieldValue,
        });
      }

      if (type === FormBlockInputTypesEnum.jsx) {
        return inputProps.component;
      }

      const { inputName } = formBlockInput;

      const isFormikError = touched[inputName] && Boolean(errors[inputName]);
      const isPropError = Boolean(propsErrors?.[inputName]);

      const getCaptionProps = () => {
        if (isFormikError) {
          return { type: 'text', text: getFormikError(errors[inputName]) } as InputText;
        }

        if (isPropError) {
          return { type: 'text', text: propsErrors?.[inputName] } as InputText;
        }

        return 'caption' in inputProps ? inputProps.caption : undefined;
      };

      const commonInputProps = {
        id: inputName as string,
        name: inputName as string,
        isError: isFormikError || isPropError || inputProps.isError,
        caption: getCaptionProps(),
        onBlur: handleBlur,
      };

      switch (type) {
        case FormBlockInputTypesEnum.text: {
          return (
            <Input
              {...inputProps}
              {...commonInputProps}
              onChange={e => {
                handleChange(e);
                inputProps.onChange?.(e);
              }}
              value={values[inputName] as string}
            />
          );
        }

        case FormBlockInputTypesEnum.largeInput: {
          return (
            <LargeInput
              {...inputProps}
              {...commonInputProps}
              onChange={e => {
                setFieldValue(String(inputName), e.target.value);
                inputProps.onChange?.(e);
              }}
              value={values[inputName] as string}
            />
          );
        }

        case FormBlockInputTypesEnum.copy: {
          return (
            <CopyInput
              {...inputProps}
              {...commonInputProps}
              onChange={e => {
                handleChange(e);
                inputProps.onChange?.(e);
              }}
              value={values[inputName] as string}
            />
          );
        }

        case FormBlockInputTypesEnum.password: {
          return (
            <PasswordInput
              {...inputProps}
              {...commonInputProps}
              onChange={e => {
                handleChange(e);
                inputProps.onChange?.(e);
              }}
              value={values[inputName] as string}
            />
          );
        }

        case FormBlockInputTypesEnum.number: {
          return (
            <NumberInput
              {...inputProps}
              {...commonInputProps}
              onChange={e => {
                handleChange(e);
                inputProps.onChange?.(e);
              }}
              value={values[inputName] as string}
            />
          );
        }

        case FormBlockInputTypesEnum.select: {
          return (
            <Select
              {...inputProps}
              {...commonInputProps}
              onChange={(event, child) => {
                handleChange(event);
                inputProps.onChange?.(event, child);
              }}
              value={values[inputName] as string}
            />
          );
        }

        case FormBlockInputTypesEnum.autocomplete: {
          return (
            <Autocomplete
              {...inputProps}
              {...commonInputProps}
              onBlur={() => {
                setTouched({ ...touched, [inputName]: true });
              }}
              onChange={(event: SelectChangeEvent<string>, option: AutocompleteOptionType) => {
                setFieldValue(commonInputProps.name, option.value);
                handleChange(event);
                inputProps.onChange?.(event, option);
              }}
              value={values[inputName] as string}
            />
          );
        }

        case FormBlockInputTypesEnum.switch: {
          return (
            <Switch
              {...inputProps}
              {...commonInputProps}
              onChange={(event, checked) => {
                handleChange(event);
                inputProps.onChange?.(event, checked);
              }}
              value={values[inputName] as boolean}
            />
          );
        }

        case FormBlockInputTypesEnum.checkbox: {
          return (
            <Checkbox
              {...inputProps}
              {...commonInputProps}
              onChange={(event, checked) => {
                handleChange(event);
                inputProps.onChange?.(event, checked);
              }}
              value={values[inputName] as boolean}
            />
          );
        }

        case FormBlockInputTypesEnum.checkboxGroup: {
          return (
            <CheckboxGroup
              {...inputProps}
              {...commonInputProps}
              onChange={checkboxName => {
                let checkboxes = [...(values[inputName] as string[])];

                if (checkboxes.includes(checkboxName)) {
                  checkboxes = checkboxes.filter(c => c !== checkboxName);
                } else {
                  checkboxes.push(checkboxName);
                }

                setFieldValue(inputName as string, checkboxes);

                inputProps.onChange?.(checkboxName);
              }}
              value={values[inputName] as string[]}
            />
          );
        }

        case FormBlockInputTypesEnum.radioGroup: {
          return (
            <RadioGroup
              {...inputProps}
              {...commonInputProps}
              onChange={event => {
                handleChange(event);
                inputProps.onChange?.(event);
              }}
              value={values[inputName] as string}
            />
          );
        }

        case FormBlockInputTypesEnum.file: {
          return (
            <InputFile
              {...inputProps}
              {...commonInputProps}
              onChange={event => {
                setTouched({ ...touched, [inputName]: true });
                handleChange(event);
                inputProps.onChange?.(event);
              }}
              value={values[inputName] as File[]}
            />
          );
        }

        default: {
          return null;
        }
      }
    },
    [errors, handleBlur, handleChange, setFieldValue, propsErrors, touched, values, setTouched]
  );

  const onHandleClick = useCallback(
    () => setTouched(getTouchedFields(initialValues)),
    [onHandleCheckError, validateForm]
  );

  useDeepEffect(() => {
    observerHandler?.(values);
  }, [values]);

  useEffect(() => {
    cbSetField?.(setFieldValue);
  }, []);

  useEffect(() => {
    formHandlersCb?.({ setFieldValue, validateForm, setTouched, setFieldTouched, validateField, resetForm });
  }, []);

  return (
    <form className={className} id={formId} onSubmit={handleSubmit} autoComplete="off" data-testid={TEST_ID}>
      <Stack gap={'2rem'} className={inputsWrapperClassName}>
        {inputsData.map((itemProps, i) => (
          <Fragment key={`input_${formId}_${i}`}>{renderFormBlockInput(itemProps)}</Fragment>
        ))}
      </Stack>
      {withButton && (
        <div className="buttonContainer">
          {additionalElements}

          <Button
            type="submit"
            onClick={onHandleClick}
            isDisabled={!!Object.keys(errors).length}
            {...buttonProps}
            data-testid={SUBMIT_BUTTON_TEST_ID}
          >
            <FormattedMessage
              id={isFormattedMessageId(buttonProps?.children) ? buttonProps?.children : 'SUMMARY.JOIN'}
            />
          </Button>
        </div>
      )}
    </form>
  );
};

export default FormBlock;
