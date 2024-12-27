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
        <StyledDescriptionContainer>
          <Icon src={NotificationsWarningIcon} sx={{ fontSize: '1.25rem', flexShrink: 0 }} viewBox="0 0 20 20" />
          <Typography variant="body2" color="neutrals.secondaryText">
            <FormattedMessage id="WALLET.NEW_BALANCE_DESCRIPTION" />
          </Typography>
        </StyledDescriptionContainer>
      </Stack>
    </StyledCosmosBalancesWidget>
  );
};

export default CosmosBalancesWidget;



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
