import { Snackbar, styled } from '@mui/material';

export const StyledSnackbar = styled(Snackbar, { name: 'StyledSnackbar' })(({ theme }) => ({
  '&.MuiSnackbar-anchorOriginBottomLeft': {
    right: '2rem',
    top: '7rem',
    display: 'flex',
    left: 'auto',
    bottom: 'auto',
    position: 'fixed',
    maxWidth: '35rem',

    [theme.breakpoints.down('md')]: {
      top: '0rem',
      minWidth: '100%',
      left: '0',
      transform: 'translateX(0%)',
    },
  },

  [theme.breakpoints.down('sm')]: {
    '&.MuiSnackbar-anchorOriginTopCenter': {
      top: '0rem',
      width: '100%',
      left: '0',
      transform: 'translateX(0%)',
    },
  },
}));
