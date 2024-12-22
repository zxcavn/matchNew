import { Stack, styled } from '@mui/material';

export const StyledDataRow = styled(Stack, { name: 'StyledDataRow' })(({ theme }) => ({
  '& .addressIconWrapper': {
    cursor: 'pointer',
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',

    '&:hover': {
      '.linkIcon': {
        display: 'block',
      },
    },
  },

  '& .linkIcon': {
    display: 'none',

    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
}));
