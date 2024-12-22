import { Box, Stack, Typography } from '@mui/material';
import { MxNumberFormatter, NumberFormatter } from '@xfi/formatters';
import { useDebouncedCallback } from '@xfi/hooks';
import { useEffect, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { pushInitTxNotification, pushNotification, pushSuccessTxNotification } from '@/helpers';
import { getAmountForSend } from '@/helpers/sendToken';
import { useSendToken, useSendTokenFee, useWalletEMpxToken, useWalletTokens } from '@/hooks';
import { Button, Icon, Modal } from '@/lib/xfi.lib/components/atoms';
import { CURRENCIES, DEFAULT_CURRENCY } from '@/lib/xfi.lib/constants';
import { TwoArrowsIcon } from '@/lib/xfi.lib/icons';
import { useMediaQuery } from '@/lib/xfi.lib/theme';
import { CONVERT_EMPX_ADDRESS, EMPX_TOKEN, notificationTypes } from '@/shared/constants';
import { Coin, CosmosCurrency, CosmosMessageType, EMpxToken, TOKENS } from '@/shared/types';

import { ConvertEMpxToMpxForm, ConvertEMpxToMpxFormValues } from '@/components/molecules';

enum ConvertEMpxStepEnum {
  convert = 'convert',
  confirm = 'confirm',
}

export const INITIAL_CONVERT_FORM_VALUES: ConvertEMpxToMpxFormValues = {
  sendAmount: '',
  getAmount: '',
};

const ConvertEMpxToMpxWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<ConvertEMpxStepEnum>(ConvertEMpxStepEnum.convert);
  const [values, setValues] = useState<typeof INITIAL_CONVERT_FORM_VALUES>(INITIAL_CONVERT_FORM_VALUES);
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));

  const { updateTokens } = useWalletTokens();
  const { feeData, isLoading: isLoadingFee, error: feeError, calculateFee, resetFeeData } = useSendTokenFee();
  const { sendToken, isLoading: isLoadingSend, isPendingTx } = useSendToken();

  const debouncedCalculateFee = useDebouncedCallback(calculateFee);

  const { eMpxToken: eMpxToken, updateBalance: updateEMpxBalance } = useWalletEMpxToken(EMpxToken.eMpx);
  const { updateBalance: updateMpxChequeBalance } = useWalletEMpxToken(EMpxToken.mpxCheque);

  const eMpxFormattedBalance = useMemo(() => {
    if (eMpxToken) {
      return NumberFormatter.formatUnitsToDisplay(eMpxToken.balance, {
        decimals: eMpxToken.decimals,
        maxFractionalLength: DEFAULT_CURRENCY.formatDecimals,
      });
    }

    return MxNumberFormatter.formatToDisplay('0');
  }, [eMpxToken]);

  const displayCommission: Coin | undefined | null = useMemo(
    () =>
      feeData &&
      eMpxToken && {
        amount: NumberFormatter.formatUnitsToDisplay(feeData.amount, { decimals: eMpxToken.decimals }),
        denom: CosmosCurrency.XFI,
      },
    [feeData, eMpxToken]
  );

  useEffect(() => {
    if (!isOpen) {
      setStep(ConvertEMpxStepEnum.convert);
      setValues(INITIAL_CONVERT_FORM_VALUES);
      resetFeeData();
    }
  }, [isOpen]);

  const onBackButtonClick = () => {
    setStep(ConvertEMpxStepEnum.convert);
  };

  useEffect(() => {
    if (eMpxToken) {
      const isValid = Boolean(Number(values?.sendAmount));
      const normalizedAmount = getAmountForSend(values.sendAmount, eMpxToken.decimals);

      if (isValid && Number(normalizedAmount)) {
        debouncedCalculateFee({
          contractAddress: EMPX_TOKEN,
          recipientAddress: CONVERT_EMPX_ADDRESS,
          amount: normalizedAmount,
        });
      }
    }
  }, [values, eMpxToken]);

  const transfer = () => {
    if (eMpxToken) {
      sendToken({
        options: {
          amount: getAmountForSend(values.sendAmount, eMpxToken?.decimals),
          contractAddress: EMPX_TOKEN,
          recipientAddress: CONVERT_EMPX_ADDRESS,
        },
        onInit: () => {
          pushInitTxNotification();
          setIsOpen(false);
          setStep(ConvertEMpxStepEnum.convert);
          setValues(INITIAL_CONVERT_FORM_VALUES);
        },
        onSuccess: () => {
          updateEMpxBalance();
          updateMpxChequeBalance();
          updateTokens();
          pushSuccessTxNotification(CosmosMessageType.CONVERT_COIN);
        },
        onError: error =>
          pushNotification({
            ...notificationTypes.error,
            message: { id: error },
          }),
      });
    }
  };

  const onChangeForm = (values: typeof INITIAL_CONVERT_FORM_VALUES) => {
    setValues({
      ...values,
      getAmount: Number(values?.sendAmount) ? values?.sendAmount.trim() : '0',
    });
  };

  return (
    <>
      <Button
        isDisabled={isPendingTx}
        onClick={() => {
          setIsOpen(true);
        }}
        variant={'primary'}
        startIcon={<Icon src={TwoArrowsIcon.dark} viewBox="0 0 20 20" />}
        size={'large'}
      >
        <FormattedMessage id="SUMMARY.CONVERT" />
      </Button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={{ id: 'SUMMARY.CONVERT' }}>
        {step === ConvertEMpxStepEnum.convert ? (
          <ConvertEMpxToMpxForm
            initialValues={INITIAL_CONVERT_FORM_VALUES}
            onCancel={() => setIsOpen(false)}
            availableBalance={eMpxFormattedBalance}
            onSubmit={() => setStep(ConvertEMpxStepEnum.confirm)}
            fee={displayCommission}
            isLoadingFee={isLoadingFee}
            values={values}
            onChange={onChangeForm}
            error={feeError?.amount}
            feeError={feeError?.commission}
          />
        ) : (
          <Stack gap={'2rem'}>
            <Typography variant="subtitle2">
              <FormattedMessage id="WALLET.COMPLETE_THE_CONVERTATION" />
            </Typography>
            <Stack gap={'1.5rem'}>
              <Stack gap={'0.5rem'}>
                <Typography variant="body2" color={'neutrals.secondaryText'}>
                  <FormattedMessage id="SUMMARY.YOU_SEND" />
                </Typography>
                <Typography variant="body1">{`${MxNumberFormatter.formatToDisplay(String(values.sendAmount), {
                  maxFractionalLength: CURRENCIES.mpx.formatDecimals,
                })} ${TOKENS.eMpx.text}`}</Typography>
              </Stack>
              <Stack gap={'0.5rem'}>
                <Typography variant="body2" color={'neutrals.secondaryText'}>
                  <FormattedMessage id="SUMMARY.YOU_GET" />
                </Typography>
                <Typography variant="body1">{`${MxNumberFormatter.formatToDisplay(String(values?.getAmount), {
                  maxFractionalLength: CURRENCIES.mpx.formatDecimals,
                })} ${CURRENCIES.mpx.text}`}</Typography>
              </Stack>
            </Stack>
            <Box
              display={'flex'}
              gap={'1rem'}
              justifyContent={'end'}
              flexDirection={{ xs: 'column-reverse', sm: 'row' }}
            >
              <Button onClick={onBackButtonClick} variant={'secondary'} size="large" isFullWidth={isMobile}>
                <FormattedMessage id="SUMMARY.BACK" />
              </Button>
              <Button
                onClick={transfer}
                variant={'primary'}
                size="large"
                isLoading={isLoadingSend}
                isFullWidth={isMobile}
              >
                <FormattedMessage id="STEPS.CONVERT" />
              </Button>
            </Box>
          </Stack>
        )}
      </Modal>
    </>
  );
};

export default ConvertEMpxToMpxWidget;
