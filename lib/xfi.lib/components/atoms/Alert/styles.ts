import { Button } from '@mui/base';
import { Alert, alpha, styled } from '@mui/material';

import { AppThemeVariant } from '../../../theme';

export const StyledActionButton = styled(Button, { name: 'StyledActionButton' })(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
}));

export const StyledAlert = styled(Alert, { name: 'StyledAlert' })(({ theme }) => ({
  ...theme.typography.subtitle2,
  position: 'relative',
  display: 'flex',
  gap: '1rem',
  borderRadius: '1rem',
  padding: '1.25rem',
  background: alpha(theme.palette.common.white, 0.1),
  backdropFilter: 'blur(1rem)',
  color: theme.palette.common.white,
  margin: 0,

  [theme.breakpoints.down('md')]: {
    width: '100%',
    borderRadius: 0,
  },

  '& .gradient': {
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: '1rem',
    width: '6.5rem',
    height: '100%',
    overflow: 'hidden',

    [theme.breakpoints.down('md')]: {
      borderRadius: 0,
    },

    '& .gradientIcon': {
      height: '100%',
      width: '6.5rem',
    },
  },

  '&.MuiAlert-filledSuccess': {
    borderLeft: `2px solid ${theme.palette.alerts.success}`,
    background: theme.palette.mode === AppThemeVariant.light && alpha(theme.palette.alerts.success, 0.15),
  },

  '&.MuiAlert-filledWarning': {
    borderLeft: `2px solid ${theme.palette.alerts.warning}`,
    background: theme.palette.mode === AppThemeVariant.light && alpha(theme.palette.alerts.warning, 0.15),
  },

  '&.MuiAlert-filledError': {
    borderLeft: `2px solid ${theme.palette.alerts.error}`,
    background: theme.palette.mode === AppThemeVariant.light && alpha(theme.palette.alerts.error, 0.15),
  },

  '&.MuiAlert-filledInfo': {
    borderLeft: `2px solid ${theme.palette.alerts.info}`,
    background: theme.palette.mode === AppThemeVariant.light && alpha(theme.palette.alerts.info, 0.15),
  },

  '& .MuiAlert-action': {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderLeft:
      theme.palette.mode === AppThemeVariant.dark
        ? `1px solid ${alpha(theme.palette.common.white, 0.2)}`
        : `1px solid ${alpha(theme.palette.neutrals.border, 0.25)}`,
    margin: 'unset',
    padding: 'unset',
    paddingLeft: '1rem',
  },

  '& .MuiAlert-icon': {
    marginRight: 'unset',
    padding: 0,
  },

  '& .MuiAlert-message': {
    maxWidth: '20rem',
    padding: 'unset',

    [theme.breakpoints.down('md')]: {
      width: '100%',
      maxWidth: 'unset',
    },
  },
}));
