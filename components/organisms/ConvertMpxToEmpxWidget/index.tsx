import { Box, Stack, Typography } from '@mui/material';
import { MxNumberFormatter, NumberFormatter } from '@xfi/formatters';
import { useDebouncedCallback } from '@xfi/hooks';
import { useEffect, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { pushSuccessTxNotification } from '@/helpers';
import { useConvertCoin, useWallet, useWalletEMpxToken } from '@/hooks';
import { Button, Icon, Modal } from '@/lib/xfi.lib/components/atoms';
import { CURRENCIES, DEFAULT_CURRENCY } from '@/lib/xfi.lib/constants';
import { TwoArrowsIcon } from '@/lib/xfi.lib/icons';
import { useMediaQuery } from '@/lib/xfi.lib/theme';
import { CosmosCurrency, CosmosMessageType, EMpxToken, TOKENS } from '@/shared/types';

import { ConvertMpxToEmpxForm, ConvertMpxToEmpxFormValues } from '@/components/molecules';

enum ConvertMpxStepEnum {
  convert = 'convert',
  confirm = 'confirm',
}

export const INITIAL_CONVERT_FORM_VALUES: ConvertMpxToEmpxFormValues = {
  gasCurrency: CosmosCurrency.MPX,
  sendAmount: '',
  getAmount: '',
};

const ConvertMpxToEmpxWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<ConvertMpxStepEnum>(ConvertMpxStepEnum.convert);
  const [values, setValues] = useState<typeof INITIAL_CONVERT_FORM_VALUES>(INITIAL_CONVERT_FORM_VALUES);
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));

  const {
    isLoadingFee,
    isLoadingTransaction,
    fee,
    send,
    calculateFee,
    resetTransactionData,
    feeError,
    error,
    isPendingTx,
  } = useConvertCoin();

  const debouncedCalculateFee = useDebouncedCallback(calculateFee);

  const {
    newWallet: { balance },
  } = useWallet();

  const { updateBalance: updateEMpxBalance } = useWalletEMpxToken(EMpxToken.eMpx);
  const { eMpxToken: mpxChequeToken, updateBalance: updateMpxChequeBalance } = useWalletEMpxToken(EMpxToken.mpxCheque);

  const mpxChequeFormattedBalance = useMemo(() => {
    if (mpxChequeToken) {
      return NumberFormatter.formatUnitsToDisplay(mpxChequeToken.balance, {
        decimals: mpxChequeToken.decimals,
        maxFractionalLength: DEFAULT_CURRENCY.formatDecimals,
      });
    }

    return MxNumberFormatter.formatToDisplay('0');
  }, [mpxChequeToken]);

  useEffect(() => {
    if (!isOpen) {
      setStep(ConvertMpxStepEnum.convert);
      setValues(INITIAL_CONVERT_FORM_VALUES);
      resetTransactionData();
    }
  }, [isOpen]);

  const onBackButtonClick = () => {
    setStep(ConvertMpxStepEnum.convert);
  };

  useEffect(() => {
    const isValid = Boolean(Number(values?.sendAmount));

    if (isValid) {
      debouncedCalculateFee({
        coin: { denom: CosmosCurrency.MPX, amount: values.sendAmount },
        mpxChequeBalance: mpxChequeToken?.balance || '0',
        gasCurrency: values.gasCurrency,
      });
    }
  }, [values]);

  const transfer = () => {
    send({
      values: {
        coin: { denom: CosmosCurrency.MPX, amount: values.sendAmount },
        mpxChequeBalance: mpxChequeToken?.balance || '0',
        gasCurrency: values.gasCurrency,
      },
      onInitTx: () => {
        setIsOpen(false);
        setStep(ConvertMpxStepEnum.convert);
        setValues(INITIAL_CONVERT_FORM_VALUES);
      },
      onSuccess: () => {
        updateEMpxBalance();
        updateMpxChequeBalance();
        pushSuccessTxNotification(CosmosMessageType.CONVERT_COIN);
      },
    });
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
        {step === ConvertMpxStepEnum.convert ? (
          <ConvertMpxToEmpxForm
            initialValues={INITIAL_CONVERT_FORM_VALUES}
            onCancel={() => setIsOpen(false)}
            availableBalance={balance.mpx}
            mpxChequeBalance={mpxChequeFormattedBalance}
            onSubmit={() => setStep(ConvertMpxStepEnum.confirm)}
            fee={fee}
            isLoadingFee={isLoadingFee}
            values={values}
            onChange={onChangeForm}
            error={error === 'ERRORS.INSUFFICIENT_BALANCE' ? error : undefined}
            feeError={feeError !== 'ERRORS.INSUFFICIENT_BALANCE' ? error : undefined}
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
                })} ${CURRENCIES.mpx.text}`}</Typography>
              </Stack>
              <Stack gap={'0.5rem'}>
                <Typography variant="body2" color={'neutrals.secondaryText'}>
                  <FormattedMessage id="SUMMARY.YOU_GET" />
                </Typography>
                <Typography variant="body1">{`${MxNumberFormatter.formatToDisplay(String(values?.getAmount), {
                  maxFractionalLength: CURRENCIES.mpx.formatDecimals,
                })} ${TOKENS.eMpx.text}`}</Typography>
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
                isLoading={isLoadingTransaction}
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

export default ConvertMpxToEmpxWidget;
