import { Stack } from '@mui/material';
import { useFormik } from 'formik';
import {
  ClipboardEventHandler,
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useIntl } from 'react-intl';

import { Button, Icon, NumberInput, Tooltip, TruncatedInput } from '@/lib/xfi.lib/components/atoms';
import { PlusIcon, TrashIcon } from '@/lib/xfi.lib/icons';
import { useMediaQuery } from '@/lib/xfi.lib/theme';
import { isAccountAddress } from '@/services/cosmos/helpers';
import { CosmosCurrency } from '@/shared/types';

import { CoinSelect } from '@/components/atoms';

import {
  ADDRESS_INPUT_NAME,
  getFormValidationRules,
  getInputsProps,
  MAX_FIELD_COUNT,
  splitAndValidateAddresses,
} from './helpers';
import { AmountContainer, ButtonsContainer, CoinRowContainer, MultisendFormContainer } from './styles';
import type { FormChangeValues, FormValues, ImperativeHandlers } from './types';

const INITIAL_VALUES: FormValues = {
  address: '',
  firstSelect: CosmosCurrency.MPX,
  firstInput: '',
  secondSelect: '',
  secondInput: '',
};

type Props = {
  id: string;
  disableDeleteFirstField?: boolean;
  onChange: (params: FormChangeValues) => void;
  onDelete?: (params: { formId: string }) => void;
  onPasteManyAddresses?: (addresses: string[]) => void;
  className?: string;
  initialValues?: Partial<FormValues>;
};

