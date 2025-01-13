import {
  FormControl,
  FormHelperText,
  InputBase,
  inputBaseClasses,
  InputLabel,
  styled,
  Typography,
} from '@mui/material';

import { shouldForwardProp } from '../../../../helpers';

export const StyledFormControl = styled(FormControl, { name: 'StyledFormControl' })(() => ({
  position: 'relative',
  width: '100%',
}));

export const StyledInputLabel = styled(InputLabel, { name: 'StyledInputLabel' })(({ theme }) => ({
  position: 'absolute',
  margin: 0,
  padding: 0,
  transform: 'none',
  top: '1rem',
  left: '2rem',
  width: 'fit-content',
  ...theme.typography.body2,
  fontSize: '0.75rem',
  lineHeight: '1.06rem',

  '&&': {
    color: theme.palette.neutrals.secondaryText,
  },

  [theme.breakpoints.down('md')]: {
    left: '1rem',
  },
}));

export const StyledInput = styled(InputBase, { name: 'StyledInput', shouldForwardProp })<{
  $hasFocus?: boolean;
  $hasAction?: boolean;
  $hasCaption?: boolean;
  $hasLabel?: boolean;
  $type: 'dropdown' | 'default';
}>(({ theme, $hasFocus, $hasAction, $hasCaption, $type, $hasLabel }) => {
  const minHeight = {
    desktop: $hasAction || $hasCaption ? '7.5rem' : '5.75rem',
    mobile: ($hasAction && $hasCaption && '9.25rem') || (($hasAction || $hasCaption) && '7.5rem') || '5.25rem',
  };

  return {
    padding: ($hasLabel && $type === 'default' && '2.5rem 2rem 1.5rem') || ($hasLabel && '2rem 2rem 1.5rem') || '2rem',
    minHeight: minHeight.desktop,
    background: 'none',
    border: `1px solid ${$hasFocus ? theme.palette.primary.lighter : theme.palette.neutrals.border}`,
    borderRadius: '1rem',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.5rem',

    [`& .${inputBaseClasses.input}`]: {
      height: $type === 'default' ? '1.375rem' : '2rem',
      WebkitTextFillColor: theme.palette.background.light,
      ...($type === 'default' ? theme.typography.body1 : theme.typography.h3),

      '& > *::placeholder': {
        color: theme.palette.neutrals.secondaryText,
      },
    },

    [`&&&.${inputBaseClasses.readOnly}`]: {
      borderColor: `${theme.palette.neutrals.border}`,

      '&:hover': {
        borderColor: `${theme.palette.neutrals.border}`,
      },
    },

    [`&&&.${inputBaseClasses.error}`]: {
      borderColor: `${theme.palette.alerts.error}`,

      '&:hover': {
        borderColor: `${theme.palette.alerts.error} !important`,
      },
    },

    [theme.breakpoints.down('md')]: {
      padding: ($hasLabel && $type === 'default' && '2.5rem 1rem 1.5rem') || '2rem 1rem 1.5rem',
      minHeight: minHeight.mobile,
    },
  };
});

export const StyledHelperText = styled(FormHelperText, { name: 'StyledHelperText', shouldForwardProp })<{
  $isError?: boolean;
  $hasAction?: boolean;
  $hasCaption?: boolean;
}>(({ theme, $hasAction, $hasCaption }) => ({
  ...theme.typography.body2,
  position: 'absolute',
  bottom: '1rem',
  left: '2rem',
  right: '2rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  justifyContent: ($hasAction && $hasCaption && 'space-between') || ($hasAction && 'flex-end') || 'flex-start',

  '&': {
    padding: 0,
    margin: 0,
  },

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    left: '1rem',
    right: '1rem',
  },
}));

export const StyledCaptionContainer = styled(Typography, {
  name: 'StyledCaptionContainer',
  shouldForwardProp,
})<{ $isError?: boolean }>(({ theme, $isError }) => ({
  color: $isError ? theme.palette.alerts.error : theme.palette.neutrals.secondaryText,
}));
