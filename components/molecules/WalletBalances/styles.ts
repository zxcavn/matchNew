import { Stack, styled, Typography } from '@mui/material';

export const CHEEP_NOTEBOOK_RESOLUTION = 1366;

export const StyledBalance = styled(Stack, { name: 'StyledBalance' })(({ theme }) => ({
  '& .balances': {
    position: 'relative',
    justifyContent: 'space-between',
    gap: '3rem',

    [theme.breakpoints.down('md')]: {
      gap: '1.5rem',
    },
  },
}));

export const StyledBalanceAmount = styled(Typography, { name: 'StyledBalanceAmount' })(({ theme }) => ({
  fontSize: '3.25rem',
  fontWeight: '700',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  lineHeight: '4rem',
  color: theme.palette.background.light,

  [theme.breakpoints.down(CHEEP_NOTEBOOK_RESOLUTION)]: {
    maxHeight: 'auto',
    fontSize: '2.25rem',
    lineHeight: '2.25rem',
  },

  [theme.breakpoints.down('md')]: {
    fontSize: '2rem',
  },
}));
