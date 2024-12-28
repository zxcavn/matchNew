import { Stack, Typography } from '@mui/material';
import { MxNumberFormatter } from '@xfi/formatters';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { useAddressInfo, useWallet } from '@/hooks';
import { Icon } from '@/lib/xfi.lib/components/atoms';
import { CURRENCIES } from '@/lib/xfi.lib/constants';
import { MpxIcon, NotificationsWarningIcon, XfiIcon } from '@/lib/xfi.lib/icons';
import { useTheme } from '@/lib/xfi.lib/theme/ThemeProvider';
import { IS_PRODUCTION } from '@/shared/constants';
import { CosmosCurrency } from '@/shared/types';

import { ShapeBackground, StakedMpx } from '@/components/atoms';
import { BalanceCurrency as BalanceCurrencyType, WalletBalances } from '@/components/molecules';

import ConvertMpxToEmpxWidget from '../ConvertMpxToEmpxWidget';
import ConvertXfiToMpxWidget from '../ConvertXfiToMpxWidget';
import { StyledCosmosBalancesWidget, StyledDescriptionContainer } from './styles';

type Props = {
  hasShapeImage?: boolean;
};

const CosmosBalancesWidget = ({ hasShapeImage }: Props) => {
  const theme = useTheme();
  const [currency, setCurrency] = useState(CosmosCurrency.XFI);
  const {
    newWallet: { address, balance },
    updateBalance,
  } = useWallet();

  const { fetchAddressInfo, totalDelegatedBalance } = useAddressInfo(address);

  const formattedBalance = useMemo(() => {
    const currentBalance = currency === CosmosCurrency.XFI ? balance.xfi : balance.mpx;

    return MxNumberFormatter.formatUnitsToDisplay(currentBalance, {
      maxFractionalLength: CURRENCIES[currency]?.formatDecimals || 6,
    });
  }, [balance, currency]);

  const balancesActionSlot = useMemo(() => {
    if (IS_PRODUCTION && currency === CosmosCurrency.XFI) {
      return <ConvertXfiToMpxWidget />;
    }

    if (currency === CosmosCurrency.MPX) {
      return <ConvertMpxToEmpxWidget />;
    }

    return null;
  }, [currency]);

  useEffect(() => {
    fetchAddressInfo();
    updateBalance();
  }, []);

  return (
    <StyledCosmosBalancesWidget
      title={
        <Typography variant="h4" color="background.light" marginBottom={{ xs: '1rem', md: '2.5rem' }}>
          <FormattedMessage id="SUMMARY.BALANCES" />
        </Typography>
      }
    >
      <Stack gap={{ xs: '1.5rem', md: '2rem' }}>
        <WalletBalances
          availableCurrencies={AVAILABLE_CURRENCIES}
          balance={formattedBalance}
          currency={currency}
          onCurrencyChange={setCurrency}
          actionSlot={balancesActionSlot}
          footerSlot={
            currency === CURRENCIES.mpx.symbol && <StakedMpx className="stakedMpxBlock" coins={totalDelegatedBalance} />
          }
        />
        <StyledDescriptionContainer>
          <Icon src={NotificationsWarningIcon} sx={{ fontSize: '1.25rem', flexShrink: 0 }} viewBox="0 0 20 20" />
          <Typography variant="body2" color="neutrals.secondaryText">
            <FormattedMessage id="WALLET.NEW_BALANCE_DESCRIPTION" />
          </Typography>
        </StyledDescriptionContainer>
      </Stack>

      {hasShapeImage && (
        <ShapeBackground
          className={'shapeIconWrapper'}
          figureType={'cosmos'}
          width={600}
          height={600}
          cameraFov={70}
          badge={
            <Image
              src={BADGE_CONFIG[theme.themeVariant].src}
              width={BADGE_CONFIG[theme.themeVariant].width}
              height={BADGE_CONFIG[theme.themeVariant].height}
              alt={'evm'}
              style={{
                position: 'absolute',
                right: BADGE_CONFIG[theme.themeVariant].right,
                top: BADGE_CONFIG[theme.themeVariant].top,
              }}
            />
          }
        />
      )}
    </StyledCosmosBalancesWidget>
  );
};

export default CosmosBalancesWidget;

const BADGE_CONFIG = {
  dark: {
    src: `/images/cosmos/cosmos_dark.webp`,
    width: 107,
    height: 65,
    top: '13rem',
    right: '8.5rem',
  },
  light: {
    src: `/images/cosmos/cosmos_light.webp`,
    width: 78,
    height: 40,
    top: '14.5rem',
    right: '8.5rem',
  },
};

const AVAILABLE_CURRENCIES: BalanceCurrencyType<CosmosCurrency>[] = [
  {
    name: CosmosCurrency.XFI,
    text: CURRENCIES.xfi.text,
    icon: XfiIcon,
  },
  {
    name: CosmosCurrency.MPX,
    text: CURRENCIES.mpx.text,
    icon: MpxIcon,
  },
];
