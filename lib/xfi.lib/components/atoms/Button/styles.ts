import { alpha, styled } from '@mui/material';
import Button from '@mui/material/Button';
import { Theme } from '@mui/material/styles';

const SECONDARY_DARK_BG_COLOR = '#010516';
const COMMON_BUTTON_TRANSITION = '0.5s';
const BORDER_RADIUS = '2rem';

const commonIconStyles = {
  zIndex: 1,
  svg: {
    '*': {
      transition: COMMON_BUTTON_TRANSITION,
    },
  },
};

const commonBeforeStyles = (theme: Theme, color: string) => ({
  content: "''",
  display: 'block',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  borderRadius: BORDER_RADIUS,
  transition: `opacity ${COMMON_BUTTON_TRANSITION} ease-in-out`,
  opacity: 0,
  zIndex: 1,
  background: `linear-gradient(0deg, ${alpha(color, 0.3)}, ${alpha(color, 0.3)}), linear-gradient(121.78deg, ${alpha(
    theme.palette.common.white,
    0.2
  )} 24.4%, ${alpha(theme.palette.common.white, 0)} 69.12%)`,
});

const commonDisabledStyles = (theme: Theme) => ({
  color: alpha(theme.palette.common.white, 0.6),
  '& .MuiButton-startIcon *, & .MuiButton-endIcon *': {
    transition: COMMON_BUTTON_TRANSITION,
    opacity: 0.6,
  },
});

const linearGradient = (angle: string, color1: string, color2: string) =>
  `linear-gradient(${angle}, ${color1}, ${color2})`;

const buttonBackground = (theme: Theme, mainColor: string, whiteOpacity: number) =>
  `${linearGradient('0deg', mainColor, mainColor)}, ${linearGradient(
    '121.78deg',
    alpha(theme.palette.common.white, whiteOpacity) + ' 24.4%',
    alpha(theme.palette.common.white, 0) + ' 69.12%'
  )}`;

