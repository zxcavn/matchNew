import { Stack } from '@mui/material';
import { NumberFormatter } from '@xfi/formatters';
import { useDebouncedCallback, useDebouncedState } from '@xfi/hooks';
import { useCallback, useMemo, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { pushInitTxNotification, pushNotification } from '@/helpers';
import { getAmountForSend, isValidValues } from '@/helpers/sendToken';
import { useSendToken, useSendTokenFee } from '@/hooks';
import { Button, ButtonProps, Modal } from '@/lib/xfi.lib/components/atoms';
import { NONE_VALUE, notificationTypes } from '@/shared/constants';
import { Coin, CosmosCurrency } from '@/shared/types';
import type { StorageToken } from '@/store/walletTokens';

import { SendTokenForm, SendTokenFormValues } from '@/components/molecules';
import ConfirmOperation, { Amount, TextBlock } from '@/components/molecules/ConfirmOperation';
import { useGenerateFormBlockInputData } from '@/components/organisms/xds/XdsAddressInput';

import { FORM_CHANGES_TIMEOUT } from '../constants';

type ActiveStep = 'send' | 'confirm' | 'success' | null;

type Props = {
  buttonProps?: ButtonProps;
  contractAddress: string;
  tokens: StorageToken[];
  onSuccess: () => void;
};

const SendTokenWidget = ({ contractAddress, tokens, onSuccess, buttonProps = {} }: Props) => {
  const { feeData, isLoading: isLoadingFee, error: feeError, calculateFee, resetFeeData } = useSendTokenFee();
  const { sendToken, isLoading: isLoadingSend, isPendingTx } = useSendToken();

  const [activeStep, setActiveStep] = useState<ActiveStep>(null);
  const activeStepRef = useRef<ActiveStep>(null);

  activeStepRef.current = activeStep;

  const [formValues, setFormValues, isValueChanging] = useDebouncedState<SendTokenFormValues>(
    {
      walletAddress: '',
      contractAddress,
      amount: '',
    },
    FORM_CHANGES_TIMEOUT
  );
  const initialFormValuesRef = useRef<SendTokenFormValues>(formValues);

  const currentSendToken = useMemo(
    () => tokens.find(({ contractAddress: address }) => address === formValues.contractAddress),
    [tokens, formValues.contractAddress]
  );

  const debouncedCalculateFee = useDebouncedCallback(calculateFee);

  const onClickOpen = useCallback(() => {
    setActiveStep(isLoadingSend ? 'confirm' : 'send');
  }, [isLoadingSend]);

  const onChange = useCallback(
    (values: SendTokenFormValues) => {
      const { amount, walletAddress, contractAddress } = values;

      setFormValues(values);

      const currentSendToken = tokens.find(({ contractAddress: address }) => address === contractAddress);

      if (!currentSendToken) return;

      const isValid = isValidValues({ formValues: values, currentSendToken });
      const normalizedAmount = getAmountForSend(amount, currentSendToken.decimals);

      if (isValid && Number(normalizedAmount)) {
        debouncedCalculateFee({
          contractAddress,
          recipientAddress: walletAddress,
          amount: normalizedAmount,
        });
      }
    },
    [tokens]
  );

  const onClickSend = useCallback(() => {
    if (!currentSendToken) return;

    sendToken({
      options: {
        amount: getAmountForSend(formValues.amount, currentSendToken.decimals),
        contractAddress: formValues.contractAddress,
        recipientAddress: formValues.walletAddress,
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
          additional: { id: 'TOKENS.SUCCESS_SEND_TOKEN' },
        });
        onSuccess();
      },
      onError: error =>
        pushNotification({
          ...notificationTypes.error,
          message: { id: error },
        }),
    });
  }, [formValues, currentSendToken]);

  const onCloseModal = useCallback(() => {
    if (isLoadingSend) {
      setActiveStep(null);

      return;
    }

    const initialValues = {
      walletAddress: '',
      contractAddress,
      amount: '',
    };

    setActiveStep(null);
    resetFeeData();
    setFormValues(initialValues);
    initialFormValuesRef.current = initialValues;
  }, [isLoadingSend, contractAddress]);

  const onClickSubmit = useCallback(() => {
    setActiveStep('confirm');

    initialFormValuesRef.current = formValues;
  }, [formValues]);

  const onClickBack = useCallback(() => setActiveStep('send'), []);

  const isDisabled = useMemo(() => {
    if (isLoadingFee || !feeData || !currentSendToken) return true;

    const isValid = isValidValues({ formValues, currentSendToken });

    if (!isValid) return true;

    const normalizedAmount = NumberFormatter.normalizeUserInput(formValues.amount, currentSendToken.decimals);

    if (!Number(normalizedAmount)) return true;

    return BigInt(currentSendToken.balance) < NumberFormatter.parseUnits(normalizedAmount, currentSendToken.decimals);
  }, [isLoadingFee, feeData, formValues, currentSendToken]);

  const displayCommission: Coin | undefined = useMemo(
    () =>
      feeData &&
      currentSendToken && {
        amount: NumberFormatter.formatUnitsToDisplay(feeData.amount, { decimals: currentSendToken.decimals }),
        denom: CosmosCurrency.XFI,
      },
    [feeData, currentSendToken]
  );

  const displayAmount = useMemo(() => {
    if (!currentSendToken) return NONE_VALUE;

    return NumberFormatter.formatToDisplay(formValues.amount, { maxFractionalLength: currentSendToken.decimals });
  }, [formValues, currentSendToken]);

  const addressInputData = useGenerateFormBlockInputData<SendTokenFormValues>({ inputName: 'walletAddress' });

  if (!tokens.length || !currentSendToken) {
    return (
      <Button {...buttonProps} isDisabled>
        <FormattedMessage id="SUMMARY.SEND" />
      </Button>
    );
  }

  return (
    <>
      <Button onClick={onClickOpen} {...buttonProps} isDisabled={isPendingTx}>
        <FormattedMessage id="SUMMARY.SEND" />
      </Button>

      <Modal isOpen={Boolean(activeStep)} title={{ id: 'TOKENS.SEND_TOKEN' }} setIsOpen={onCloseModal}>
        {activeStep === 'send' && (
          <SendTokenForm
            commission={displayCommission}
            isLoading={isLoadingFee}
            isDisabled={isDisabled || isValueChanging}
            errors={feeError}
            tokens={tokens}
            initialValues={initialFormValuesRef.current}
            onChange={onChange}
            onSubmit={onClickSubmit}
            onCancel={onCloseModal}
            addressInputData={addressInputData}
          />
        )}

        {activeStep === 'confirm' && (
          <ConfirmOperation
            title="TOKENS.WOULD_YOU_LIKE_SEND_TOKENS"
            onCancel={onClickBack}
            onSubmit={onClickSend}
            cancelButtonText="SUMMARY.BACK"
            submitButtonText="SUMMARY.SEND"
            isDisabledCancel={isLoadingSend}
            isDisabled={isLoadingSend || isDisabled || isValueChanging}
            isLoading={isLoadingSend}
          >
            <TextBlock caption="SUMMARY.ADDRESS" text={formValues.walletAddress} />
            <TextBlock caption="SUMMARY.TOKEN" text={currentSendToken.name} />
            <TextBlock caption="SUMMARY.AMOUNT" text={displayAmount} />
            <TextBlock caption="SUMMARY.COMMISSION" text={<Amount value={displayCommission} />} />
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

export default SendTokenWidget;
