import { Stack, Typography } from '@mui/material';
import { MxNumberFormatter } from '@xfi/formatters';
import Image from 'next/image';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { useAddressInfo, useAppDispatch, useWallet } from '@/hooks';
import { CURRENCIES } from '@/lib/xfi.lib/constants';
import { MpxIcon, XfiIcon } from '@/lib/xfi.lib/icons';
import { useMediaQuery } from '@/lib/xfi.lib/theme';
import { useTheme } from '@/lib/xfi.lib/theme/ThemeProvider';
import { CosmosCurrency } from '@/shared/types';
import { getValidatorsAsync } from '@/store/validators';

import { ShapeBackground } from '@/components/atoms';
import { BalanceCurrency as BalanceCurrencyType, FrozenBalance, WalletBalances } from '@/components/molecules';

import WalletAddress from '../WalletAddress';
import { StyledContentContainer, StyledOldBalance } from './styles';

type OldBalanceProps = {
  actionSlot: ReactNode;
};

const OldBalance = ({ actionSlot }: OldBalanceProps) => {
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));
  const theme = useTheme();

  const {
    oldWallet: { balance, address },
    updateBalance,
  } = useWallet();

  const { unbondingDelegations } = useAddressInfo(address);

  const [currency, setCurrency] = useState(CosmosCurrency.XFI);

  useEffect(() => {
    updateBalance();
    dispatch(getValidatorsAsync());
  }, []);

  const hasFrozenBalance = Boolean(unbondingDelegations.length);

  const displayedBalance = useMemo(
    () =>
      MxNumberFormatter.formatUnitsToDisplay(currency === CosmosCurrency.XFI ? balance.xfi : balance.mpx, {
        maxFractionalLength: CURRENCIES[currency]?.formatDecimals || 6,
      }),
    [balance, currency]
  );

  return (
    <StyledOldBalance>
      <Stack gap={{ md: '3rem', xs: '1.5rem' }}>
        <StyledContentContainer>
          <Typography color="background.light" variant="subtitle1">
            <FormattedMessage id="SUMMARY.OLD_ADDRESS" />
          </Typography>
          <WalletBalances
            availableCurrencies={AVAILABLE_CURRENCIES}
            balance={displayedBalance}
            currency={currency}
            onCurrencyChange={setCurrency}
            actionSlot={actionSlot}
          />
          <WalletAddress withXdsName={false} className="walletAddress" />
        </StyledContentContainer>
        {hasFrozenBalance && <FrozenBalance balanceList={unbondingDelegations} />}
      </Stack>
      {!isMobile && (
        <ShapeBackground
          className={'shapeIconWrapper'}
          figureType={'cosmos'}
          width={600}
          height={600}
          cameraFov={70}
        />
      )}
    </StyledOldBalance>
  );
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

export default OldBalance;
