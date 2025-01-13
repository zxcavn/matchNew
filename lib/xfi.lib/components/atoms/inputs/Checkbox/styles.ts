import { FormControl, styled } from '@mui/material';

export const StyledCheckboxContainer = styled(FormControl, { name: 'StyledCheckboxContainer' })(({ theme }) => ({
  position: 'relative',
  marginLeft: '0',
  width: 'fit-content',
  display: 'flex',
  gap: '0.5rem',

  '&:hover': {
    '& .MuiCheckbox-root:not(.Mui-checked):not(.Mui-disabled)': {
      '& .icon': {
        [theme.breakpoints.up('md')]: {
          borderColor: theme.palette.primary.main,
        },
      },
    },
  },

  '& .Mui-disabled': {
    '& .icon': {
      borderColor: theme.palette.neutrals.border,
    },
  },

  '& .MuiCheckbox-root': {
    padding: 0,
  },

  '& .Mui-checked': {
    '& .icon': {
      background: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,

      '&.check:before': {
        borderColor: theme.palette.neutrals.buttonText,
      },

      '&.minus:before': {
        borderColor: theme.palette.neutrals.buttonText,
      },
    },

    '&.Mui-disabled': {
      '& .icon': {
        borderColor: theme.palette.primary.dark,
        background: theme.palette.primary.dark,

        '&.check:before': {
          borderColor: theme.palette.neutrals.border,
        },

        '&.minus:before': {
          borderColor: theme.palette.neutrals.border,
        },
      },
    },
  },

  '& .icon': {
    borderRadius: '0.375rem',
    width: '1.25rem',
    height: '1.25rem',
    border: `1px solid ${theme.palette.neutrals.main}`,
    position: 'relative',
    display: 'block',
    transition: 'border-color 0.2s linear, background-color 0.2s linear',
    flexShrink: 0,

    '&.check:before': {
      display: 'block',
      width: '0.6rem',
      height: '0.3rem',
      content: '""',
      position: 'absolute',
      top: 'calc(50% - 1px)',
      left: 'calc(50% + 1px)',
      borderRight: '0.14rem solid transparent',
      borderTop: '0.14rem solid transparent',
      transform: 'translate(-50%, -50%) rotate(135deg)',
      transition: 'border-color 0.2s linear, transform 0.1s linear',
    },

    '&.minus:before': {
      display: 'block',
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '0.625rem',
      borderTop: '0.14rem solid transparent',
      transform: 'translate(-50%, -50%)',
      transition: 'border-color 0.2s linear, transform 0.1s linear',
    },
  },

  '& .MuiFormControlLabel-root': {
    ...theme.typography.body2,
    color: theme.palette.common.white,
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',

    '& .MuiFormControlLabel-label': {
      '&.Mui-disabled': {
        color: theme.palette.neutrals.light,
      },
    },
  },

  '& .formHelperText': {
    position: 'absolute',
    margin: 0,
    bottom: '-1rem',
  },
}));
