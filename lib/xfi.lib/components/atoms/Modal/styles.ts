import { alpha, Stack, styled } from '@mui/material';

import { AppThemeVariant } from '../../../theme';

const scrollbarWidth = typeof window !== 'undefined' ? document.body.offsetWidth - document.body.clientWidth : 0;

export const StyledModal = styled(Stack, { name: 'StyledModal' })(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  padding: `1rem ${16 + scrollbarWidth}px 1rem 1rem`,
  justifyContent: 'center',
  alignItems: 'center',
  pointerEvents: 'none',
  width: '100vw',
  height: '100vh',
  opacity: 0,
  backgroundColor:
    theme.palette.mode === AppThemeVariant.dark
      ? alpha(theme.palette.neutrals.dark, 0.5)
      : alpha(theme.palette.neutrals.secondaryText, 0.3),
  zIndex: theme.zIndex.modal,

  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center',
    padding: '0',
    height: '100%',
    minHeight: '100svh',
  },
  '&.active': {
    opacity: 1,
    pointerEvents: 'initial',
  },

  '& .content': {
    justifyContent: 'center',
    width: '100%',
    maxWidth: '31.5625rem',
    background: theme.palette.background.dark,
    borderRadius: '1rem',
    boxShadow: theme.palette.shadow.primary,
    overflowY: 'auto',

    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      borderRadius: 0,
      maxWidth: '100vw',
      minHeight: '100%',
    },
  },
  '& .headerWrapper': {
    background: theme.palette.background.dark,
    position: 'sticky',
    borderColor: theme.palette.neutrals.dark,
    top: '0',
    zIndex: theme.zIndex.modal,
  },
  '& .header': {
    flexDirection: 'row',
    marginTop: 'env(safe-area-inset-top)',
    padding: '1.5rem',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    height: '100%',
    gap: '1rem',

    '& .modalTitle': {
      '&::first-letter': {
        textTransform: 'uppercase',
      },
    },

    [theme.breakpoints.down('sm')]: {
      alignItems: 'flex-start',
    },
  },
  '& .main': {
    background: theme.palette.background.dark,
    padding: '1.5rem',
    flexGrow: 1,
  },
  '& .footer': {
    padding: '1.5rem 0',
    marginBottom: 'env(safe-area-inset-bottom)',
  },
}));

export const StyledCloseButton = styled(Stack, { name: 'StyledCloseButton' })(() => ({
  cursor: 'pointer',
  padding: '0.5rem',
  margin: '-0.5rem',
}));
