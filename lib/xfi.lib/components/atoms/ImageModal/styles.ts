import { Modal } from '@mui/base';
import { alpha, styled } from '@mui/material';

export const StyledImageModal = styled(Modal, { name: 'StyledImageModal' })(({ theme }) => ({
  display: 'flex',
  position: 'fixed',
  top: 0,
  left: 0,
  justifyContent: 'center',
  alignItems: 'center',
  width: '100vw',
  height: '100vh',
  backgroundColor: alpha(theme.palette.neutrals.dark, 0.5),
  zIndex: theme.zIndex.modal,
  overflowY: 'scroll',

  '& .content': {
    position: 'relative',
    display: 'inline-block',
    margin: 'auto',
    padding: '3rem',
    boxShadow: theme.palette.shadow.primary,

    [theme.breakpoints.down('sm')]: {
      padding: '0 2rem',
    },
  },
  '& .closeButton': {
    position: 'absolute',
    top: '3rem',
    right: 0,
    cursor: 'pointer',

    [theme.breakpoints.down('sm')]: {
      top: 0,
    },

    '& svg *': {
      stroke: theme.palette.common.white,
    },
  },

  '& img': {
    maxWidth: '45rem',

    [theme.breakpoints.down('xl')]: {
      maxWidth: '40rem',
    },

    [theme.breakpoints.down(1500)]: {
      maxWidth: '35rem',
    },

    [theme.breakpoints.down(650)]: {
      maxWidth: '100%',
    },
  },
}));
