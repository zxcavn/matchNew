import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { ConnectionType, useWalletConnection } from '@/hocs/WalletConnectionProvider';
import { useCommitment, useCurrentRegistrationItem, useRegistrationData, useXdsNamePageParam } from '@/hooks/xds';
import { Button, ButtonProps } from '@/lib/xfi.lib/components/atoms';
import { useMediaQuery } from '@/lib/xfi.lib/theme';
import { RegistrationData } from '@/store/xds';

import { XdsOperationModal } from '@/components/molecules';

type Props = Omit<ButtonProps, 'children'>;

const StartTimer = (buttonProps: Props) => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { connectionType } = useWalletConnection();
  const { displayName } = useXdsNamePageParam();
  const { setCurrentData, updateData } = useRegistrationData();
  const registrationData = useCurrentRegistrationItem();
  const { commitment, isLoadingTx, isLoadingFee, error, fee } = useCommitment({
    registrationData,
    isEnabledFeeCalculation: isOpenModal,
  });

  const onSubmit = async () => {
    if (!registrationData) return;

    commitment({
      onSuccess: ({ commitment, txHash, fee }) => {
        const data: RegistrationData = {
          ...registrationData,
          stepIndex: registrationData.stepIndex + 1,
          commitmentData: {
            startTimestamp: Date.now(),
            commitment,
            txHash,
            fee,
          },
        };

        setCurrentData(data);
        updateData({ name: data.payload.name, data });
        window.scrollTo({ top: 0 });
      },
    });
  };

  return (
    <>
      <Button {...buttonProps} onClick={() => setIsOpenModal(true)} isFullWidth={isMobile} size="large">
        <FormattedMessage id="SUMMARY.BEGIN" />
      </Button>

      <XdsOperationModal
        title="SUMMARY.CONFIRM_DETAILS"
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        buttonSlot={
          <XdsOperationModal.SubmitButton
            onClick={onSubmit}
            isLoadingTx={isLoadingTx}
            isLoadingFee={isLoadingFee}
            isDisabled={isLoadingFee || Boolean(error)}
            isConnectedByExtension={connectionType === ConnectionType.EXTENSION}
          />
        }
      >
        <XdsOperationModal.Description
          sx={{ mb: { md: 0, xs: '0.5rem' } }}
          text="SUMMARY.DOUBLE_CHECK_BEFORE_CONFIRMING"
        />
        <XdsOperationModal.Details label="SUMMARY.NAME" variant="name" name={displayName} />
        <XdsOperationModal.Details
          variant="badge"
          label="SUMMARY.ACTION"
          text="XDS.OPERATION.START_TIMER.NAME"
          color="lightBlue"
        />
        <XdsOperationModal.Details label="SUMMARY.INFO" variant="text" text="XDS.OPERATION.START_TIMER.DESCRIPTION" />
        <XdsOperationModal.Details label="SUMMARY.COMMISSION" variant="commission" amount={fee} />
      </XdsOperationModal>
    </>
  );
};

export default StartTimer;
