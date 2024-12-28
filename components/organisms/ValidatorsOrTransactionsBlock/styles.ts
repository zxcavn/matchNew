import { Box, styled } from '@mui/material';

export const ValidatorsOrTransactionsWrapper = styled(Box, { name: 'ValidatorsBlockWrapper' })(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',

  [theme.breakpoints.down('md')]: {
    gap: '1rem',
  },
}));