const MultisendForm = (
  {
    id,
    className,
    disableDeleteFirstField = false,
    initialValues: initialValuesProp = {},
    onChange,
    onDelete,
    onPasteManyAddresses,
  }: Props,
  ref: ForwardedRef<ImperativeHandlers>
) => {
  const [fieldCount, setFieldCount] = useState<number>(1);
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));
  const { formatMessage, locale } = useIntl();

  const inputRef = useRef<HTMLInputElement>(null);

  const initialValues = useMemo(() => ({ ...INITIAL_VALUES, ...initialValuesProp }), [initialValuesProp]);

  const {
    values,
    errors,
    touched,
    handleChange,
    setFieldValue,
    setValues,
    handleBlur,
    setTouched,
    validateField,
    isValid,
  } = useFormik<FormValues>({
    enableReinitialize: true,
    initialValues,
    validationSchema: getFormValidationRules(fieldCount, formatMessage),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: () => undefined,
  });

  useEffect(() => {
    try {
      Object.keys(touched).forEach(validateField);
    } catch (e) {
      console.warn(e);
    }
  }, [locale]);

  useEffect(() => {
    const { firstSelect, secondSelect } = initialValues;

    if (firstSelect && secondSelect) {
      setFieldCount(2);
    }
  }, [initialValues]);

  const onClickAdd = () => {
    if (fieldCount < MAX_FIELD_COUNT) {
      const newCoin = values.firstSelect === CosmosCurrency.MPX ? CosmosCurrency.XFI : CosmosCurrency.MPX;

      setFieldValue('secondSelect', newCoin);
      setFieldCount(count => count + 1);
    }
  };

  const onClickDelete = ({ index }: { index: number }) => {
    const isFirst = !index;

    setValues({
      firstSelect: isFirst ? values.secondSelect : values.firstSelect,
      firstInput: isFirst ? values.secondInput : values.firstInput,
      secondSelect: '',
      secondInput: '',
      address: values.address,
    });

    setTouched({
      secondInput: false,
    });

    if (fieldCount === 1) {
      onDelete?.({ formId: id });
    } else {
      setFieldCount(count => count - 1);
    }
  };

  const getSelectOptions = (index: number) => {
    const idFirst = !index;
    const options = [CosmosCurrency.MPX, CosmosCurrency.XFI];

    return idFirst
      ? fieldCount < MAX_FIELD_COUNT
        ? options
        : options.filter(v => v !== values.secondSelect)
      : options.filter(v => v !== values.firstSelect);
  };

  const isValidForm = useCallback(() => {
    if (fieldCount === 1) {
      const { firstInput, firstSelect, address } = values;

      return (
        Boolean(Number(firstInput)) &&
        [firstSelect, address].map(v => v.trim()).every(value => Boolean(value)) &&
        isAccountAddress(address.trim())
      );
    }

    return (
      Object.values(values)
        .map(v => v.trim())
        .every(value => Boolean(value)) &&
      Boolean(Number(values.firstInput)) &&
      Boolean(Number(values.secondInput)) &&
      isAccountAddress(values.address.trim())
    );
  }, [fieldCount, values]);

  useImperativeHandle(
    ref,
    () => ({
      isValidForm,
      setFieldValue,
      getFormValues: () => values,
    }),
    [values, isValid]
  );

  useEffect(() => {
    onChange({ formId: id, values, isValid, fieldCount });
  }, [id, values, fieldCount, isValid]);

  const onPaste: ClipboardEventHandler = useCallback(
    event => {
      if (!(event.target instanceof HTMLInputElement) || event.target.id !== ADDRESS_INPUT_NAME) return;

      const value = event.clipboardData.getData('text');
      const addresses = splitAndValidateAddresses(value);

      if (!addresses.length) return event.preventDefault();

      if (addresses.length > 1) {
        event.preventDefault();
        onPasteManyAddresses?.(addresses);
      }
    },
    [onPasteManyAddresses]
  );

  return (
    <MultisendFormContainer className={className} id={id} onPaste={onPaste}>
      <TruncatedInput
        id={ADDRESS_INPUT_NAME}
        name={ADDRESS_INPUT_NAME}
        autoComplete="off"
        className="input"
        label={{ type: 'intl', id: 'WALLET.ADDRESS' }}
        placeholder={{ type: 'intl', id: 'WALLET.ENTER_WALLET_ADDRESS' }}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.address}
        isError={!!touched.address && !!errors.address}
        caption={touched.address && errors.address ? { type: 'intl', id: errors.address } : undefined}
        ref={inputRef}
      />
      <Stack gap={{ xs: 0, md: '2.5rem' }}>
        {new Array(fieldCount).fill('').map((_, index) => {
          const isFirst = !index;
          const { selectName, selectValue, inputName, inputValue } = getInputsProps(isFirst, values);

          const errorMessage = touched[inputName] ? (isFirst ? errors.firstInput : errors.secondInput) : '';

          const showAddButton = isMobile ? fieldCount < MAX_FIELD_COUNT : isFirst;
          const showDeleteButton = !isFirst || !disableDeleteFirstField;

          return (
            <CoinRowContainer key={index}>
              <CoinSelect
                options={getSelectOptions(index)}
                onChange={handleChange}
                id={selectName}
                name={selectName}
                value={selectValue}
              />
              <AmountContainer>
                <NumberInput
                  className="input"
                  isError={!!errorMessage}
                  caption={errorMessage ? { type: 'intl', id: errorMessage } : undefined}
                  value={inputValue}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id={inputName}
                  name={inputName}
                  label={{ type: 'intl', id: 'SUMMARY.AMOUNT' }}
                  placeholder={{ type: 'text', text: '0' }}
                />
                <ButtonsContainer>
                  {showAddButton && (
                    <Tooltip title={'SUMMARY.ADD_COIN'} placement={'bottom'}>
                      <Button size="largeIcon" isDisabled={fieldCount > 1} onClick={onClickAdd}>
                        <Icon src={PlusIcon.dark} viewBox={'0 0 20 20'} />
                      </Button>
                    </Tooltip>
                  )}
                  {showDeleteButton && (
                    <Tooltip title={'SUMMARY.DELETE_COIN'} placement={'bottom'}>
                      <Button
                        className="trashIcon"
                        size="largeIcon"
                        variant="secondary"
                        onClick={() => onClickDelete({ index })}
                      >
                        <Icon src={TrashIcon} viewBox={'0 0 20 20'} />
                      </Button>
                    </Tooltip>
                  )}
                </ButtonsContainer>
              </AmountContainer>
            </CoinRowContainer>
          );
        })}
      </Stack>
    </MultisendFormContainer>
  );
};

export default forwardRef(MultisendForm);
