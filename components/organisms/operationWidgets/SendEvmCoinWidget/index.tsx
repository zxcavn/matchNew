import { Stack } from '@mui/material';
import { MxNumberFormatter } from '@xfi/formatters';
import { useDebouncedCallback, useDebouncedState } from '@xfi/hooks';
import isEmpty from 'lodash/isEmpty';
import { useCallback, useMemo, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { pushInitTxNotification, pushNotification } from '@/helpers';
import { useSendEvmCoin, useWallet } from '@/hooks';
import { Button, ButtonProps, Modal } from '@/lib/xfi.lib/components/atoms';
import { CURRENCIES } from '@/lib/xfi.lib/constants';
import { EthersService } from '@/services/evm';
import { notificationTypes } from '@/shared/constants';
import { Coin, CosmosCurrency } from '@/shared/types';


import { SendEvmCoinForm, SendEvmCoinFormValues } from '@/components/molecules';
import ConfirmOperation, { Amount, TextBlock } from '@/components/molecules/ConfirmOperation';
import { useGenerateFormBlockInputData } from '@/components/organisms/xds/XdsAddressInput';

import { FORM_CHANGES_TIMEOUT } from '../constants';

const initialFormValues: SendEvmCoinFormValues = {
  walletAddress: '',
  amount: '',
};

type ActiveStep = 'send' | 'confirm' | 'success' | null;

type Props = {
  buttonProps?: ButtonProps;
};

export const SendEvmCoinWidget = ({ buttonProps = {} }: Props) => {
  const {
    newWallet: { balance },
  } = useWallet();
  const [activeStep, setActiveStep] = useState<ActiveStep>(null);
  const [formValues, setFormValues, isValueChanging] = useDebouncedState<SendEvmCoinFormValues>(
    initialFormValues,
    FORM_CHANGES_TIMEOUT
  );
  const activeStepRef = useRef<ActiveStep>(null);
  const initialFormValuesRef = useRef<SendEvmCoinFormValues>(formValues);

  const { calculateFee, sendCoin, resetFeeData, isLoadingFee, isLoadingSend, fee, feeError, isPendingTx } =
    useSendEvmCoin();

  activeStepRef.current = activeStep;

  const debouncedCalculateFee = useDebouncedCallback(calculateFee);

  const addressInputData = useGenerateFormBlockInputData<SendEvmCoinFormValues>({
    inputName: 'walletAddress',
    isError: !!feeError?.wallet,
    caption: feeError?.wallet ? { type: 'intl', id: feeError.wallet } : undefined,
  });

  const onCloseModal = useCallback(() => {
    if (isLoadingSend) return setActiveStep(null);

    resetFeeData();
    setActiveStep(null);
    setFormValues(initialFormValues);
    initialFormValuesRef.current = initialFormValues;
  }, [isLoadingSend]);

  const onChange = useCallback((values: SendEvmCoinFormValues) => {
    setFormValues(values);

    if (isValidForm(values)) {
      debouncedCalculateFee({
        amount: MxNumberFormatter.parseUnits(values.amount).toString(),
        recipientAddress: values.walletAddress,
      });
    }
  }, []);

  const onClickSubmit = useCallback(() => {
    setActiveStep('confirm');

    initialFormValuesRef.current = formValues;
  }, [formValues]);

  const onClickOpen = useCallback(() => {
    setActiveStep(isLoadingSend ? 'confirm' : 'send');
  }, [isLoadingSend]);

  const onClickBack = useCallback(() => setActiveStep('send'), []);

  const onClickSend = useCallback(() => {
    if (!isValidForm(formValues)) return;

    sendCoin({
      options: {
        amount: MxNumberFormatter.parseUnits(formValues.amount).toString(),
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
          additional: {
            id: 'WALLET.SUCCESS_SEND_COIN',
            values: { coin: CURRENCIES.xfi.text },
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
  }, [formValues]);

  const displayCommission: Coin | undefined = useMemo(
    () => fee && { amount: MxNumberFormatter.formatUnitsToDisplay(fee.amount), denom: CosmosCurrency.XFI },
    [fee]
  );

  const displayAmount: Coin = useMemo(
    () => ({ amount: MxNumberFormatter.formatToDisplay(formValues.amount), denom: CosmosCurrency.XFI }),
    [formValues]
  );

  const hasError = useMemo(() => !isEmpty(feeError), [feeError]);
  const isDisabled = hasError || !fee || isLoadingFee || isValueChanging || !isValidForm(formValues);
  const isDisabledModalButton = !Number(balance.xfi) || isPendingTx;

  return (
    <>
      <Button isDisabled={isDisabledModalButton} onClick={onClickOpen} size="large" {...buttonProps}>
        <FormattedMessage id="SUMMARY.SEND" />
      </Button>

      <Modal
        isOpen={Boolean(activeStep)}
        title={{ id: 'SUMMARY.SEND_COIN', values: { coin: CURRENCIES.xfi.text } }}
        setIsOpen={onCloseModal}
      >
        {activeStep === 'send' && (
          <SendEvmCoinForm
            commission={displayCommission}
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
            title={<FormattedMessage id="WALLET.WOULD_YOU_LIKE_TO_SEND_COIN" values={{ coin: CURRENCIES.xfi.text }} />}
            cancelButtonText="SUMMARY.BACK"
            submitButtonText="SUMMARY.SEND"
            isDisabledCancel={isLoadingSend}
            isLoading={isLoadingSend}
            isDisabled={isDisabled || isLoadingSend}
            onCancel={onClickBack}
            onSubmit={onClickSend}
          >
            <TextBlock caption="SUMMARY.ADDRESS" text={formValues.walletAddress} />
            <TextBlock caption="SUMMARY.AMOUNT" text={<Amount value={displayAmount} />} />
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

const isValidForm = (values: SendEvmCoinFormValues) => {
  return (
    EthersService.isAddress(values.walletAddress) &&
    Number(values.amount.trim()) &&
    Boolean(MxNumberFormatter.normalizeUserInput(values.amount))
  );
};

export default SendEvmCoinWidget;
