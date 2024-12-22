import { Button } from '@mui/base';
import { Stack, styled, Typography } from '@mui/material';
import { MxNumberFormatter } from '@xfi/formatters';
import { useRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import * as Yup from 'yup';

import { Delegation } from '@/hooks/useDelegations';
import { FormBlock } from '@/lib/xfi.lib/components/molecules';
import { FormBlockInputsData, FormBlockInputTypesEnum } from '@/lib/xfi.lib/components/molecules/FormBlock/types';
import { CURRENCIES } from '@/lib/xfi.lib/constants';
import { useValidationRules } from '@/lib/xfi.lib/hooks';
import { Coin, CosmosCurrency } from '@/shared/types';

import { InfoText } from '@/components/atoms';

import TransactionCommission from '../../TransactionCommission';
import { GAS_CURRENCY_INPUT } from '../constants';
import FormButtons from '../FormButtons';

export type UndelegateFormValues = {
  validatorMoniker: string;
  amount: string;
  gasCurrency?: CosmosCurrency;
};

type Props = {
  isDisabled?: boolean;
  isLoading?: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  onChange: (values: UndelegateFormValues) => void;
  /** @type {FormattedMessageId} */
  error?: string;
  commission?: Coin | null;
  delegation: Delegation;
};

const UndelegateForm = ({
  isDisabled,
  isLoading,
  commission,
  error,
  onSubmit,
  onCancel,
  onChange,
  delegation: delegationData,
}: Props) => {
  const { formatMessage } = useIntl();
  const setFieldRef = useRef<(field: string, value: string) => void>();
  const { required } = useValidationRules();

  const { validator, delegation } = delegationData;

  const delegationAmount = MxNumberFormatter.formatUnitsToDisplay(delegation.amount, {
    thousandsStep: '',
  });

  const onClick = () => {
    if (!setFieldRef.current) return;

    setFieldRef.current('amount', delegationAmount);
  };

  const onChangeForm = ({ amount, ...rest }: UndelegateFormValues) =>
    onChange({
      ...rest,
      amount: amount.trim(),
    });

  return (
    <FormBlock<UndelegateFormValues>
      id="undelegate-form"
      className="form"
      onSubmit={onSubmit}
      observerHandler={onChangeForm}
      cbSetField={setField => (setFieldRef.current = setField)}
      validationRules={{
        validatorMoniker: required,
        amount: Yup.string().test(
          'trimAndEqualZero',
          formatMessage({ id: 'LIB.ERRORS.REQUIRED_FIELD' }),
          v => Boolean(Number(v)) && Boolean(v?.trim())
        ),
      }}
      inputsData={
        [
          {
            inputName: 'validatorMoniker',
            type: FormBlockInputTypesEnum.text,
            inputProps: {
              label: {
                type: 'intl',
                id: 'SUMMARY.VALIDATOR',
              },
              isDisabled: true,
              defaultValue: validator.moniker,
              caption: {
                type: 'text',
                text: `${formatMessage({ id: 'SUMMARY.VALIDATOR_COMMISSION' })}: ${validator.ratePercent}%`,
              },
            },
          },
          {
            inputName: 'amount',
            type: FormBlockInputTypesEnum.number,
            inputProps: {
              label: {
                type: 'intl',
                id: 'SUMMARY.AMOUNT_CURRENCY',
                values: { currency: CURRENCIES.mpx.text },
              },
              suffix: (
                <StyledButton onClick={onClick}>
                  <Typography variant="body1" color="background.light">
                    MAX
                  </Typography>
                </StyledButton>
              ),
            },
          },
          GAS_CURRENCY_INPUT,
          {
            type: FormBlockInputTypesEnum.jsx,
            inputProps: {
              component: (
                <TransactionCommission
                  formattedTitle={{
                    values: { operation: <FormattedMessage id="LIB.OPERATIONS.UNBOND" /> },
                    id: 'WALLET.OPERATION_DETAILS',
                  }}
                  errorMessage={error}
                  commission={commission}
                />
              ),
            },
          },
          {
            type: FormBlockInputTypesEnum.jsx,
            inputProps: {
              component: (
                <Stack gap="0.5rem">
                  <InfoText formattedText={{ id: 'WALLET.UNDELEGATE_TIME' }} />
                  <InfoText formattedText={{ id: 'WALLET.UNDELEGATE_AUTO_CLAIM' }} />
                </Stack>
              ),
            },
          },
          {
            type: FormBlockInputTypesEnum.jsx,
            inputProps: {
              component: (
                <FormButtons isDisabled={isDisabled} isLoading={isLoading} onSubmit={onSubmit} onCancel={onCancel} />
              ),
            },
          },
        ].filter(Boolean) as FormBlockInputsData<UndelegateFormValues>
      }
    />
  );
};

const StyledButton = styled(Button)({
  cursor: 'pointer',
});

export default UndelegateForm;
