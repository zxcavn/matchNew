import { alpha, Components, Theme } from '@mui/material';

const getComponentsSettings = (theme: Theme): Components => ({
  MuiTypography: {
    defaultProps: {
      variantMapping: {
        h1_infynyte: 'h1',
        h2_infynyte: 'h2',
        h3_infynyte: 'h3',
        h4_infynyte: 'h4',
      },
    },
    styleOverrides: {
      h1: {
        [theme.breakpoints.down('lg')]: {
          fontSize: '2rem',
          lineHeight: '125%',
        },
      },
      h2: {
        [theme.breakpoints.down('lg')]: {
          fontSize: '1.5rem',
          lineHeight: '133.333%',
        },
      },
      h3: {
        [theme.breakpoints.down('lg')]: {
          fontSize: '1.25rem',
          lineHeight: '120%',
        },
      },
      h4: {
        [theme.breakpoints.down('lg')]: {
          fontSize: '1.125rem',
          lineHeight: '122.222%',
        },
      },
      subtitle1: {
        [theme.breakpoints.down('lg')]: {
          fontSize: '1rem',
          fontWeight: 700,
          lineHeight: '137.5%',
        },
      },
      subtitle2: {
        [theme.breakpoints.down('lg')]: {
          fontSize: '0.875rem',
          fontWeight: 700,
          lineHeight: '135.714%',
        },
      },
      body1: {
        [theme.breakpoints.down('lg')]: {
          fontSize: '1rem',
          fontWeight: 400,
          lineHeight: '137.5%',
        },
      },
      body2: {
        [theme.breakpoints.down('lg')]: {
          fontSize: '0.875rem',
          fontWeight: 400,
          lineHeight: '135.714%',
        },
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: {
        borderBottom: 'none',
      },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        ...theme.typography.body1,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '2.25rem',
        padding: '0 0.5rem',
        color: theme.palette.common.white,
        background: theme.palette.neutrals.main,
        borderRadius: '1.25rem',
      },
      arrow: {
        display: 'none',
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        width: '100%',
        ':not(.isEditable)': {
          '&& .MuiInputBase-root': {
            background: 'none',
            WebkitTextFillColor: theme.palette.neutrals.border,
          },
        },
        '&.isError': {
          border: '1px solid',
          borderRadius: '1.5rem',
          borderColor: theme.palette.alerts.error,

          '& .MuiInputBase-root:not(&.Mui-focused):not(&.isDisabled):not(&.isError):not(&.Mui-readOnly)': {
            border: 'none',
          },

          '& > *::placeholder': {
            color: theme.palette.neutrals.light,
          },
        },
      },
    },
  },

  MuiDivider: {
    styleOverrides: {
      root: {
        borderColor: alpha(theme.palette.common.white, 0.3),
        borderWidth: '1px',
      },
    },
  },

  MuiFormLabel: {
    styleOverrides: {
      root: {
        margin: 0,
        marginTop: '1rem',
        padding: '0 1rem 0.25rem',
        fontSize: '0.75rem',
        transform: 'none',
        color: theme.palette.primary.dark,

        '&.Mui-disabled': {
          color: theme.palette.primary.lighter,
        },

        '&.Mui-error': {
          color: theme.palette.primary.light,
        },

        '&.Mui-focused': {
          color: theme.palette.primary.light,
        },
      },

      asterisk: {
        color: theme.palette.error.main,
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      outlined: {
        '&$shrink': {
          transform: 'none',
        },
      },
      formControl: {
        position: 'static',
      },
    },
  },
  MuiFormControlLabel: {
    styleOverrides: {
      label: {
        fontSize: '0.75rem',
        color: theme.palette.primary.dark,

        '&.Mui-disabled': {
          color: theme.palette.primary.lighter,
        },
      },
    },
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: {
        fontSize: '0.75rem',
        marginLeft: '1rem',
        marginRight: '1rem',
        marginTop: '0.25rem',
      },
    },
  },

  MuiLink: {
    styleOverrides: {
      underlineHover: {
        '&:hover': {
          textDecoration: 'none',
        },
      },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        ...theme.typography.body1,

        cursor: 'pointer',
        transition: 'background 0.5s',
        width: '100%',
        padding: '0.75rem',
        borderRadius: '1rem',
        color: theme.palette.background.light,

        '&:hover': {
          background: theme.palette.neutrals.bg,
        },

        '&:disabled': {
          background: theme.palette.neutrals.light,
          color: theme.palette.neutrals.secondaryText,
        },
      },
    },
    defaultProps: {
      disableRipple: true,
      disableTouchRipple: true,
    },
  },
  MuiList: {
    styleOverrides: {
      root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '0.5rem',
        gap: '0.625rem',
        boxShadow: theme.palette.shadow.primary,
        overflow: 'auto',
        maxHeight: '25rem',

        '&&& .Mui-selected': {
          background: theme.palette.neutrals.select,
        },
      },
    },
  },

  MuiPaper: {
    styleOverrides: {
      root: {
        background: theme.palette.neutrals.dark,
        marginTop: '0.25rem',
        borderRadius: '1.5rem',
        boxShadow: theme.palette.shadow.primary,
      },
    },
  },
  MuiCircularProgress: {
    styleOverrides: {
      root: { color: theme.palette.common.white },
    },
  },
  MuiInput: {
    styleOverrides: {
      root: {
        ...theme.typography.body1,
        padding: '0.5rem 1rem',
        height: '2.75rem',
        border: `1px solid ${theme.palette.neutrals.dark}`,
        background: theme.palette.neutrals.dark,
        borderRadius: '1.5rem',
        color: theme.palette.background.light,
        WebkitTextFillColor: theme.palette.background.light,
        backdropFilter: 'blur(1rem)',
        transition: 'border 0.5s',

        '&.Mui-readOnly': {
          border: `1px solid ${theme.palette.neutrals.border}`,
          background: 'none',
        },

        '&:active:not(&.isDisabled):not(&.isError):not(&.Mui-readOnly)': {
          borderColor: theme.palette.primary.lighter,
        },

        '&:focused:not(&.isDisabled):not(&.isError):not(&.Mui-readOnly)': {
          borderColor: theme.palette.primary.lighter,
        },

        '& > *::placeholder': {
          color: theme.palette.neutrals.secondaryText,
          height: '2rem',
        },
      },
    },
  },

  MuiInputBase: {
    styleOverrides: {
      root: {
        ...theme.typography.body1,

        overflow: 'hidden',
        padding: '0.5rem 1rem',
        backgroundColor: theme.palette.neutrals.dark,
        borderRadius: '1.5rem',
        border: '1px solid transparent',
        color: theme.palette.common.white,
        backdropFilter: 'blur(1rem)',
        transition: 'border 0.5s',

        '&:hover:not(&.Mui-focused):not(&.isDisabled):not(&.isError):not(&.Mui-readOnly):not(&.Mui-disabled)': {
          borderColor: theme.palette.neutrals.border,
        },

        '&.Mui-focused:not(&.isError):not(&.Mui-readOnly)': {
          border: '1px solid',
          borderColor: theme.palette.primary.lighter,
        },

        '&.isError': {
          borderColor: theme.palette.alerts.error,

          '& > *::placeholder': {
            color: theme.palette.neutrals.light,
          },
        },

        fieldset: {
          display: 'none',
        },
      },

      input: {
        height: 'initial',
        padding: 0,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        color: theme.palette.background.light,

        '&:-webkit-autofill, &:-internal-autofill-selected, &:-internal-autofill-previewed': {
          WebkitTextFillColor: theme.palette.background.light,
          WebkitBackgroundClip: 'text',
          transition: 'background-color 5000s ease-in-out 0s',
          boxShadow: `inset 0 0 20px 20px ${theme.palette.neutrals.dark}`,
        },
      },
    },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        maxHeight: '2.75rem',
        gap: '0.75rem',
        borderRadius: '1.5rem',

        '&.Mui-disabled, &.Mui-readOnly': {
          border: '1px solid',
          borderColor: theme.palette.neutrals.light,

          '&  input': {
            WebkitTextFillColor: theme.palette.neutrals.secondaryText,
          },
        },

        '&.Mui-disabled': {
          background: theme.palette.neutrals.light,
        },
      },
      input: {
        minHeight: '1.625rem',

        '&:-webkit-autofill, &:-internal-autofill-selected, &:-internal-autofill-previewed': {
          WebkitTextFillColor: theme.palette.background.light,
          WebkitBackgroundClip: 'text',
          transition: 'background-color 5000s ease-in-out 0s',
          boxShadow: `inset 0 0 20px 20px ${theme.palette.neutrals.dark}`,
        },
      },
      multiline: {
        padding: '0.5rem 1rem',
        maxHeight: 'fit-content',
      },
    },
  },

  MuiAutocomplete: {
    styleOverrides: {
      root: {
        '&& .MuiAutocomplete-input': {
          padding: '0 0.5rem',

          '&:-webkit-autofill, &:-internal-autofill-selected, &:-internal-autofill-previewed': {
            WebkitTextFillColor: theme.palette.background.light,
            WebkitBackgroundClip: 'text',
            transition: 'background-color 5000s ease-in-out 0s',
            boxShadow: `inset 0 0 20px 20px ${theme.palette.neutrals.dark}`,
          },
        },

        '.MuiAutocomplete-option': {
          '&:hover:not(&.isDisabled):not(&.isError):not(&.Mui-readOnly)': {
            borderColor: alpha(theme.palette.common.white, 0.3),
          },
        },
      },
      popupIndicator: {
        position: 'absolute',
        top: 'calc(100% + 0.25rem)',
        right: '0.5rem',
        '&:hover': {
          background: 'transparent',
        },
      },

      listbox: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0.5rem',
        gap: '0.625rem',
        background: theme.palette.neutrals.dark,
        borderRadius: '1.5rem',
        boxShadow: theme.palette.shadow.primary,
        overflow: 'auto',
        maxHeight: '25rem',
        color: theme.palette.background.light,

        '.MuiAutocomplete-option': {
          ...theme.typography.body1,

          cursor: 'pointer',
          transition: 'background 0.5s',
          width: '100%',
          minHeight: '2.75rem',
          padding: '0.75rem',
          borderRadius: '1rem',
          color: theme.palette.background.light,

          '&.Mui-focused': {
            backgroundColor: theme.palette.neutrals.select,
          },
          '&.Mui-selected': {
            background: theme.palette.neutrals.select,
          },
          '&:hover': {
            background: theme.palette.neutrals.bg,
          },

          '&:active': {
            background: theme.palette.neutrals.select,
          },
          '&[aria-selected="true"]': {
            backgroundColor: theme.palette.neutrals.select,
          },
          '&.Mui-focused[aria-selected="true"]': {
            backgroundColor: theme.palette.neutrals.select,
          },
          '&:disabled': {
            background: theme.palette.neutrals.dark,
            color: theme.palette.neutrals.dark,
          },
        },
      },

      paper: {
        boxShadow: 'none',
      },

      popper: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '1.5rem',
        marginTop: '0.25rem!important',
        marginBottom: '1.75rem!important',
        minWidth: '23rem',
        paddingRight: 0,
        gap: '0.25rem',
        background: theme.palette.neutrals.dark,
        boxShadow: theme.palette.shadow.primary,
        transform: 'translateY(1.5rem)',
        scrollbarColor: 'black transparent',
      },
    },
  },
});

export default getComponentsSettings;
