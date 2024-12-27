import { ConnectionType } from '@/hocs/WalletConnectionProvider/types';
import type { ModalProps } from '@/lib/xfi.lib/components/atoms';


import XdsOperationModal from '../XdsOperationModal';

type Props = Pick<ModalProps, 'isOpen' | 'setIsOpen'> & {
  name: string;
  recipientAddress: string;
  recipientName?: string;
  isLoadingTx?: boolean;
  isLoadingFee?: boolean;
  fee?: bigint | null;
  error?: string | null;
  onSubmit: () => void;
  steps?: {
    current: number;
    count: number;
  };
  connectionType?: ConnectionType | null;
};

const UpdateXdsRecordModal = ({
  name,
  isLoadingTx,
  isLoadingFee,
  fee,
  error,
  onSubmit,
  steps,
  connectionType,
  recipientAddress,
  recipientName,
  ...modalProps
}: Props) => {
  return (
    <XdsOperationModal
      {...modalProps}
      title="SUMMARY.CONFIRM_DETAILS"
      buttonSlot={
        <XdsOperationModal.SubmitButton
          onClick={onSubmit}
          isDisabled={!fee || !!error}
          isLoadingTx={isLoadingTx}
          isLoadingFee={isLoadingFee}
          isConnectedByExtension={connectionType === ConnectionType.EXTENSION}
        />
      }
    >
      {steps && <XdsOperationModal.StepIndicator count={steps.count} step={steps.current} />}
      <XdsOperationModal.Description
        sx={{ mb: { md: 0, xs: '0.5rem' } }}
        text={isLoadingTx ? 'XDS.YOUR_TX_IN_PROGRESS' : 'SUMMARY.DOUBLE_CHECK_BEFORE_CONFIRMING'}
      />
      <XdsOperationModal.Details label="SUMMARY.NAME" variant="name" name={name} />
      <XdsOperationModal.Details label="SUMMARY.INFO" variant="text" text="XDS.UPDATE_XDS_RECORD_TO_THIS_ADDRESS" />
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

export default UpdateXdsRecordModal;
