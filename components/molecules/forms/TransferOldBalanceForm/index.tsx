import { FormattedMessage } from 'react-intl';

import { Button } from '@/lib/xfi.lib/components/atoms';
import { FormBlock } from '@/lib/xfi.lib/components/molecules';
import { FormBlockInputTypesEnum } from '@/lib/xfi.lib/components/molecules/FormBlock/types';
import { CosmosCurrency } from '@/shared/types';

import { InfoText } from '@/components/atoms';

import TransactionCommission from '../../TransactionCommission';
import { ButtonsContainer, FormContainer } from './styles';

type FormValues = {
  destination: string;
  recipient: string;
  checkbox: boolean;
};

type Props = {
  fromAddress: string;
  toAddress: string;
  commission?: {
    amount: string;
    denom: CosmosCurrency;
  } | null;
  isLoading?: boolean;
  /** @type {FormattedMessageId | string} */
  errorMessage?: string;
  onSubmit: () => void;
  onCancel: () => void;
};

const TransferOldBalanceForm = ({
  fromAddress,
  toAddress,
  commission,
  errorMessage,
  isLoading,
  onSubmit,
  onCancel,
}: Props) => {
  const isDisabledButton = isLoading || Boolean(errorMessage);

  return (
    <FormContainer>
      <FormBlock<FormValues>
        id="transfer-form"
        onSubmit={onSubmit}
        inputsData={[
          {
            inputName: 'destination',
            type: FormBlockInputTypesEnum.text,
            inputProps: {
              label: {
                type: 'intl',
                id: 'SUMMARY.OLD_ADDRESS',
              },
              defaultValue: fromAddress,
              isEditable: false,
            },
          },
          {
            inputName: 'recipient',
            type: FormBlockInputTypesEnum.text,
            inputProps: {
              label: {
                type: 'intl',
                id: 'SUMMARY.NEW_ADDRESS',
              },
              defaultValue: toAddress,
              isEditable: false,
            },
          },
          {
            type: FormBlockInputTypesEnum.jsx,
            inputProps: {
              component: (
                <TransactionCommission
                  formattedTitle={{
                    id: 'WALLET.SEND_CONDITIONS',
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
                <InfoText
                  formattedText={{
                    id: 'WALLET.TRANSFER_ALL_INFO',
                    values: {
                      amount: `1 ${CosmosCurrency.MPX.toUpperCase()}`,
                    },
                  }}
                />
              ),
            },
          },
          {
            type: FormBlockInputTypesEnum.jsx,
            inputProps: {
              component: (
                <ButtonsContainer>
                  <Button
                    isFullWidth
                    isDisabled={isDisabledButton}
                    isLoading={isLoading}
                    type="submit"
                    className="button"
                    onClick={onSubmit}
                    size="large"
                  >
                    <FormattedMessage id="SUMMARY.SEND" />
                  </Button>
                  <Button isFullWidth className="button" variant="secondary" size="large" onClick={onCancel}>
                    <FormattedMessage id="SUMMARY.CANCEL" />
                  </Button>
                </ButtonsContainer>
              ),
            },
          },
        ]}
      />
    </FormContainer>
  );
};

export default TransferOldBalanceForm;
