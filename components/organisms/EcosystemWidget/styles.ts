import { Stack, styled } from '@mui/material';

const CUSTOM_BREAKPOINT = 1600;

export const StyledEcosystemPage = styled(Stack, { name: 'StyledEcosystemPage' })(({ theme }) => ({
  paddingBottom: '4.5rem',
  gap: '4rem',

  [theme.breakpoints.down('md')]: {
    paddingBottom: 0,
    gap: '2rem',
  },

  '& .productsBlock': {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '1.5rem',

    [theme.breakpoints.down(CUSTOM_BREAKPOINT)]: {
      gridTemplateColumns: '1fr 1fr',
    },

    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr ',
    },
  },

  '& .explorersBlock': {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '1.5rem',

    [theme.breakpoints.down(CUSTOM_BREAKPOINT)]: {
      gridTemplateColumns: '1fr 1fr',
    },

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr ',
    },
  },
  '& .walletsBlock': {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '1.5rem',

    [theme.breakpoints.down(CUSTOM_BREAKPOINT)]: {
      gridTemplateColumns: '1fr 1fr',
    },

    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr ',
    },
  },

  '& .validatorsSection': {
    scrollMarginTop: '82px',
  },

  '& .validatorsBlock': {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
    gap: '1.5rem',

    [theme.breakpoints.down(CUSTOM_BREAKPOINT)]: {
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
    },

    [theme.breakpoints.down('lg')]: {
      gridTemplateColumns: '1fr 1fr 1fr',
    },

    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr 1fr',
      gap: '1rem',
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
}));
