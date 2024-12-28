import { Stack } from '@mui/material';
import { useFormik } from 'formik';
import { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useIntl } from 'react-intl';

import { Button, Icon, NumberInput, Tooltip } from '@/lib/xfi.lib/components/atoms';
import { PlusIcon, TrashIcon } from '@/lib/xfi.lib/icons';
import { CosmosCurrency } from '@/shared/types';

import { CoinSelect } from '@/components/atoms';

import { MAX_FIELD_COUNT } from './constants';
import { getFormValidationRules, getInputsProps } from './helpers';
import { StyledAmountSelect } from './styles';
import type { FormChangeValues, FormValues, ImperativeHandlers } from './types';

const INITIAL_VALUES: FormValues = {
  firstSelect: CosmosCurrency.MPX,
  firstInput: '',
  secondSelect: CosmosCurrency.XFI,
  secondInput: '',
};

type Props = {
  onChange: (values: FormChangeValues) => void;
};

const AmountSelect = ({ onChange }: Props, ref: ForwardedRef<ImperativeHandlers>) => {
  const { formatMessage } = useIntl();

  const [fieldCount, setFieldCount] = useState<number>(1);

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
      secondSelect: CosmosCurrency.XFI,
      secondInput: '',
    });

    setTouched({
      secondInput: false,
    });

    if (fieldCount != 1) {
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

  const {
    values,
    errors,
    touched,
    handleChange,
    setFieldValue,
    setValues,
    handleBlur,
    setTouched,
    validateForm,
    isValid,
  } = useFormik<FormValues>({
    enableReinitialize: true,
    validationSchema: getFormValidationRules(fieldCount, formatMessage),
    initialValues: INITIAL_VALUES,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: () => undefined,
  });

  useImperativeHandle(
    ref,
    () => ({
      getFormValues: () => values,
      validateForm,
    }),
    [values, isValid]
  );

  useEffect(() => {
    onChange({ values, isValid, fieldCount });
  }, [values, fieldCount, isValid]);

  return (
    <StyledAmountSelect gap={'2rem'} width={'100%'}>
      {new Array(fieldCount).fill('').map((_, index) => {
        const isFirst = !index;
        const { selectName, selectValue, inputName, inputValue } = getInputsProps(isFirst, values);

        const errorMessage = touched[inputName] ? (isFirst ? errors.firstInput : errors.secondInput) : '';

        const showAddButton = fieldCount < MAX_FIELD_COUNT;
        const showDeleteButton = !isFirst;

        return (
          <Stack
            key={index}
            gap={'1.5rem'}
            direction={{ xs: 'column', md: 'row' }}
            alignItems={{ xs: 'center', md: 'flex-end' }}
          >
            <Stack gap={{ xs: '2rem', md: '1rem' }} direction={{ xs: 'column', md: 'row' }} width={'100%'}>
              <NumberInput
                className="amountInput"
                label={{
                  type: 'intl',
                  id: 'PROPOSALS.AMOUNT',
                }}
                placeholder={{
                  type: 'text',
                  text: '0',
                }}
                id={inputName}
                name={inputName}
                value={inputValue}
                isError={!!errorMessage}
                caption={errorMessage ? { type: 'intl', id: errorMessage } : undefined}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <CoinSelect
                className="coinSelect"
                label={{ type: 'intl', id: 'SUMMARY.COIN' }}
                options={getSelectOptions(index)}
                id={selectName}
                name={selectName}
                value={selectValue}
                onChange={handleChange}
              />
            </Stack>
            {showAddButton && (
              <Tooltip title={'SUMMARY.ADD_COIN'} placement={'bottom'}>
                <Button size="largeIcon" isDisabled={fieldCount > 1} onClick={onClickAdd}>
                  <Icon src={PlusIcon.dark} viewBox={'0 0 20 20'} />
                </Button>
              </Tooltip>
            )}
            {showDeleteButton && (
              <Tooltip title={'SUMMARY.DELETE_COIN'} placement={'bottom'}>
                <Button size="largeIcon" variant="secondary" onClick={() => onClickDelete({ index })}>
                  <Icon src={TrashIcon} viewBox={'0 0 20 20'} />
                </Button>
              </Tooltip>
            )}
          </Stack>
        );
      })}
    </StyledAmountSelect>
  );
};

export default forwardRef(AmountSelect);
