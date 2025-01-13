import { styled } from '@mui/material';

import Switch from './../inputs/Switch/Switch';

const MOBILE_ICON_SIZE = '1.25rem';
const MOBILE_VARIANT_BREAKPOINT = 1180;

export const StyledThemeToggle = styled(Switch, { name: 'StyledThemeToggle' })(({ theme }) => ({
  minWidth: '2.75rem',

  [theme.breakpoints.down(MOBILE_VARIANT_BREAKPOINT)]: {
    minWidth: MOBILE_ICON_SIZE,
  },

  '& .MuiCheckbox-root': {
    padding: 0,
  },

  '& .formControlLabel': {
    margin: 0,
  },

  '.icon': {
    height: '1.5rem',
    width: '2.75rem',

    '.imageWrapper': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '1.25rem',
      height: '1.25rem',
    },

    '.image': {
      width: '0.75rem',
      height: '0.75rem',
      [theme.breakpoints.down(MOBILE_VARIANT_BREAKPOINT)]: {
        height: MOBILE_ICON_SIZE,
        width: MOBILE_ICON_SIZE,
      },
    },
  },

  '& .MuiCheckbox-root:not(.Mui-checked) .icon': {
    background: theme.palette.neutrals.dark,

    [theme.breakpoints.down(MOBILE_VARIANT_BREAKPOINT)]: {
      height: MOBILE_ICON_SIZE,
      width: MOBILE_ICON_SIZE,
      background: 'transparent',
    },

    '.imageWrapper': {
      transform: 'translate(-0.25rem, -0.3rem)',
      backgroundColor: 'black',

      [theme.breakpoints.down(MOBILE_VARIANT_BREAKPOINT)]: {
        width: MOBILE_ICON_SIZE,
        height: MOBILE_ICON_SIZE,
        transform: 'translate(-0.4375rem, -0.4375rem)',
        background: 'transparent',
      },
    },
  },

  '& .Mui-checked .checkedIcon': {
    background: theme.palette.neutrals.dark,

    [theme.breakpoints.down(MOBILE_VARIANT_BREAKPOINT)]: {
      height: MOBILE_ICON_SIZE,
      width: MOBILE_ICON_SIZE,
      background: 'transparent',
    },

    '.imageWrapper': {
      transform: 'translate(0.85rem,  -0.3rem) rotate(10deg)',
      backgroundColor: 'white',

      [theme.breakpoints.down(MOBILE_VARIANT_BREAKPOINT)]: {
        width: MOBILE_ICON_SIZE,
        height: MOBILE_ICON_SIZE,
        transform: 'translate(-0.4375rem, -0.4375rem) rotate(10deg)',
        background: 'transparent',
      },
    },
  },

  '&.large': {
    [theme.breakpoints.up(MOBILE_VARIANT_BREAKPOINT)]: {
      minWidth: '5.0625rem',

      '.icon': {
        height: '2.75rem',
        width: '5.0625rem',

        '.imageWrapper': {
          width: '2rem',
          height: '2rem',
        },

        '.image': {
          height: MOBILE_ICON_SIZE,
          width: MOBILE_ICON_SIZE,
        },
      },

      '& .MuiCheckbox-root:not(.Mui-checked) .icon': {
        '.imageWrapper': {
          transform: 'translate(0, -0.1rem)',

          [theme.breakpoints.down(MOBILE_VARIANT_BREAKPOINT)]: {
            transform: 'translate(-0.4375rem, -0.4375rem)',
          },
        },
      },

      '& .Mui-checked .checkedIcon': {
        '.imageWrapper': {
          transform: 'translate(2.2rem,  -0.1rem) rotate(10deg)',

          [theme.breakpoints.down(MOBILE_VARIANT_BREAKPOINT)]: {
            transform: 'translate(-0.4375rem, -0.4375rem) rotate(10deg)',
          },
        },
      },
    },
  },
}));
