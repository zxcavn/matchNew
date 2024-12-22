import { Stack, styled } from '@mui/material';

export const StyledProductCard = styled(Stack, { name: 'StyledProductCard' })(({ theme }) => ({
  minHeight: '29.75rem',
  background: theme.palette.gradient.card,
  border: `1.5px solid`,
  borderImage: `radial-gradient(67% 67%, transparent 90%, ${theme.palette.primary.main})`,
  borderImageSlice: 1,

  [theme.breakpoints.down('md')]: {
    minHeight: '25.125rem',
  },

  '& .iconWrapper': {
    height: '13.687rem',
    padding: '1.7rem 5.25rem',
    textAlign: 'center',

    [theme.breakpoints.down('md')]: {
      padding: '1.7rem 1.687rem',
    },
  },

  a: {
    '&:hover': {
      '& .productCardButtonText': {
        [theme.breakpoints.up('lg')]: {
          color: theme.palette.primary.main,
        },
      },
    },
  },

  '& .productCardButtonText': {
    whiteSpace: 'nowrap',

    [theme.breakpoints.down('md')]: {
      fontSize: '1rem',
    },
  },
}));
