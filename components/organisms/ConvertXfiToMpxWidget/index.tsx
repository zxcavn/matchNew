import { Box, Stack, Typography } from '@mui/material';
import { MxNumberFormatter, NumberFormatter } from '@xfi/formatters';
import { useDebouncedCallback } from '@xfi/hooks';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { pushErrorTxNotification, pushInitTxNotification, pushSuccessTxNotification } from '@/helpers';
import { useAppDispatch, useAppSelector, useWallet, useWalletTransaction } from '@/hooks';
import { Button, Icon, Modal } from '@/lib/xfi.lib/components/atoms';
import { CURRENCIES } from '@/lib/xfi.lib/constants';
import { TwoArrowsIcon } from '@/lib/xfi.lib/icons';
import { useMediaQuery } from '@/lib/xfi.lib/theme';
import { SWAP_XFI_TO_MPX_ADDRESS } from '@/shared/constants';
import { CosmosCurrency, CosmosMessageType, SendTransactionOptions, WalletType } from '@/shared/types';
import { currenciesSelector, getSwapCurrenciesAsync } from '@/store/currencies';

import { ConvertXfiToMpxForm, ConvertXfiToMpxFormValues } from '@/components/molecules';

export const INITIAL_SWAP_FORM_VALUES: ConvertXfiToMpxFormValues = {
  gasCurrency: CosmosCurrency.MPX,
  sendAmount: '',
  getAmount: '',
};

const ConvertXfiToMpxWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<typeof INITIAL_SWAP_FORM_VALUES>(INITIAL_SWAP_FORM_VALUES);
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));

  const {
    isLoadingFee,
    isLoadingTransaction,
    fee,
    sendTransaction,
    setFeeData,
    calculateFee,
    feeError,
    error,
    isPendingTx,
  } = useWalletTransaction();

  const debouncedCalculateFee = useDebouncedCallback(calculateFee);

  const dispatch = useAppDispatch();
  const {
    newWallet: { balance },
  } = useWallet();

  const availableBalance = MxNumberFormatter.formatUnitsToDisplay(balance.xfi, {
    maxFractionalLength: CURRENCIES.xfi.formatDecimals,
  });

  useEffect(() => {
    dispatch(getSwapCurrenciesAsync());
  }, [dispatch]);

  useEffect(() => {
    if (!isOpen) {
      setFeeData({ isLoading: false });
      setStep(1);
      setValues(INITIAL_SWAP_FORM_VALUES);
    }
  }, [isOpen, setFeeData]);

  const { docs } = useAppSelector(currenciesSelector);

  const getXfiToMpxSwapRate = () => {
    if (docs?.mpx?.rate) {
      return NumberFormatter.formatUnitsToDisplay(
        (NumberFormatter.toBigInt(docs?.xfi?.rate * 10000) * 1000000n) /
          NumberFormatter.toBigInt(docs?.mpx?.rate * 1000000),
        {
          decimals: 4,
          maxFractionalLength: 4,
          minFractionalLength: 2,
        }
      );
    }
  };

  const onBackButtonClick = () => {
    setStep(1);
  };

  const setFeeError = () => {
    setFeeData(values => ({ ...values, error: 'ERRORS.NOT_ENOUGH_FOR_COMMISSION' }));
  };

  useEffect(() => {
    const amount = MxNumberFormatter.parseUnits(String(values?.sendAmount));
    const message: SendTransactionOptions = {
      type: CosmosMessageType.TRANSFER,
      options: {
        coins: [{ denom: CosmosCurrency.XFI, amount: String(amount) }],
        destinationAddress: SWAP_XFI_TO_MPX_ADDRESS,
        walletType: WalletType.NEW,
        gasCurrency: values.gasCurrency,
      },
    };

    if (values?.sendAmount) {
      debouncedCalculateFee(message);
    } else {
      setFeeData({ isLoading: false });
    }
  }, [values]);

  const transfer = () => {
    if (!fee?.amount) return;

    try {
      const amount = MxNumberFormatter.parseUnits(String(values?.sendAmount));

      sendTransaction(
        {
          type: CosmosMessageType.TRANSFER,
          options: {
            coins: [{ denom: CosmosCurrency.XFI, amount: String(amount) }],
            destinationAddress: SWAP_XFI_TO_MPX_ADDRESS,
            walletType: WalletType.NEW,
            gasCurrency: values.gasCurrency,
          },
        },
        {
          onInitTx: () => {
            setIsOpen(false);
            setStep(1);
            pushInitTxNotification();
            setValues(INITIAL_SWAP_FORM_VALUES);
          },

          onInitError: error => pushErrorTxNotification(error),

          onSuccess: () => pushSuccessTxNotification(CosmosMessageType.TRANSFER),
        }
      );
    } catch {
      setFeeError();
    }
  };

  const onChangeForm = (values: typeof INITIAL_SWAP_FORM_VALUES) => {
    setValues({
      ...values,
      getAmount: String(Number(values?.sendAmount) * Number(getXfiToMpxSwapRate()?.replace(' ', ''))),
    });
    setFeeData({ isLoading: false });
  };

  return (
    <>
      <Button
        isDisabled={Number(balance.xfi) <= 0n || isPendingTx}
        onClick={() => {
          setIsOpen(true);
        }}
        variant={'primary'}
        startIcon={<Icon src={TwoArrowsIcon.dark} viewBox="0 0 20 20" />}
        size={'large'}
      >
        <FormattedMessage id="SUMMARY.CONVERT" />
      </Button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={{ id: step === 1 ? 'SUMMARY.CONVERT' : 'SUMMARY.CONFIRM' }}>
        {step === 1 ? (
          <ConvertXfiToMpxForm
            initialValues={INITIAL_SWAP_FORM_VALUES}
            onCancel={() => setIsOpen(false)}
            availableBalance={availableBalance}
            onSubmit={() => setStep(2)}
            rate={Number(getXfiToMpxSwapRate()?.replace(' ', ''))}
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
                <Typography variant="body1">{`${NumberFormatter.formatToDisplay(String(values.sendAmount), {
                  maxFractionalLength: CURRENCIES.xfi.formatDecimals,
                })} ${CURRENCIES.xfi.text}`}</Typography>
              </Stack>
              <Stack gap={'0.5rem'}>
                <Typography variant="body2" color={'neutrals.secondaryText'}>
                  <FormattedMessage id="SUMMARY.YOU_GET" />
                </Typography>
                <Typography variant="body1">{`${NumberFormatter.formatToDisplay(String(values?.getAmount), {
                  maxFractionalLength: CURRENCIES.xfi.formatDecimals,
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
                onClick={() => transfer()}
                variant={'primary'}
                size="large"
                isLoading={isLoadingTransaction}
                isFullWidth={isMobile}
              >
                <FormattedMessage id="SUMMARY.CONFIRM" />
              </Button>
            </Box>
          </Stack>
        )}
      </Modal>
    </>
  );
};

export default ConvertXfiToMpxWidget;
