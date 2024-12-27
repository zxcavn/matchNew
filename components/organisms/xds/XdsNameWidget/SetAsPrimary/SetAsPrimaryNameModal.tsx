import { Stack } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { ConnectionType, useWalletConnection } from '@/hocs/WalletConnectionProvider';
import { type ModalProps, Button } from '@/lib/xfi.lib/components/atoms';

import { XdsOperationModal } from '@/components/molecules/modals';

type Props = Pick<ModalProps, 'isOpen' | 'setIsOpen'> & {
  name: string;
  address: string;
  isLoadingTx?: boolean;
  isLoadingFee?: boolean;
  fee?: bigint | null;
  error?: string | null;
  onSubmit: () => void;
  onCancel: () => void;
  steps?: {
    current: number;
    count: number;
  };
};

const SetAsPrimaryNameModal = ({
  name,
  address,
  isLoadingTx,
  isLoadingFee,
  fee,
  error,
  onSubmit,
  onCancel,
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
            buttonText="SUMMARY.NEXT"
            onClick={onSubmit}
            isDisabled={!fee || !!error}
            isLoadingTx={isLoadingTx}
            isLoadingFee={isLoadingFee}
            isConnectedByExtension={connectionType === ConnectionType.EXTENSION}
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
      <XdsOperationModal.Details
        label="SUMMARY.ACTION"
        variant="badge"
        color="lightGreen"
        text="XDS_NAME.SET_AS_PRIMARY"
      />
      <XdsOperationModal.Details label="SUMMARY.ADDRESS" variant="address" name={name} address={address} />
      <XdsOperationModal.Details label="SUMMARY.ESTIMATED_NETWORK_FEE" variant="commission" amount={fee} />
    </XdsOperationModal>
  );
};

export default SetAsPrimaryNameModal;
