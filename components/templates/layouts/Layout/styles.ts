import { styled } from '@mui/material';

const MAX_CONTAINER_WIDTH = '111.5rem';

export const StyledLayoutWrapper = styled('div', { name: 'StyledLayoutWrapper' })(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'auto minmax(0, 1fr)',
  minHeight: '100vh',
  background: theme.palette.background.dark,

  [theme.breakpoints.down('lg')]: {
    display: 'flex',
    flexDirection: 'column-reverse',
    bottom: 0,
    padding: 0,
  },

  '& .contentContainer': {
    alignItems: 'center',
    minHeight: '100%',
  },

  '& .mainBlock': {
    gap: '2rem',
    width: '100%',
    maxWidth: MAX_CONTAINER_WIDTH,
    height: '100%',

    [theme.breakpoints.down('lg')]: {
      marginRight: 0,
      padding: '0 0.9375rem',
      minHeight: 'calc(100vh - 5.5rem)',
      gap: '1.5rem',
    },

    [theme.breakpoints.down('sm')]: {
      marginRight: '0',
      padding: '0 0.9375rem',
    },
  },

  '& .children': {
    height: '100%',

    [theme.breakpoints.up('md')]: {
      paddingLeft: '2rem',
      paddingRight: '2rem',
    },
  },

  '& .layoutFooter': {
    padding: '2rem 2rem 1.5rem',

    [theme.breakpoints.down('md')]: {
      padding: '1.5rem 0',
    },
  },
}));
