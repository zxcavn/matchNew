import { Stack, styled } from '@mui/material';

export const StyledAmountSelect = styled(Stack, { name: 'StyledAmountSelect' })(({ theme }) => ({
  '& .amountInput': {
    width: '100%',
    maxWidth: '35.375rem',

    [theme.breakpoints.down('md')]: {
      maxWidth: '100%',
    },
  },

  '& .coinSelect': {
    width: '7rem',

    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
}));