export const StyledButton = styled(Button, { name: 'StyledButton' })(({ theme }) => ({
  padding: '0rem 1rem 0.25rem 1rem',
  display: 'inline-flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: 'fit-content',
  textTransform: 'none',
  textAlign: 'center',
  borderRadius: BORDER_RADIUS,
  outline: `1px solid ${alpha(theme.palette.common.white, 0.3)}`,
  transition: COMMON_BUTTON_TRANSITION,

  '& .MuiButton-startIcon, .MuiButton-endIcon': commonIconStyles,

  '& .MuiButton-endIcon': {
    marginLeft: '0.25rem',
    marginRight: 0,
  },

  '&:hover:not(:disabled)': {
    cursor: 'pointer',
  },

  '&.isFullWidth': {
    width: '100%',
  },

  '&.primary_dark, &.primary_light': {
    color: theme.palette.common.white,
    background: buttonBackground(theme, theme.palette.primary.main, 0.1),

    '& div': {
      zIndex: 2,
    },

    '&::before': commonBeforeStyles(theme, theme.palette.primary.light),

    '&:disabled': {
      color: alpha(theme.palette.common.white, 0.4),
      background: buttonBackground(theme, theme.palette.primary.dark, 0.1),

      '& .MuiButton-startIcon *, & .MuiButton-endIcon *': {
        transition: COMMON_BUTTON_TRANSITION,
        opacity: 0.4,
      },
    },

    '&:active': {
      background: buttonBackground(theme, theme.palette.primary.lighter!, 0.1),
      outline: `1px solid ${alpha(theme.palette.common.white, 0.5)}`,
    },

    '&:hover:not(:disabled)': {
      outline: `1px solid ${theme.palette.common.white}`,
      '&::before': {
        opacity: 1,
      },
    },
  },

  '&.secondary_dark': {
    color: theme.palette.common.white,
    background: buttonBackground(theme, alpha(SECONDARY_DARK_BG_COLOR, 0.05), 0.2),

    '& div': {
      zIndex: 2,
    },

    '&::before': commonBeforeStyles(theme, SECONDARY_DARK_BG_COLOR),

    '&:disabled': commonDisabledStyles(theme),

    '&:active': {
      background: buttonBackground(theme, alpha(SECONDARY_DARK_BG_COLOR, 0.5), 0.2),
      outline: `1px solid ${alpha(theme.palette.common.white, 0.5)}`,
    },

    '&:hover:not(:disabled)': {
      outline: `1px solid ${theme.palette.common.white}`,
      '&::before': {
        opacity: 1,
      },
    },
  },

  '&.secondary_light': {
    color: theme.palette.primary.main,
    background: buttonBackground(theme, alpha(theme.palette.primary.main, 0.08), 0.1),
    outline: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,

    '& div': {
      zIndex: 2,
    },

    '&::before': commonBeforeStyles(theme, theme.palette.primary.main),

    '&:disabled': {
      background: buttonBackground(theme, alpha(theme.palette.primary.main, 0.08), 0.1),
      outlineColor: alpha(theme.palette.primary.main, 0.3),
      '& .MuiButton-startIcon *, & .MuiButton-endIcon *': {
        opacity: 0.6,
      },
    },

    '&:active': {
      background: buttonBackground(theme, alpha(theme.palette.primary.main, 0.25), 0.1),
      outline: `1px solid ${alpha(theme.palette.primary.main, 0.7)}`,
    },

    '&:hover:not(:disabled)': {
      outline: `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,
      '&::before': {
        opacity: 1,
      },
    },
  },

  '&.transparent_dark, &.transparent_light': {
    color: theme.palette.primary.main,
    background: 'transparent',
    outline: 'none',

    '&:disabled': {
      '& .MuiButton-startIcon *, & .MuiButton-endIcon *': {
        transition: COMMON_BUTTON_TRANSITION,
        opacity: 0.6,
      },
    },

    '&:active': {
      color: theme.palette.primary.lighter,
    },

    '&:hover:not(:disabled)': {
      color: theme.palette.primary.light,
    },
  },

  '&.transparent_dark': {
    '&:disabled': {
      color: theme.palette.primary.dark,
    },
  },

  '&.transparent_light': {
    '&:disabled': {
      color: theme.palette.primary.main,
      opacity: 0.5,
    },
  },

  '&.largeIcon': {
    padding: '0.75rem',
    width: '2.75rem',
    minWidth: 'auto',
    height: '2.75rem',
    borderRadius: BORDER_RADIUS,
    '& .buttonChildren svg': {
      width: '1.25rem',
      height: '1.25rem',
    },
  },

  '&.mediumIcon': {
    padding: '0.5rem',
    width: '2rem',
    minWidth: 'auto',
    height: '2rem',
    borderRadius: '50%',
    '& .buttonChildren svg': {
      width: '1rem',
      height: '1rem',
    },
  },

  '&.smallIcon': {
    padding: '0.375rem',
    width: '1.5rem',
    minWidth: 'auto',
    height: '1.5rem',
    borderRadius: BORDER_RADIUS,
    '& .buttonChildren svg': {
      width: '0.75rem',
      height: '0.75rem',
    },
  },

  '&.large': {
    ...theme.typography.buttonText1,
    padding: '0.5rem 1rem 0.75rem',
    '& svg': {
      width: '1.25rem',
      height: '1.25rem',
    },
  },

  '&.medium': {
    ...theme.typography.buttonText2,
    padding: '0.25rem 1rem 0.375rem',
    '& svg': {
      width: '1rem',
      height: '1rem',
    },
  },

  '&.small': {
    ...theme.typography.buttonText3,
    padding: '0.0938rem 0.5rem 0.2188rem',
    '& svg': {
      width: '0.75rem',
      height: '0.75rem',
    },
  },

  '& .loaderWrapper': {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
  },

  '& .buttonChildren': {
    display: 'flex',
    alignItems: 'center',
  },

  '&.isLoading': {
    '& .MuiButton-startIcon, .MuiButton-endIcon': {
      opacity: 0,
    },
  },

  '&&& .transparent': {
    opacity: 0,
  },
}));
