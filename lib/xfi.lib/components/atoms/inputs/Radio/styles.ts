import { FormControlLabel, styled } from '@mui/material';

export const StyledRadioContainer = styled(FormControlLabel, { name: 'StyledRadioContainer' })(({ theme }) => ({
  '&.MuiFormControlLabel-root': {
    width: 'fit-content',
    margin: 0,
    gap: '0.5rem',

    '& .MuiFormControlLabel-label': {
      '&.Mui-disabled': {
        color: theme.palette.neutrals.light,
        pointerEvents: 'none',
      },
    },
  },

  '&:not(.Mui-disabled):hover': {
    '& .icon:not(.checkedIcon)': {
      '&.icon': {
        borderColor: theme.palette.primary.main,
      },
    },
  },

  '& .MuiFormControlLabel-label': {
    ...theme.typography.body2,

    color: theme.palette.background.light,
  },

  '& .MuiRadio-root': {
    padding: '0.5rem',
    margin: '-0.5rem',

    '&:hover': {
      backgroundColor: 'transparent',

      '& .icon': {
        borderColor: theme.palette.primary.main,
      },
    },
  },

  '& .icon': {
    width: '1.25rem',
    height: '1.25rem',
    border: `1px solid ${theme.palette.neutrals.main}`,
    borderRadius: '50%',
    position: 'relative',
    transition: 'background-color 0.2s linear, border-color 0.2s linear',

    '&:before': {
      content: '""',
      width: '0.5rem',
      height: '0.5rem',
      borderRadius: '50%',
      backgroundColor: 'transparent',
      display: 'block',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      transition: 'background-color 0.2s linear, color 0.2s linear',
    },
  },

  '& .checkedIcon': {
    '&.icon': {
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,

      '&:before': {
        backgroundColor: theme.palette.common.white,
      },
    },
  },

  '&.Mui-disabled': {
    '&.MuiFormControlLabel-root': {
      '& .icon': {
        borderColor: theme.palette.neutrals.border,
      },

      '& .MuiBox-root': {
        '&.checkedIcon': {
          '&.icon': {
            borderColor: theme.palette.primary.dark,
            backgroundColor: theme.palette.primary.dark,

            '&:before': {
              backgroundColor: theme.palette.neutrals.border,
            },
          },
        },
      },
    },
  },
}));
