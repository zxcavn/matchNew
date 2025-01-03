import { Box, Stack, Typography } from '@mui/material';
import { useDocumentVisibility } from '@xfi/hooks';
import { useState, type ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';

import { pushNotification } from '@/helpers';
import { useAppDispatch, useAppSelector, useWallet } from '@/hooks';
import { Button, Divider, Icon, Link, Modal } from '@/lib/xfi.lib/components/atoms';
import { CURRENCIES } from '@/lib/xfi.lib/constants';
import { TelegramIcon } from '@/lib/xfi.lib/icons';
import { notificationTypes } from '@/shared/constants';
import { CosmosCurrency } from '@/shared/types';
import {
  FaucetWidgetStep,
  TgAuthTokenType,
  checkAuthAsync,
  faucetSelector,
  getClaimCoinAsync,
  getLinkAsync,
} from '@/store/faucet';

import { CountDown } from '@/components/atoms';

const AVAILABLE_CLAIM_AMOUNT_FOR_PREMIUM = {
  MPX: 100,
  XFI: 10,
};

const AVAILABLE_CLAIM_AMOUNT_FOR_DEFAULT = {
  MPX: 1,
  XFI: 0.01,
};

type RenderStepType = {
  [key in FaucetWidgetStep]: ReactElement;
};

const GetClaimWidget = () => {
  const dispatch = useAppDispatch();
  const {
    newWallet: { evmAddress: account },
  } = useWallet();

  const { tgAuthToken, step, tgAccount, mpx, xfi } = useAppSelector(faucetSelector);
  const [isOpen, setIsOpen] = useState(false);

  useDocumentVisibility(() => {
    if (account && isOpen && step === FaucetWidgetStep.CLAIM) {
      onLoginTelegram();
    }
  });

  if (!account) return null;

  const onCloseModal = () => {
    setIsOpen(false);
  };

  const onOpenTelegram = () => {
    dispatch(getLinkAsync());
  };

  const onLoginTelegram = () => {
    if (tgAuthToken) {
      dispatch(checkAuthAsync(tgAuthToken));
    }
  };

  const onClaimCoin = (coin: CosmosCurrency, account: string, telegram_id: string, token: string) => {
    dispatch(getClaimCoinAsync({ coin, account, telegram_id, token }));
  };

  const renderOpenTelegramStep = () => {
    return (
      <Stack alignItems={'center'} gap={'1.5rem'}>
        <Typography color={'background.light'}>
          <FormattedMessage id={'SUMMARY.AUTHORIZE_IN_TELEGRAM'} />
        </Typography>
        <Button onClick={onOpenTelegram} size={'large'}>
          <FormattedMessage id={'SUMMARY.OPEN_TELEGRAM'} />
        </Button>
      </Stack>
    );
  };

  const renderLoginTelegramStep = () => {
    return (
      <Stack alignItems={'center'} justifyContent={'center'} gap={'1.5rem'}>
        <Typography textAlign={'center'} color={'background.light'}>
          <FormattedMessage id={'SUMMARY.CONFIRM_AUTH_ACTION'} />
        </Typography>
        <Button onClick={onLoginTelegram} size={'large'}>
          <FormattedMessage id={'SUMMARY.AUTHORIZE'} />
        </Button>
        <Stack alignItems={'center'} justifyContent={'center'} gap={'1rem'}>
          <Typography
            textAlign={'center'}
            maxWidth={{ xs: 'unset', md: '80%' }}
            variant={'body2'}
            color={'neutrals.secondaryText'}
          >
            <FormattedMessage id={'SUMMARY.TELEGRAM_REDIRECT_MESSAGE'} />
          </Typography>
          <Link href={tgAuthToken?.link} target="_blank">
            <FormattedMessage id={'SUMMARY.TELEGRAM'} />
          </Link>
        </Stack>
      </Stack>
    );
  };

  const renderClaimStep = () => {
    const mpxClaimTimeleft = getClaimTimeLeftFrom24Hours(mpx.lastClaimTime);
    const xfiClaimTimeleft = getClaimTimeLeftFrom24Hours(xfi.lastClaimTime);

    const ClaimInfo = getClaimInfoRow(tgAccount, tgAuthToken, account, onClaimCoin);

    return (
      <Stack gap={'1rem'} direction={'column'} justifyContent={'center'}>
        <ClaimInfo
          timeLeft={mpxClaimTimeleft}
          availableClaimAmountForPremium={AVAILABLE_CLAIM_AMOUNT_FOR_PREMIUM.MPX}
          availableClaimAmountForDefault={AVAILABLE_CLAIM_AMOUNT_FOR_DEFAULT.MPX}
          currencyText={CURRENCIES.mpx.text}
          cosmosCurrency={CosmosCurrency.MPX}
          isLoading={mpx.isLoading}
        />
        <Divider />
        <ClaimInfo
          timeLeft={xfiClaimTimeleft}
          availableClaimAmountForPremium={AVAILABLE_CLAIM_AMOUNT_FOR_PREMIUM.XFI}
          availableClaimAmountForDefault={AVAILABLE_CLAIM_AMOUNT_FOR_DEFAULT.XFI}
          currencyText={CURRENCIES.xfi.text}
          cosmosCurrency={CosmosCurrency.XFI}
          isLoading={xfi.isLoading}
        />
      </Stack>
    );
  };

  const renderStep: RenderStepType = {
    [FaucetWidgetStep.OPEN_TELEGRAM]: renderOpenTelegramStep(),
    [FaucetWidgetStep.LOGIN_TELEGRAM]: renderLoginTelegramStep(),
    [FaucetWidgetStep.CLAIM]: renderClaimStep(),
  };

  return (
    <>
      <Button isFullWidth onClick={() => setIsOpen(true)} size={'large'} variant={'secondary'}>
        <FormattedMessage id={'SUMMARY.TELEGRAM'} />
        <Icon
          src={TelegramIcon}
          viewBox="0 0 20 20"
          sx={{
            fontSize: '1.25rem',
            ml: '0.5rem',
            transform: 'translateY(0.2rem)',
          }}
        />
      </Button>
      <Modal isOpen={isOpen} setIsOpen={onCloseModal} title={{ id: 'SUMMARY.CLAIM' }}>
        {renderStep[step]}
      </Modal>
    </>
  );
};

type ClaimInfoProps = {
  timeLeft: number | null;
  availableClaimAmountForPremium: number;
  availableClaimAmountForDefault: number;
  currencyText: string;
  cosmosCurrency: CosmosCurrency;
  isLoading: boolean;
};

const getClaimInfoRow =
  (
    tgAccount: any,
    tgAuthToken: TgAuthTokenType | null,
    account: string,
    onClaimCoin: (coin: CosmosCurrency, account: string, telegram_id: string, token: string) => void
  ) =>
  ({
    timeLeft,
    availableClaimAmountForPremium,
    availableClaimAmountForDefault,
    currencyText,
    cosmosCurrency,
    isLoading,
  }: ClaimInfoProps) => {
    return (
      <Stack gap={'1.25rem'} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Box minWidth={'4.0625rem'}>
          <Typography variant="subtitle1" color="background.light">
            {tgAccount?.telegram_user.is_premium ? availableClaimAmountForPremium : availableClaimAmountForDefault}{' '}
            {currencyText}
          </Typography>
        </Box>
        <Stack gap={'0.5rem'} direction={'row'} minWidth={'10rem'}>
          {timeLeft && Boolean(timeLeft) && <CountDown countStart={Math.round(timeLeft / 1000)} />}
        </Stack>
        <Button
          onClick={() => {
            if (tgAuthToken?.token && tgAccount?.telegram_user.id) {
              onClaimCoin(cosmosCurrency, account, String(tgAccount?.telegram_user.id), tgAuthToken?.token);
            } else {
              pushNotification({
                ...notificationTypes.error,
                ...notificationTypes.error,
                message: { id: 'ERRORS.UNEXPECTED_ERROR' },
              });
            }
          }}
          size={'large'}
          isDisabled={Boolean(timeLeft) || isLoading}
          isLoading={isLoading}
        >
          <FormattedMessage id={'SUMMARY.CLAIM'} />
        </Button>
      </Stack>
    );
  };

export default GetClaimWidget;

const getClaimTimeLeftFrom24Hours = (lastClaimTime: number | null): number | null => {
  if (!lastClaimTime) return null;

  const currentTime = Date.now();
  const CLAIM_LIMIT_TIME_MS = 24 * 60 * 60 * 1000; // 24 hours

  const timeDifference = currentTime - lastClaimTime * 1000;

  if (timeDifference) {
    const timeToWait = CLAIM_LIMIT_TIME_MS - timeDifference;

    return timeToWait <= 0 ? null : timeToWait;
  }

  return null;
};
