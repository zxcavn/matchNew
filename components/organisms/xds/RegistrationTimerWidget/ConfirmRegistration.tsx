import { useCallback, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { formatDurationCount } from '@/helpers';
import { ConnectionType, useWalletConnection } from '@/hocs/WalletConnectionProvider';
import { useWalletPrimaryName } from '@/hooks';
import { useCurrentRegistrationItem, useRegister, useRegistrationData, useXdsNamePageParam } from '@/hooks/xds';
import { AppLocale } from '@/lib/i18n';
import { Button, ButtonProps } from '@/lib/xfi.lib/components/atoms';
import { REGISTRATION_INTERVAL } from '@/shared/constants';
import { RegistrationData } from '@/store/xds';

import { ModalErrorMessage } from '@/components/atoms';
import { XdsOperationModal } from '@/components/molecules';

type Props = Omit<ButtonProps, 'children' | 'onClick'>;

const ConfirmRegistration = (buttonProps: Props) => {
  const { locale } = useIntl();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { updatePrimaryName } = useWalletPrimaryName({ isEnabled: false });
  const { displayName } = useXdsNamePageParam();
  const { connectionType } = useWalletConnection();
  const { setCurrentData, updateData } = useRegistrationData();
  const registrationData = useCurrentRegistrationItem();
  const { isLoadingTx, isLoadingFee, error, fee, register } = useRegister({
    registrationData,
    isEnabledFeeCalculation: isOpenModal,
  });

  const openModal = useCallback(() => setIsOpenModal(true), []);

  const closeModal = useCallback(() => setIsOpenModal(false), []);

  const onSubmit = useCallback(() => {
    if (!registrationData) return;

    register({
      onSuccess: ({ txHash, fee, rentPrice }) => {
        const data: RegistrationData = {
          ...registrationData,
          stepIndex: registrationData.stepIndex + 1,
          registerData: {
            fee,
            txHash,
            rentPrice,
          },
        };

        if (data.payload.reverseRecord) {
          updatePrimaryName(data.payload.name);
        }

        updateData({ name: data.payload.name, data });
        setCurrentData(data);
        closeModal();
      },
    });
  }, [register, setCurrentData, updatePrimaryName, updateData, registrationData]);

  const displayDuration = formatDurationCount(
    registrationData?.durationCount || 0,
    REGISTRATION_INTERVAL,
    locale as AppLocale
  );

  return (
    <>
      <Button onClick={openModal} size="large" {...buttonProps}>
        <FormattedMessage id="SUMMARY.FINISH" />
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
        {!!error && <ModalErrorMessage message={error} />}
        <XdsOperationModal.Description
          sx={{ mb: { md: 0, xs: '0.5rem' } }}
          text="SUMMARY.DOUBLE_CHECK_BEFORE_CONFIRMING"
        />
        <XdsOperationModal.Details label="SUMMARY.NAME" variant="name" name={displayName} />
        <XdsOperationModal.Details
          label="SUMMARY.ACTION"
          variant="badge"
          text="XDS.OPERATION.REGISTER_NAME.NAME"
          color="turquoise"
        />
        <XdsOperationModal.Details label="SUMMARY.DURATION" variant="text" text={displayDuration} />
        <XdsOperationModal.Details label="SUMMARY.COMMISSION" variant="commission" amount={fee} />
      </XdsOperationModal>
    </>
  );
};

export default ConfirmRegistration;
