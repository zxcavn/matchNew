import { Button, styled } from '@mui/material';

export const StyledButton = styled(Button, { name: 'StyledButton' })(({ theme }) => ({
  position: 'relative',
  zIndex: 0,
  minHeight: '2rem',
  width: 'fit-content',
  padding: '0 1rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textTransform: 'none',
  borderWidth: '0',
  borderRadius: '1rem',
  overflow: 'hidden',
  transition: 'none',
  minWidth: 'auto',
  color: theme.palette.alerts.success,

  '&:disabled': {
    opacity: 0.5,
  },

  '&::before': {
    content: "''",
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    border: 'none',
    borderRadius: '1rem',
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
    padding: '2px',
    background: 'linear-gradient(108.28deg, #093F0F 6.47%, #008C0E 91.92%) round',
  },

  // opacity only for children
  '&:hover:not(:disabled)': {
    cursor: 'pointer',
    background: 'none',

    [theme.breakpoints.up('sm')]: {
      '&::before': {
        animation: 'clippath 3s infinite linear',
      },
    },
  },

  '&:active:not(:disabled)': {
    backdropFilter: 'blur(50px)',

    '&::before': {
      display: 'none',
    },

    '&::after': {
      display: 'none',
    },
  },

  '&.isFullWidth': {
    width: '100%',
  },

  '&.isLoading': {
    pointerEvents: 'none',
  },

  '.MuiTouchRipple-root': {
    display: 'none',
  },

  '@keyframes clippath': {
    '0%, 100%': {
      clipPath: 'inset(89% 0 0% 0)',
    },
    '25%': {
      clipPath: 'inset(0 0 0 89%)',
    },
    '50%': {
      clipPath: 'inset(0 0 89% 0)',
    },
    '75%': {
      clipPath: 'inset(0 89% 0 0)',
    },
  },
}));
