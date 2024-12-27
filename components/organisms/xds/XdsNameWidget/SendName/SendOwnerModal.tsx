import { Stack } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { ConnectionType, useWalletConnection } from '@/hocs';
import { Button, ModalProps } from '@/lib/xfi.lib/components/atoms';

import { XdsOperationModal } from '@/components/molecules';

type Props = Pick<ModalProps, 'isOpen' | 'setIsOpen'> & {
  onSubmit: () => void;
  onCancel: () => void;
  isLoadingTx?: boolean;
  isLoadingFee?: boolean;
  fee?: bigint | null;
  error?: string | null;
  name: string;
  recipientAddress: string;
  recipientName?: string;
  steps?: {
    current: number;
    count: number;
  };
};

const SendOwnerModal = ({
  onSubmit,
  onCancel,
  isLoadingTx,
  isLoadingFee,
  fee,
  name,
  error,
  recipientAddress,
  recipientName,
  steps,
  ...modalProps
}: Props) => {
  const { connectionType } = useWalletConnection();

  return (
    <XdsOperationModal
      {...modalProps}
      title="SUMMARY.CONFIRM_DETAILS"
      buttonSlot={
        <Stack direction={{ md: 'row', xs: 'column-reverse' }} gap="1rem">
          <Button isDisabled={isLoadingTx} onClick={onCancel} variant="secondary" isFullWidth size="large">
            <FormattedMessage id="SUMMARY.BACK" />
          </Button>
          <XdsOperationModal.SubmitButton
            onClick={onSubmit}
            isDisabled={!fee || !!error}
            isLoadingTx={isLoadingTx}
            isLoadingFee={isLoadingFee}
            isConnectedByExtension={connectionType === ConnectionType.EXTENSION}
            buttonText="SUMMARY.NEXT"
          />
        </Stack>
      }
    >
      {steps && <XdsOperationModal.StepIndicator count={steps.count} step={steps.current} />}
      <XdsOperationModal.Description
        sx={{ mb: { md: 0, xs: '0.5rem' } }}
        text={isLoadingTx ? 'XDS.YOUR_TX_IN_PROGRESS' : 'SUMMARY.DOUBLE_CHECK_BEFORE_CONFIRMING'}
      />
      <XdsOperationModal.Details label="SUMMARY.NAME" variant="name" name={name} />
      <XdsOperationModal.Details label="SUMMARY.ACTION" variant="badge" color="lightGreen" text="XDS.SEND_OWNER" />
      <XdsOperationModal.Details
        label="SUMMARY.ADDRESS"
        variant="address"
        name={recipientName}
        address={recipientAddress}
      />
      <XdsOperationModal.Details label="SUMMARY.ESTIMATED_NETWORK_FEE" variant="commission" amount={fee} />
    </XdsOperationModal>
  );
};

export default SendOwnerModal;
