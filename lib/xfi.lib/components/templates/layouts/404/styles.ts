import { Stack, styled } from '@mui/material';

export const NotFoundWrapper = styled(Stack, { name: 'NotFoundWrapper' })(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.background.dark,
  height: '100vh',

  '& .backgroundAnimation': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },

  [theme.breakpoints.down('md')]: {
    backgroundSize: 'auto 70%, 100rem 70%',
  },

  '& .main': {
    display: 'flex',
    flex: '1 0 auto',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.background.light,
    padding: '0 1rem',
    zIndex: 1,
  },

  '& .contentBlock': {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '3rem',

    [theme.breakpoints.down('sm')]: {
      gap: '9rem',
    },
  },

  '& .centered': {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  '& .mainHeader': {
    fontSize: '15.625rem',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '16.875rem',

    [theme.breakpoints.down('sm')]: {
      fontSize: '8rem',
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: '8.75rem',
    },
  },

  '& .mainDescription': {
    fontSize: '4.5rem',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '108%',

    [theme.breakpoints.down('sm')]: {
      fontSize: '2.5rem',
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: '120%',
    },
  },
}));
