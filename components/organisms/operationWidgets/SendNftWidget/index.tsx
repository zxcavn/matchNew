import { Stack } from '@mui/material';
import { MxNumberFormatter } from '@xfi/formatters';
import { useDebouncedCallback, useDebouncedState } from '@xfi/hooks';
import { SendNftFormValues } from 'components/molecules/forms/SendNftForm';
import isEmpty from 'lodash/isEmpty';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { pushInitTxNotification, pushNotification } from '@/helpers';
import { useSendNft, useWallet } from '@/hooks';
import { Button, ButtonProps, Modal } from '@/lib/xfi.lib/components/atoms';
import { useMediaQuery } from '@/lib/xfi.lib/theme';
import { EthersService } from '@/services/evm';
import { notificationTypes } from '@/shared/constants';
import { Coin, CosmosCurrency } from '@/shared/types';

import { SendNftForm } from '@/components/molecules';
import ConfirmOperation, { Amount, TextBlock } from '@/components/molecules/ConfirmOperation';
import { useGenerateFormBlockInputData } from '@/components/organisms/xds/XdsAddressInput';

import { FORM_CHANGES_TIMEOUT } from '../constants';

const initialFormValues: SendNftFormValues = {
  recipient: '',
};

type ActiveStep = 'send' | 'confirm' | 'success' | null;
export type SelectedNft = { contractAddress: string; tokenId: string; tokenName?: string };

type Props = {
  selectedCard: SelectedNft | null;
  buttonProps?: ButtonProps;
};

