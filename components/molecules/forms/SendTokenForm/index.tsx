import { useIntl } from 'react-intl';

import { FeeError } from '@/helpers/evmErrors';
import { useAppValidationRules } from '@/hooks';
import { Input } from '@/lib/xfi.lib/components/atoms';
import { FormBlock } from '@/lib/xfi.lib/components/molecules';
import { FormBlockInput, FormBlockInputTypesEnum } from '@/lib/xfi.lib/components/molecules/FormBlock/types';
import { NONE_VALUE } from '@/shared/constants';
import { Coin } from '@/shared/types';
import { StorageToken } from '@/store/walletTokens';

import FormButtons from '../FormButtons';

export type SendTokenFormValues = {
  walletAddress: string;
  contractAddress: string;
  amount: string;
};

type Props = {
  isLoading?: boolean;
  isDisabled?: boolean;
  onSubmit: (values: SendTokenFormValues) => void;
  onCancel: () => void;
  onChange: (values: SendTokenFormValues) => void;
  initialValues: SendTokenFormValues;
  tokens: StorageToken[];
  commission?: Coin;
  /**
   * @property {FormattedMessageId} commission
   * @property {FormattedMessageId} amount
   */
  errors?: FeeError;
  addressInputData: FormBlockInput<SendTokenFormValues>;
};

const SendTokenForm = ({
  isLoading,
  isDisabled,
  tokens,
  initialValues,
  onSubmit,
  onCancel,
  onChange,
  commission,
  errors = {},
  addressInputData,
}: Props) => {
  const { formatMessage } = useIntl();
  const validationRules = useAppValidationRules();

  const onChangeForm = ({ walletAddress, amount, ...rest }: SendTokenFormValues) =>
    onChange({
      ...rest,
      walletAddress: walletAddress.trim(),
      amount: amount.trim(),
    });

  return (
    <FormBlock<SendTokenFormValues>
      id="sendTokenForm"
      onSubmit={onSubmit}
      observerHandler={onChangeForm}
      initialValues={initialValues}
      errors={{
        amount: errors.amount && formatMessage({ id: errors.amount }),
        walletAddress: errors.wallet && formatMessage({ id: errors.wallet }),
      }}
      validationRules={{
        walletAddress: validationRules.evmWalletAddress,
        amount: validationRules.validNumber,
      }}
      inputsData={[
        addressInputData,
        {
          inputName: 'contractAddress',
          type: FormBlockInputTypesEnum.select,
          inputProps: {
            label: {
              type: 'intl',
              id: 'SUMMARY.TOKEN',
            },
            isDisabled: tokens.length <= 1,
            value: initialValues.contractAddress,
            options: tokens.map(({ name, contractAddress }) => ({
              value: contractAddress,
              label: { type: 'text', text: name },
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
            },
          },
        },
        {
          type: FormBlockInputTypesEnum.jsx,
          inputProps: {
            component: (
              <Input
                isError={Boolean(errors.commission)}
                caption={errors.commission ? { type: 'intl', id: errors.commission } : undefined}
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

export default SendTokenForm;
