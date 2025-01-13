import { Select as MuiSelect, styled } from '@mui/material';

export const Select = styled(MuiSelect, { name: 'Select' })(({ theme }) => {
  return {
    ...theme.typography.body1,
    height: '2.75rem',
    cursor: 'pointer',

    '.MuiInputBase-input': {
      padding: 0,
      color: theme.palette.background.light,

      '&:focus': {
        background: 'transparent',
      },
    },

    '&.primary:not(.isError):not(.isDisabled)': {
      '&:active': {
        borderColor: theme.palette.primary.dark,
      },
      '&:hover': {
        border: '1px solid',
        borderColor: theme.palette.primary.dark,
      },
    },

    '&&.transparent': {
      padding: 0,
      border: `none`,
      background: 'transparent',
      gap: '1.5rem',
      height: 'max-content',
      overflow: 'visible',

      [theme.breakpoints.down('md')]: {
        gap: '0.5rem',
      },

      svg: {
        fontSize: '1.5rem',

        path: {
          stroke: theme.palette.background.light,
        },

        [theme.breakpoints.down('md')]: {
          fontSize: '1.25rem',
        },
      },

      '.MuiSelect-select': {
        overflow: 'visible !important',
      },

      '.MuiInputBase-input': {
        ...theme.typography.buttonText1,
        paddingRight: 0,
        minHeight: 0,
        color: theme.palette.background.light,

        [theme.breakpoints.down('md')]: {
          ...theme.typography.buttonText2,
        },
      },

      '&&.Mui-focused': {
        border: 'none',
      },
    },

    '&.isError:not(.transparent)': {
      borderColor: theme.palette.alerts.error,
    },

    '&.isDisabled': {
      '& > div': {
        WebkitTextFillColor: 'unset',
      },

      '&:not(.transparent)': {
        border: 'none',
      },

      '&.transparent': {
        color: theme.palette.primary.main,
      },
    },

    '&.MuiInput-underline': {
      '&:before': {
        content: 'unset',
      },
      '&:after': {
        content: 'unset',
      },
    },
  };
});
