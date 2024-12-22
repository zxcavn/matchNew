import { Box, styled } from '@mui/material';

import { AppThemeVariant } from '@/lib/xfi.lib/theme';

export const BalanceContainer = styled(Box, { name: 'BalanceContainer' })(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  padding: '1rem',
  borderRadius: '1rem',
  border: `1px solid ${theme.palette.neutrals.border}`,
  background:
    theme.palette.mode === AppThemeVariant.dark
      ? 'linear-gradient(89deg, rgba(255, 255, 255, 0.10) 1.76%, rgba(255, 255, 255, 0.02) 72.56%), rgba(1, 5, 22, 0.10)'
      : 'transparent',

  '& .captionContainer:empty': {
    display: 'none',
  },
}));

export const Amount = styled(Box, { name: 'Amount' })({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
});
