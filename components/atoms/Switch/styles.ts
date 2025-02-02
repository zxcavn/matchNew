import { FormControl, styled } from '@mui/material';

import { shouldForwardProp } from '@/helpers';

export const StyledSwitchContainer = styled(FormControl, { name: 'StyledSwitchContainer', shouldForwardProp })<{
  $hasIcons: boolean;
}>(({ theme, $hasIcons }) => ({
  marginLeft: '0',
  width: 'fit-content',
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  margin: '0rem',

  '& .Mui-disabled': {
    opacity: 0.5,
  },

  '& a': {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },

  '& .MuiCheckbox-root': {
    padding: 0,

    '&:not(.Mui-checked)': {
      transition: 'background 0.2s linear',

      '&.Mui-disabled': {
        '& .icon': {
          background: theme.palette.neutrals.light,
        },
      },

      '& .icon': {
        background: theme.palette.neutrals.secondaryText,
      },
    },

    '&:before': !$hasIcons && {
      content: '""',
      transform: 'translate(0.6rem, -0.85rem)',
      border: 'none',
    },

    '.imageWrapper': {
      transform: 'translate(0.6rem, -0.85rem)',
      border: 'none',
    },
  },

  '& .Mui-checked': {
    '& .icon': {
      background: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,

      '&:before': !$hasIcons && {
        borderColor: theme.palette.primary.main,
      },

      '.imageWrapper': {
        borderColor: theme.palette.primary.main,
      },
    },
  },

  '& .icon': {
    position: 'relative',
    display: 'block',
    width: '1.75rem',
    height: '0.875rem',
    borderRadius: '1.25rem',
    borderColor: 'transparent',
    transition: 'border-color 0.2s linear, background-color 0.2s linear',
    transitionProperty: theme.palette.primary.light,
    flexShrink: 0,

    '&:before': !$hasIcons && {
      content: '""',
      position: 'absolute',
      left: '0.4375rem',
      top: '0.4375rem',
      display: 'block',
      width: '0.5rem',
      height: '0.5rem',
      borderRight: 'none',
      borderTop: 'none',
      transform: 'translate(-50%, -50%) rotate(135deg)',
      transition: 'border-color 0.2s linear, transform 0.1s linear',
      borderRadius: '50%',
      backgroundColor: theme.palette.neutrals.buttonText,
    },

    '.imageWrapper': {
      position: 'absolute',
      left: '0.4375rem',
      top: '0.4375rem',
      width: '0.5rem',
      height: '0.5rem',
      borderRight: 'none',
      borderTop: 'none',
      transform: 'translate(-50%, -50%) rotate(135deg)',
      transition: 'border-color 0.2s linear, transform 0.1s linear',
      borderRadius: '50%',
      backgroundColor: theme.palette.neutrals.buttonText,
    },
  },

  '& .checkedIcon': {
    '&:before': !$hasIcons && {
      content: '""',
      transform: 'translate(0.625rem, -0.25rem)',
      border: 'none',
    },

    '.imageWrapper': {
      transform: 'translate(0.625rem, -0.25rem)',
      border: 'none',
    },
  },

  '& .MuiFormControlLabel-root': {
    margin: 0,
    gap: '0.5rem',

    '& .MuiFormControlLabel-label': {
      fontSize: '0.875rem',
      lineHeight: '135.714%',
      color: theme.palette.common.white,

      '&.Mui-disabled': {
        color: theme.palette.primary.light,
      },
    },
  },
}));
