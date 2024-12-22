import { Stack, Typography } from '@mui/material';
import { type ElementType, type ReactElement, type ReactNode, useMemo } from 'react';

import { ThemeIcon } from '@/lib/xfi.lib/icons/types';
import { useMediaQuery } from '@/lib/xfi.lib/theme';

import CurrencyButton from '@/components/atoms/CurrencyButton';

import { CHEEP_NOTEBOOK_RESOLUTION, StyledBalance, StyledBalanceAmount } from './styles';

export type BalanceCurrency<T> = {
  name: T;
  text: string;
  icon: ElementType | ThemeIcon;
};

type Props<T> = {
  availableCurrencies: BalanceCurrency<T>[];
  currency: T;
  balance: string;
  onCurrencyChange: (value: T) => void;
  actionSlot?: ReactElement | ReactNode;
  footerSlot?: ReactElement | ReactNode;
};

const WalletBalances = <T extends string>({
  availableCurrencies,
  currency,
  balance,
  onCurrencyChange,
  actionSlot,
  footerSlot,
}: Props<T>) => {
  const isCheepNotebookResolution = useMediaQuery(theme => theme.breakpoints.down(CHEEP_NOTEBOOK_RESOLUTION));
  const currencyTitle = useMemo(
    () => availableCurrencies?.find(item => item.name === currency)?.text,
    [availableCurrencies, currency]
  );

  return (
    <StyledBalance>
      <Stack className="balances">
        <Stack flexDirection={'row'} gap={{ xs: '0.5rem', md: '0.75rem' }}>
          {availableCurrencies.map(availableCurrency => (
            <CurrencyButton
              key={availableCurrency.name}
              isActive={currency === availableCurrency.name}
              handleClick={onCurrencyChange}
              name={availableCurrency.name}
              text={availableCurrency.text}
              icon={availableCurrency.icon}
            />
          ))}
        </Stack>
        <Stack
          flexDirection={{ xs: 'column', md: 'row' }}
          gap={{ xs: '0.625rem', md: '2rem' }}
          alignItems={{ md: 'center' }}
        >
          <Stack flexDirection={'row'} gap={'0.5rem'} alignItems={'flex-end'}>
            <StyledBalanceAmount variant={'h2'}>{balance}</StyledBalanceAmount>
            <Typography
              variant="body1"
              color="background.light"
              marginBottom={!isCheepNotebookResolution ? '0.3125rem' : '0.125rem'}
            >
              {currencyTitle}
            </Typography>
          </Stack>
          {actionSlot}
        </Stack>
      </Stack>
      {footerSlot}
    </StyledBalance>
  );
};

export default WalletBalances;
