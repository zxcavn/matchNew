import { type PaletteOptions } from '@mui/material';

export const commonPalette: Pick<PaletteOptions, 'common' | 'primary' | 'gradientBadge'> = {
  common: {
    white: '#ffffff',
    black: '#1D1C22',
    lightGray: '#F7F8FB',
    gray: '#E4E8EE',
  },
  primary: {
    lighter: '#66d9ff', // UI KIT focus
    light: '#38cdff', // UI KIT hover
    main: '#0AA5D9', // UI KIT default
    dark: '#076f91', // UI KIT disabled
  },
  gradientBadge: {
    lightBlue: {
      background: 'linear-gradient(82.26deg, #5E77DE -9.97%, #BAE1FE 51.95%, #5374E2 103.44%)',
      color: '#000000',
    },
    turquoise: {
      background: 'linear-gradient(85.52deg, #00B8DD -11.6%, #B2D9F6 47.69%, #00B8DD 105.91%)',
      color: '#000000',
    },
    purple: {
      background: 'linear-gradient(82.26deg, #8F5EDE -9.97%, #DECBFC 51.95%, #8F5EDE 103.44%)',
      color: '#000000',
    },
    orange: {
      background: 'linear-gradient(82.26deg, #FF8A00 -9.97%, #FFDAAF 51.95%, #FF8A00 103.44%)',
      color: '#000000',
    },
    lightGreen: {
      background: 'linear-gradient(82.26deg, #36C48C -9.97%, #A1DDC5 51.95%, #36C48C 103.44%)',
      color: '#000000',
    },
    pink: {
      background: 'linear-gradient(82.26deg, #FF2EB8 -9.97%, #FFBEE9 51.95%, #FF2EB8 103.44%)',
      color: '#000000',
    },
    mintGreen: {
      background: 'linear-gradient(82.26deg, #29D1C3 -9.97%, #C5FFFA 51.95%, #29D1C3 103.44%)',
      color: '#000000',
    },
  },
};
