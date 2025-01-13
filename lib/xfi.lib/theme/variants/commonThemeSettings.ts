import { ThemeOptions } from '@mui/material';

const commonThemeSettings: ThemeOptions = {
  // direction: "rtl",
  typography: {
    fontFamily: ['Rale Grotesk Base', 'sans-serif'].join(','),
    h1: {
      fontSize: '3rem',
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: '100%',
    },
    h2: {
      fontSize: '2rem',
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: '112.5%',
    },
    h3: {
      fontSize: '1.5rem',
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: '125%',
    },
    h4: {
      fontSize: '1.25rem',
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: '120%',
    },
    h1_infynyte: {
      fontFamily: 'Infynyte',
      fontSize: '2.25rem',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: '115%',
    },
    h2_infynyte: {
      fontFamily: 'Infynyte',
      fontSize: '2rem',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: '115%',
    },
    h3_infynyte: {
      fontFamily: 'Infynyte',
      fontSize: '1.5rem',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: '115%',
    },
    h4_infynyte: {
      fontFamily: 'Infynyte',
      fontSize: '1.25rem',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: '115%',
    },
    subtitle1: {
      fontSize: '1rem',
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: '137.5%',
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: '135.714%',
    },
    body1: {
      fontSize: '1rem',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '137.5%',
    },
    body2: {
      fontSize: '0.875rem',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '135.714%',
    },
    link: {
      fontSize: '0.875rem',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '135.714%',
    },
    buttonText1: {
      fontSize: '1.5rem',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '1.5rem',
    },
    buttonText2: {
      fontSize: '1rem',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '1.375rem',
    },
    buttonText3: {
      fontSize: '0.875rem',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '1.1875rem',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1180,
      xl: 1920,
    },
  },

  /**
   * @see https://material-ui.com/customization/globals/#default-props
   */
  props: {
    // Name of the component ⚛️
    MuiButtonBase: {
      // The properties to apply
      disableRipple: true, // No more ripple, on the whole application 💣!
    },

    // Set default elevation to 1 for popovers.
    MuiPopover: {
      elevation: 1,
    },
  },
};

export default commonThemeSettings;
