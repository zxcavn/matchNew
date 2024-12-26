import { Stack, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import * as Yup from 'yup';

import { AUTOCOMPLETE_NONE_VALUE } from '@/lib/xfi.lib/components/atoms';
import { FormBlock } from '@/lib/xfi.lib/components/molecules';
import { FormBlockInputsData, FormBlockInputTypesEnum } from '@/lib/xfi.lib/components/molecules/FormBlock/types';
import { useValidationRules } from '@/lib/xfi.lib/hooks';
import { Coin, CosmosCurrency } from '@/shared/types';
import { ValidatorsList } from '@/store/validators';

import TransactionCommission from '../../TransactionCommission';
import { GAS_CURRENCY_INPUT } from '../constants';
import FormButtons from '../FormButtons';

export type DelegateFormValues = {
  validatorAddress: string;
  amount: string;
  gasCurrency?: CosmosCurrency;
};

export type Props = {
  onSubmit: () => void;
  onCancel: () => void;
  onChange: (values: DelegateFormValues) => void;
  validators: ValidatorsList;
  commission?: Coin | null;
  errorMessage?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
};

const DelegateForm = ({
  onSubmit,
  onChange,
  onCancel,
  validators = [],
  errorMessage,
  commission,
  isLoading,
  isDisabled,
}: Props) => {
  const { formatMessage } = useIntl();
  const [formValues, setFormValues] = useState<Partial<DelegateFormValues>>({});
  const { requiredAutocomplete } = useValidationRules();

  const validatorRate = useMemo(() => {
    const validator = validators.find(({ validator }) => validator.operatorAddress === formValues.validatorAddress);

    if (!validator) return 0;

    return 100 * Number(validator.validator.commission.rate);
  }, [formValues.validatorAddress, validators]);

  return (
    <FormBlock<DelegateFormValues>
      id="bond-form"
      className="form"
      onSubmit={onSubmit}
      observerHandler={values => {
        onChange(values);
        setFormValues(values);
      }}
      validationRules={{
        validatorAddress: requiredAutocomplete,
        amount: Yup.string().test(
          'requiredAutocomplete',
          formatMessage({ id: 'LIB.ERRORS.REQUIRED_FIELD' }),
          v => Boolean(Number(v)) && Boolean(v?.trim())
        ),
      }}
      inputsData={
        [
          {
            inputName: 'validatorAddress',
            type: FormBlockInputTypesEnum.autocomplete,
            inputProps: {
              label: {
                type: 'intl',
                id: 'SUMMARY.VALIDATOR',
              },
              value: AUTOCOMPLETE_NONE_VALUE,
              options: [
                {
                  value: AUTOCOMPLETE_NONE_VALUE,
                  label: { type: 'text', text: formatMessage({ id: 'LIB.SUMMARY.NOT_CHOSEN' }) },
                },
                ...validators.map(({ validator, picture }) => ({
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
              ],
              caption: {
                type: 'text',
                text: `${formatMessage({ id: 'SUMMARY.VALIDATOR_COMMISSION' })}: ${validatorRate}%`,
              },
            },
          },
          {
            inputName: 'amount',
            type: FormBlockInputTypesEnum.number,
            inputProps: {
              label: {
                type: 'intl',
                id: 'SUMMARY.SEND_AMOUNT',
              },
            },
          },
          GAS_CURRENCY_INPUT,
          {
            type: FormBlockInputTypesEnum.jsx,
            inputProps: {
              component: (
                <TransactionCommission
                  formattedTitle={{
                    values: { operation: <FormattedMessage id="LIB.OPERATIONS.BOND" /> },
                    id: 'WALLET.OPERATION_DETAILS',
                  }}
                  errorMessage={errorMessage}
                  commission={commission}
                />
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
        ].filter(Boolean) as FormBlockInputsData<DelegateFormValues>
      }
    />
  );
};

export default DelegateForm;
