import { Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { calculateUsdtPrice, formatDurationCount, mapDurationCountToSeconds } from '@/helpers';
import { ConnectionType, useWalletConnection } from '@/hocs';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useRenewName } from '@/hooks/xds';
import { AppLocale } from '@/lib/i18n';
import { Block, Button, ButtonProps, Icon, Modal } from '@/lib/xfi.lib/components/atoms';
import { WarningIcon } from '@/lib/xfi.lib/icons';
import { REGISTRATION_INTERVAL } from '@/shared/constants';
import { CosmosCurrency } from '@/shared/types';
import { currencyBySymbolSelector, getSwapCurrenciesAsync } from '@/store/currencies';

import { ModalErrorMessage } from '@/components/atoms';
import { Counter, XdsOperationModal, XdsPricingBlock, XdsSuccessOperationModal } from '@/components/molecules';
import { XdsPricingBlockProps } from '@/components/molecules/XdsPricingBlock';

type Props = {
  nameLabel: string;
  name: string;
  onSuccess: () => void;
} & Omit<ButtonProps, 'children'>;

enum ActiveStep {
  ENTER = 'enter',
  CONFIRM = 'confirm',
  SUCCESS = 'success',
}

const INITIAL_DURATION_COUNT = 1;

const ExtendName = ({ nameLabel, name, onSuccess: onSuccessProp, ...buttonProps }: Props) => {
  const dispatch = useAppDispatch();
  const currency = useAppSelector(currencyBySymbolSelector(CosmosCurrency.XFI));
  const { locale } = useIntl();
  const [activeStep, setActiveStep] = useState<ActiveStep | null>(null);
  const [durationCount, setDurationCount] = useState(INITIAL_DURATION_COUNT);
  const { connectionType } = useWalletConnection();

  const duration = useMemo(() => BigInt(mapDurationCountToSeconds(durationCount)), [durationCount]);
  const { isLoadingFee, isLoadingTx, error, estimatedRenewData, renew } = useRenewName({
    nameLabel,
    duration,
    isEnabledFeeCalculation: Boolean(activeStep),
  });

  const usdtPrice = useMemo(
    () => calculateUsdtPrice(estimatedRenewData.totalPrice, currency?.rate || 0),
    [estimatedRenewData.totalPrice, currency]
  );
  const displayDuration = useMemo(
    () => formatDurationCount(durationCount, REGISTRATION_INTERVAL, locale as AppLocale),
    [durationCount, locale]
  );

  const pricingBlockProps = useMemo(() => {
    return {
      data: [
        {
          text: { id: 'SUMMARY.REGISTRATION_TIME_BY_DURATION', values: { duration: displayDuration } },
          amount: estimatedRenewData.renewPrice,
        },
        { text: { id: 'SUMMARY.ESTIMATED_NETWORK_FEE' }, amount: estimatedRenewData.networkFee },
        { text: { id: 'SUMMARY.ESTIMATED_TOTAL' }, amount: estimatedRenewData.totalPrice, isPrimaryText: true },
      ],
      usdtPrice: usdtPrice,
    } as XdsPricingBlockProps;
  }, [displayDuration, usdtPrice, estimatedRenewData]);

  const closeModalAndResetData = useCallback(() => {
    setActiveStep(null);

    if (!isLoadingTx) {
      setDurationCount(INITIAL_DURATION_COUNT);
    }
  }, [isLoadingTx]);

  const openModal = useCallback(
    () => setActiveStep(isLoadingTx ? ActiveStep.CONFIRM : ActiveStep.ENTER),
    [isLoadingTx]
  );

  const onClickContinue = useCallback(() => setActiveStep(ActiveStep.CONFIRM), []);

  const onSubmit = useCallback(() => {
    renew({
      onSuccess: () => {
        setActiveStep(ActiveStep.SUCCESS);
        onSuccessProp();
      },
    });
  }, [renew, onSuccessProp]);

  useEffect(() => {
    if (!currency) {
      dispatch(getSwapCurrenciesAsync());
    }
  }, []);

  return (
    <>
      <Button onClick={openModal} size={'large'} {...buttonProps}>
        <Typography variant={'buttonText1'} whiteSpace={'nowrap'}>
          <FormattedMessage id="XDS_NAME.EXTEND" />
        </Typography>
      </Button>

      <Modal
        isOpen={activeStep === ActiveStep.ENTER}
        setIsOpen={closeModalAndResetData}
        title={{ id: 'XDS.EXTEND_NAME' }}
      >
        <Stack height="100%" gap="2rem" justifyContent="space-between">
          <Stack gap={{ md: '2rem', xs: '1.5rem' }}>
            {error && <ModalErrorMessage message={error} />}
            <Counter value={durationCount} onChange={setDurationCount}>
              {displayDuration}
            </Counter>
            <XdsPricingBlock {...pricingBlockProps} />
            <Block
              sx={{
                border: 'none',
                borderRadius: '1rem',
                padding: '1rem',
                background: theme => theme.palette.neutrals.toast,
              }}
            >
              <Stack direction="row" gap="0.5rem">
                <Icon src={WarningIcon} viewBox="0 0 20 20" sx={{ fontSize: '1.25rem' }} />
                <Stack gap="0.5rem">
                  <Typography variant="subtitle1" color="background.light">
                    <FormattedMessage id="XDS.NAME_EXPIRATION_DATE.TITLE" />
                  </Typography>
                  <Typography variant="body1" color="neutrals.secondaryText">
                    <FormattedMessage
                      id="XDS.NAME_EXPIRATION_DATE.DESCRIPTION"
                      values={{ duration: displayDuration }}
                    />
                  </Typography>
                </Stack>
              </Stack>
            </Block>
          </Stack>
          <Stack gap="1rem" direction={{ md: 'row', xs: 'column-reverse' }}>
            <Button onClick={closeModalAndResetData} isFullWidth variant="secondary" size="large">
              <FormattedMessage id="SUMMARY.CANCEL" />
            </Button>
            <Button
              onClick={onClickContinue}
              isFullWidth
              size="large"
              isLoading={isLoadingFee}
              isDisabled={Boolean(error)}
            >
              <FormattedMessage id="SUMMARY.CONTINUE" />
            </Button>
          </Stack>
        </Stack>
      </Modal>

      <XdsOperationModal
        isOpen={activeStep === ActiveStep.CONFIRM}
        setIsOpen={closeModalAndResetData}
        buttonSlot={
          <XdsOperationModal.SubmitButton
            onClick={onSubmit}
            isLoadingTx={isLoadingTx}
            isConnectedByExtension={connectionType === ConnectionType.EXTENSION}
          />
        }
      >
        {error && <ModalErrorMessage message={error} />}
        <XdsOperationModal.Description
          sx={{ mb: { md: 0, xs: '0.5rem' } }}
          text="SUMMARY.DOUBLE_CHECK_BEFORE_CONFIRMING"
        />
        <XdsOperationModal.Details label="SUMMARY.NAME" variant="name" name={name} />
        <XdsOperationModal.Details label="SUMMARY.ACTION" variant="badge" color="orange" text="XDS.EXTEND_NAME" />
        <XdsOperationModal.Details label="SUMMARY.DURATION" variant="text" text={displayDuration} />
        <XdsOperationModal.Details
          label="SUMMARY.COMMISSION"
          variant="commission"
          amount={estimatedRenewData.networkFee}
        />
      </XdsOperationModal>

      <XdsSuccessOperationModal
        isOpen={activeStep === ActiveStep.SUCCESS}
        setIsOpen={closeModalAndResetData}
        operationTitle={'XDS.YOU_EXTENDED_NAME'}
        name={name}
        description={{
          text: 'XDS.YOU_HAVE_SUCCESSFULLY_EXTENDED_NAME',
        }}
        detailsSlot={<XdsPricingBlock {...pricingBlockProps} />}
        button={{
          text: 'XDS.VIEW_NAME',
          onClick: closeModalAndResetData,
        }}
      />
    </>
  );
};

export default ExtendName;
