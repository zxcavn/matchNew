import { alpha, Box, styled } from '@mui/material';

export const TransactionCommissionContainer = styled(Box, { name: 'TransactionCommissionContainer' })(({ theme }) => ({
  padding: '1.5rem 1rem',
  gap: '1rem',
  borderRadius: '1rem',
  border: '1px solid',
  borderColor: alpha(theme.palette.common.white, 0.3),
  background: theme.palette.gradient.card,
  backdropFilter: 'blur(1rem)',

  '& .MuiDivider-root': {
    marginBlock: '1rem',
  },

  '& .commissionTitle': {
    marginBottom: '1rem',
    color: theme.palette.background.light,

    '&:first-letter': { textTransform: 'uppercase' },
  },
}));

export const ErrorMessage = styled(Box, { name: 'ButtonsContainer' })(() => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '1rem',
}));