export const SendNftWidget = ({ selectedCard, buttonProps = {} }: Props) => {
  const { formatMessage } = useIntl();
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));

  const activeStepRef = useRef<ActiveStep>(null);

  const {
    newWallet: { balance, evmAddress },
  } = useWallet();

  const [activeStep, setActiveStep] = useState<ActiveStep>(null);
  const [recipientError, setRecipientError] = useState('');
  const [formValues, setFormValues, isValueChanging] = useDebouncedState<SendNftFormValues>(
    initialFormValues,
    FORM_CHANGES_TIMEOUT
  );

  activeStepRef.current = activeStep;

  const initialFormValuesRef = useRef<SendNftFormValues>(formValues);

  const { calculateFee, sendNft, resetFeeData, isLoadingFee, isLoadingSend, fee, feeError } = useSendNft();

  const debouncedCalculateFee = useDebouncedCallback(calculateFee);

  const { contractAddress = '', tokenId = '', tokenName = '' } = selectedCard || {};

  const onCloseModal = useCallback(() => {
    if (isLoadingSend) return setActiveStep(null);

    resetFeeData();
    setActiveStep(null);
    setFormValues(initialFormValues);
    initialFormValuesRef.current = initialFormValues;
  }, [isLoadingSend]);

  const checkOwner = (values: SendNftFormValues) => {
    if (evmAddress.toLowerCase() === values.recipient.toLowerCase()) {
      setRecipientError('ERRORS.CANNOT_SEND_NFT_TO_SELF');
    } else {
      setRecipientError('');
    }
  };

  const onChange = useCallback(
    (values: SendNftFormValues) => {
      setFormValues(values);
      checkOwner(values);
    },
    [setFormValues]
  );

  useEffect(() => {
    if (isValidForm(formValues) && !recipientError) {
      debouncedCalculateFee({
        contractAddress,
        recipientAddress: formValues.recipient,
        tokenId,
      });
    }
  }, [formValues, recipientError, debouncedCalculateFee, contractAddress, tokenId]);

  const onClickSubmit = useCallback(() => {
    setActiveStep('confirm');

    initialFormValuesRef.current = formValues;
  }, [formValues]);

  const onClickOpen = useCallback(() => {
    setActiveStep(isLoadingSend ? 'confirm' : 'send');
  }, [isLoadingSend]);

  const onClickBack = useCallback(() => setActiveStep('send'), []);

  const onClickSend = useCallback(() => {
    sendNft({
      options: {
        contractAddress: contractAddress,
        tokenId: tokenId,
        recipientAddress: formValues.recipient,
      },
      onInit: () => {
        if (activeStepRef.current) {
          setActiveStep('success');
        } else {
          pushInitTxNotification();
          onCloseModal();
        }
      },
      onSuccess: () => {
        pushNotification({
          ...notificationTypes.success,
          message: { id: 'NOTIFICATIONS.TRANSACTION_CONFIRMATION' },
          additional: {
            id: 'NOTIFICATIONS.SUCCESS_NFT_TRANSFER',
            values: { name: tokenName },
          },
        });
      },
      onError: error => {
        pushNotification({
          ...notificationTypes.error,
          message: { id: error },
        });
      },
    });
  }, [formValues, sendNft, onCloseModal, tokenId]);

  const displayCommission: Coin | undefined = useMemo(
    () => fee && { amount: MxNumberFormatter.formatUnitsToDisplay(fee.amount), denom: CosmosCurrency.XFI },
    [fee]
  );

  const hasError = useMemo(() => {
    return !isEmpty(feeError || {}) || !!recipientError;
  }, [feeError, recipientError]);

  const isDisabled = hasError || !fee || isValueChanging;
  const isDisabledModalButton = !contractAddress || !Number(balance.xfi);

  const recipientInputErrorMessage = useMemo(() => {
    return (
      (recipientError && formatMessage({ id: recipientError })) ||
      (feeError?.amount && formatMessage({ id: feeError.amount })) ||
      (feeError?.wallet && formatMessage({ id: feeError.wallet }))
    );
  }, [feeError, recipientError, formatMessage]);

  const addressInputData = useGenerateFormBlockInputData<SendNftFormValues>({
    inputName: 'recipient',
    label: { type: 'intl', id: 'SUMMARY.RECIPIENT_ADDRESS' },
    isError: !!recipientInputErrorMessage,
    caption: recipientInputErrorMessage ? { type: 'intl', id: recipientInputErrorMessage } : undefined,
  });

  return (
    <>
      <Button
        isDisabled={isDisabledModalButton}
        onClick={onClickOpen}
        size={isMobile ? 'medium' : 'large'}
        isFullWidth={isMobile}
        {...buttonProps}
      >
        <FormattedMessage id="TOKENS.SEND_NFT" />
      </Button>

      <Modal isOpen={Boolean(activeStep)} title={{ id: 'TOKENS.SEND_NFT' }} setIsOpen={onCloseModal}>
        {activeStep === 'send' && (
          <SendNftForm
            commission={displayCommission}
            tokenId={tokenId}
            isLoading={isLoadingFee}
            isDisabled={isDisabled}
            errors={feeError}
            initialValues={initialFormValuesRef.current}
            onChange={onChange}
            onSubmit={onClickSubmit}
            onCancel={onCloseModal}
            addressInputData={addressInputData}
          />
        )}

        {activeStep === 'confirm' && (
          <ConfirmOperation
            title={<FormattedMessage id="WALLET.WOULD_YOU_LIKE_TO_SEND_NFT" />}
            cancelButtonText="SUMMARY.BACK"
            submitButtonText="SUMMARY.SEND"
            isDisabledCancel={isLoadingSend}
            isLoading={isLoadingSend}
            isDisabled={isDisabled || isLoadingSend}
            onCancel={onClickBack}
            onSubmit={onClickSend}
          >
            <TextBlock caption="SUMMARY.RECIPIENT_ADDRESS" text={formValues.recipient} />
            <TextBlock caption="SUMMARY.COMMISSION" text={<Amount value={displayCommission} />} />
            <TextBlock caption="TOKENS.TOKEN_ID" text={tokenId} />
          </ConfirmOperation>
        )}

        {activeStep === 'success' && (
          <Stack alignItems="center" justifyContent="center" height="100%" pb="1rem">
          </Stack>
        )}
      </Modal>
    </>
  );
};

const isValidForm = (values: SendNftFormValues) => {
  return EthersService.isAddress(values.recipient);
};

export default SendNftWidget;
