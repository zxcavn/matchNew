import { Typography } from '@mui/material';
import { MxNumberFormatter, NumberFormatter } from '@xfi/formatters';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { useWallet, useWalletEMpxToken, useWalletExtraToken } from '@/hooks';
import { CURRENCIES, DEFAULT_CURRENCY } from '@/lib/xfi.lib/constants';
import { EMpxIcon, XfiIcon } from '@/lib/xfi.lib/icons';
import { useMediaQuery } from '@/lib/xfi.lib/theme';
import { useTheme } from '@/lib/xfi.lib/theme/ThemeProvider';
import { CosmosCurrency, EMpxToken, TOKENS } from '@/shared/types';

import { ShapeBackground } from '@/components/atoms';
import { BalanceCurrency as BalanceCurrencyType, WalletBalances } from '@/components/molecules';

import { StyledBalanceContainer, StyledBlock, StyledContentContainer } from './styles';

type Props = {
  className?: string;
};

const EvmBalance = ({ className }: Props) => {
  const {
    newWallet: { balance },
    updateBalance,
  } = useWallet();
  const [currency, setCurrency] = useState<string>(CosmosCurrency.XFI);
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));
  const theme = useTheme();
  const { extraToken, updateBalance: updateExtraTokenBalance } = useWalletExtraToken();
  const { eMpxToken } = useWalletEMpxToken(EMpxToken.eMpx);

  const formattedBalance = useMemo(() => {
    if (currency === CosmosCurrency.XFI) {
      return MxNumberFormatter.formatUnitsToDisplay(balance.xfi, {
        maxFractionalLength: CURRENCIES.xfi.formatDecimals,
      });
    }

    if (currency === EMpxToken.eMpx && eMpxToken) {
      return MxNumberFormatter.formatUnitsToDisplay(eMpxToken?.balance, {
        maxFractionalLength: DEFAULT_CURRENCY.formatDecimals,
      });
    }

    if (extraToken) {
      return NumberFormatter.formatUnitsToDisplay(extraToken.balance, {
        decimals: extraToken.decimals,
        maxFractionalLength: DEFAULT_CURRENCY.formatDecimals,
      });
    }

    return MxNumberFormatter.formatToDisplay('0');
  }, [balance, currency, extraToken, eMpxToken]);

  const { availableCurrencies, availableTokenList } = useMemo(
    () => ({
      availableCurrencies: getAvailableCurrencies(extraToken?.symbol),
      availableTokenList: extraToken ? [extraToken] : [],
    }),
    [extraToken]
  );

  return (
    <StyledBlock
      className={className}
      title={
        <Typography mb="1.5rem" color="background.light" variant="h4">
          <FormattedMessage id="SUMMARY.BALANCES" />
        </Typography>
      }
    >
      <StyledBalanceContainer>
        <StyledContentContainer>
          <WalletBalances
            availableCurrencies={availableCurrencies}
            balance={formattedBalance}
            currency={currency}
            onCurrencyChange={setCurrency}
          />
        </StyledContentContainer>
        {!isMobile && (
          <ShapeBackground
            className={'shapeIconWrapper'}
            figureType={'evm'}
            width={520}
            height={520}
            backgroundProps={BACKGROUND_PROPS_SHAPE_1}
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
      </StyledBalanceContainer>
    </StyledBlock>
  );
};

export default EvmBalance;

const getAvailableCurrencies = (extraTokenSymbol?: string): BalanceCurrencyType<string>[] => {
  return [
    {
      name: CosmosCurrency.XFI,
      text: CURRENCIES.xfi.text,
      icon: XfiIcon,
    },
    {
      name: EMpxToken.eMpx,
      text: TOKENS.eMpx.text,
      icon: EMpxIcon,
    },
    ...(extraTokenSymbol
      ? [{ name: extraTokenSymbol, text: extraTokenSymbol.toUpperCase(), icon: DEFAULT_CURRENCY.Icon }]
      : []),
  ];
};

const BADGE_CONFIG = {
  dark: {
    src: `/images/evm/evm_dark.webp`,
    width: 105,
    height: 75,
    top: '10.9rem',
    right: '8.1rem',
  },
  light: {
    src: `/images/evm/evm_light.webp`,
    width: 77,
    height: 47,
    top: '12.8rem',
    right: '8.4rem',
  },
};

const BACKGROUND_PROPS_SHAPE_1 = {
  width: 210,
  height: 642,
  rotation: 40,
  y: -140,
  x: -40,
};
