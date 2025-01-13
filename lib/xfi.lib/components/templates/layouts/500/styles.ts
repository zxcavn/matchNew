import { Stack, styled } from '@mui/material';

export const SomethingTechnicallyWrongWrapper = styled(Stack, { name: 'SomethingTechnicallyWrongWrapper' })(
  ({ theme }) => ({
    width: '100%',
    backgroundColor: theme.palette.background.dark,
    height: '100vh',

    '& .backgroundWrapper': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    },

    '& .background': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundSize: 'cover',

      [theme.breakpoints.down('sm')]: {
        width: '100rem',
        maxInlineSize: '100rem',
      },
    },

    '& .backgroundIcon': {
      position: 'absolute',
      top: 0,
      right: 0,
      maxWidth: '45.9375rem',
      height: 'auto',
      backgroundSize: 'cover',

      [theme.breakpoints.down('md')]: {
        maxWidth: '70%',
      },

      [theme.breakpoints.down('sm')]: {
        top: '-5rem',
        right: '-13rem',
        maxWidth: '30rem',
      },
    },

    [theme.breakpoints.down('md')]: {
      backgroundSize: 'auto 70%, 100rem 70%',
    },

    '& .main': {
      display: 'flex',
      flex: '0.8 0 auto',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.palette.background.light,
      padding: '0 1rem',
      zIndex: 1,

      [theme.breakpoints.down('md')]: {
        flex: '0.7 0 auto',
      },
    },

    '& .contentBlock': {
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
    },

    '& .centered': {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },

    '& .mainHeader': {
      fontSize: '4.5rem',
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: '4.875rem',
      textAlign: 'center',

      [theme.breakpoints.down('sm')]: {
        fontSize: '2.5rem',
        lineHeight: '3rem',
      },
    },

    '& .mainDescription': {
      fontSize: '1.5rem',
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: '1.875rem',
      textAlign: 'center',

      [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
        lineHeight: '1.375rem',
        textAlign: 'left',
      },
    },
  })
);
