import { Coin } from '@cosmjs/stargate';

import { FeeError } from '@/helpers';
import { useAppValidationRules } from '@/hooks';
import { Input } from '@/lib/xfi.lib/components/atoms';
import { FormBlock } from '@/lib/xfi.lib/components/molecules';
import { FormBlockInput, FormBlockInputTypesEnum } from '@/lib/xfi.lib/components/molecules/FormBlock/types';
import { NONE_VALUE } from '@/shared/constants';

import FormButtons from '../FormButtons';

export type SendNftFormValues = {
  recipient: string;
};

type Props = {
  isLoading?: boolean;
  isDisabled?: boolean;
  onSubmit: (values: SendNftFormValues) => void;
  onChange: (values: SendNftFormValues) => void;
  onCancel: () => void;
  initialValues: SendNftFormValues;
  tokenId: string;
  commission?: Coin;
  errors?: FeeError;
  addressInputData: FormBlockInput<SendNftFormValues>;
};

const SendNftForm = ({
  onSubmit,
  onChange,
  onCancel,
  isLoading,
  isDisabled,
  initialValues,
  tokenId,
  commission,
  errors,
  addressInputData,
}: Props) => {
  const validationRules = useAppValidationRules();

  const onChangeForm = ({ recipient }: SendNftFormValues) => {
    onChange({
      recipient: recipient.trim(),
    });
  };

  return (
    <FormBlock<SendNftFormValues>
      id="sendNftForm"
      onSubmit={onSubmit}
      observerHandler={onChangeForm}
      initialValues={initialValues}
      validationRules={{
        recipient: validationRules.evmAddress,
      }}
      inputsData={[
        addressInputData,
        {
          type: FormBlockInputTypesEnum.jsx,
          inputProps: {
            component: (
              <Input
                isError={Boolean(errors?.commission)}
                caption={errors?.commission ? { type: 'intl', id: errors.commission } : undefined}
                value={commission ? `${commission.amount} ${commission.denom.toUpperCase()}` : NONE_VALUE}
                isEditable={false}
                isDisabled
                label={{ type: 'intl', id: 'SUMMARY.COMMISSION' }}
              />
            ),
          },
        },
        {
          type: FormBlockInputTypesEnum.jsx,
          inputProps: {
            component: (
              <Input value={tokenId} isDisabled isEditable={false} label={{ type: 'intl', id: 'TOKENS.TOKEN_ID' }} />
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

export default SendNftForm;
