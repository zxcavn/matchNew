import { Coin } from '@cosmjs/stargate';
import { useIntl } from 'react-intl';

import { FeeError } from '@/helpers';
import { useAppValidationRules } from '@/hooks';
import { Input } from '@/lib/xfi.lib/components/atoms';
import { FormBlock } from '@/lib/xfi.lib/components/molecules';
import { FormBlockInput, FormBlockInputTypesEnum } from '@/lib/xfi.lib/components/molecules/FormBlock/types';
import { NONE_VALUE } from '@/shared/constants';

import FormButtons from '../FormButtons';

export type SendEvmCoinFormValues = {
  walletAddress: string;
  amount: string;
};

type Props = {
  isLoading?: boolean;
  isDisabled?: boolean;
  onSubmit: (values: SendEvmCoinFormValues) => void;
  onChange: (values: SendEvmCoinFormValues) => void;
  onCancel: () => void;
  initialValues: SendEvmCoinFormValues;
  commission?: Coin;
  errors?: FeeError;
  addressInputData: FormBlockInput<SendEvmCoinFormValues>;
};

const SendEvmCoinForm = ({
  onSubmit,
  onChange,
  onCancel,
  isLoading,
  isDisabled,
  initialValues,
  commission,
  errors,
  addressInputData,
}: Props) => {
  const { formatMessage } = useIntl();
  const validationRules = useAppValidationRules();

  const onChangeForm = ({ amount, walletAddress, ...rest }: SendEvmCoinFormValues) =>
    onChange({
      ...rest,
      amount: amount.trim(),
      walletAddress: walletAddress.trim(),
    });

  return (
    <FormBlock<SendEvmCoinFormValues>
      id="sendCoinForm"
      onSubmit={onSubmit}
      observerHandler={onChangeForm}
      initialValues={initialValues}
      errors={{
        amount: errors?.amount && formatMessage({ id: errors.amount }),
      }}
      validationRules={{
        walletAddress: validationRules.evmWalletAddress,
        amount: validationRules.validNumber,
      }}
      inputsData={[
        addressInputData,
        {
          inputName: 'amount',
          type: FormBlockInputTypesEnum.number,
          inputProps: {
            label: {
              type: 'intl',
              id: 'SUMMARY.AMOUNT',
            },
          },
        },
        {
          type: FormBlockInputTypesEnum.jsx,
          inputProps: {
            component: (
              <Input
                isError={Boolean(errors?.commission)}
                caption={errors?.commission ? { type: 'intl', id: errors.commission } : undefined}
                value={commission ? `${commission.amount} ${commission.denom.toUpperCase()}` : NONE_VALUE}
                isEditable={false}
                label={{ type: 'intl', id: 'SUMMARY.COMMISSION' }}
              />
            ),
          },
        },
        {
          type: FormBlockInputTypesEnum.jsx,
          inputProps: {
            component: (
              <FormButtons
                sx={{ flexDirection: 'row-reverse' }}
                submitButtonText="SUMMARY.NEXT"
                isDisabled={isDisabled}
                isLoading={isLoading}
                onCancel={onCancel}
              />
            ),
          },
        },
      ]}
    />
  );
};

export default SendEvmCoinForm;
