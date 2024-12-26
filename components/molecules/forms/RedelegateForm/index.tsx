import { Button } from '@mui/base';
import { Stack, styled, Typography } from '@mui/material';
import { MxNumberFormatter } from '@xfi/formatters';
import { useMemo, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { Delegation } from '@/hooks/useDelegations';
import { FormBlock } from '@/lib/xfi.lib/components/molecules';
import { FormBlockInputsData, FormBlockInputTypesEnum } from '@/lib/xfi.lib/components/molecules/FormBlock/types';
import { CURRENCIES } from '@/lib/xfi.lib/constants';
import { useValidationRules } from '@/lib/xfi.lib/hooks';
import { Coin, CosmosCurrency } from '@/shared/types';
import { ValidatorsList } from '@/store/validators';

import TransactionCommission from '../../TransactionCommission';
import { GAS_CURRENCY_INPUT } from '../constants';
import FormButtons from '../FormButtons';

export type RedelegateFormValues = {
  srcValidator: string;
  dstValidator: string;
  amount: string;
  gasCurrency?: CosmosCurrency;
};

type Props = {
  delegationAmount: Coin;
  srcValidator: Delegation['validator'];
  validatorList: ValidatorsList;
  onSubmit: (values: RedelegateFormValues) => void;
  onCancel: () => void;
  onChange: (values: RedelegateFormValues) => void;
  commission?: Coin | null;
  error?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
};

const RedelegateForm = ({
  onChange,
  onSubmit,
  onCancel,
  srcValidator,
  validatorList,
  commission,
  error,
  delegationAmount,
  isDisabled,
  isLoading,
}: Props) => {
  const [formValues, setFormValues] = useState<Partial<RedelegateFormValues>>({});
  const { formatMessage } = useIntl();
  const { required, validNumber } = useValidationRules();
  const setFieldRef = useRef<(field: string, value: string) => void>();

  const dstValidatorRate = useMemo(() => {
    return (
      validatorList.find(({ validator }) => validator.operatorAddress === formValues.dstValidator)?.validator.commission
        ?.ratePercent || 0
    );
  }, [formValues, validatorList]);

  const onClickMax = () => {
    setFieldRef.current?.('amount', MxNumberFormatter.formatUnits(delegationAmount.amount));
  };

  return (
    <FormBlock<RedelegateFormValues>
      id="redelegate-form"
      className="form"
      observerHandler={values => {
        onChange(values);
        setFormValues(values);
      }}
      cbSetField={cb => (setFieldRef.current = cb)}
      onSubmit={onSubmit}
      validationRules={{
        srcValidator: required,
        dstValidator: required,
        amount: validNumber,
      }}
      inputsData={
        (
          [
            {
              inputName: 'srcValidator',
              type: FormBlockInputTypesEnum.text,
              inputProps: {
                label: {
                  type: 'text',
                  text: `${formatMessage({ id: 'WALLET.SEND_FROM_VALIDATOR' })}`,
                },
                isDisabled: true,
                defaultValue: srcValidator.moniker,
                caption: {
                  type: 'text',
                  text: `${formatMessage({ id: 'SUMMARY.VALIDATOR_COMMISSION' })}: ${srcValidator.ratePercent}%`,
                },
              },
            },
            {
              inputName: 'dstValidator',
              type: FormBlockInputTypesEnum.autocomplete,
              inputProps: {
                label: {
                  type: 'text',
                  text: `${formatMessage({ id: 'WALLET.SEND_TO_VALIDATOR' })}`,
                },
                caption: {
                  type: 'text',
                  text: `${formatMessage({ id: 'SUMMARY.VALIDATOR_COMMISSION' })}: ${dstValidatorRate}%`,
                },
                value: validatorList[0]?.validator.operatorAddress,
                options: validatorList.map(({ validator, picture }) => ({
                  value: validator.operatorAddress,
                  label: {
                    type: 'jsx',
                    component: (
                      <Stack
                        direction={'row'}
                        gap={'1rem'}
                        justifyContent={'space-between'}
                        width={'100%'}
                        id={validator.description.moniker}
                      >
                        <Typography color="neutrals.secondaryText" variant="body2">
                          {formatMessage({ id: 'SUMMARY.COMMISSION' }).toLowerCase()} {validator.commission.ratePercent}
                          %
                        </Typography>
                      </Stack>
                    ),
                    textLabel: validator.description.moniker,
                  },
                })),
              },
            },
            {
              inputName: 'amount',
              type: FormBlockInputTypesEnum.number,
              inputProps: {
                label: {
                  type: 'intl',
                  id: 'SUMMARY.AMOUNT',
                  values: { currency: CURRENCIES.mpx.text },
                },
                placeholder: { type: 'text', text: '0' },
                suffix: (
                  <StyledButton onClick={onClickMax}>
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
                      values: { operation: <FormattedMessage id="LIB.OPERATIONS.REBOND" /> },
                      id: 'WALLET.OPERATION_DETAILS',
                    }}
                    errorMessage={error}
                    commission={commission}
                  />
                ),
              },
            },
            {
              type: FormBlockInputTypesEnum.component,
              inputProps: {
                render: ({ isDisabled: isDisabledForm }) => (
                  <FormButtons isDisabled={isDisabled || isDisabledForm} isLoading={isLoading} onCancel={onCancel} />
                ),
              },
            },
          ] as FormBlockInputsData<RedelegateFormValues>
        ).filter(Boolean) as FormBlockInputsData<RedelegateFormValues>
      }
    />
  );
};

const StyledButton = styled(Button)({
  cursor: 'pointer',
});

export default RedelegateForm;
