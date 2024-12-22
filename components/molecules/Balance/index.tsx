import { Box, Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';

import { Icon } from '@/lib/xfi.lib/components/atoms';
import { MpxIcon, XfiIcon } from '@/lib/xfi.lib/icons';
import { useMediaQuery } from '@/lib/xfi.lib/theme';
import { CosmosCurrency } from '@/shared/types';

import { Amount, BalanceContainer } from './styles';

type BalanceProps = {
  caption?: ReactNode;
  currency: CosmosCurrency;
  amount: string;
  className?: string;
  extraSlot?: ReactNode;
};

const currencyIcon = {
  mpx: <Icon sx={{ fontSize: '2rem' }} src={MpxIcon} viewBox="0 0 32 32" />,
  xfi: <Icon sx={{ fontSize: '2rem' }} src={XfiIcon} viewBox="0 0 32 32" />,
  default: null,
};

const Balance = ({ caption, currency, amount, className, extraSlot }: BalanceProps) => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));
  const icon = currencyIcon[currency] || currencyIcon.default;

  return (
    <BalanceContainer className={className}>
      <Box display={'flex'} gap={'1rem'} justifyContent={'space-between'}>
        <Stack className="captionContainer" direction={'row'} alignItems="center" gap={'0.5rem'}>
          {isMobile && icon}
          {caption}
        </Stack>
        {extraSlot}
      </Box>

      <Amount>
        {!isMobile && icon}
        <Typography variant="h3" color="background.light" whiteSpace="nowrap" textTransform="uppercase">
          {isMobile ? (
            amount
          ) : (
            <>
              {amount}&nbsp;{currency.toUpperCase()}
            </>
          )}
        </Typography>
      </Amount>
    </BalanceContainer>
  );
};

export default Balance;
