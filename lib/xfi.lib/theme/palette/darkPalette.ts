import { alpha, PaletteOptions } from '@mui/material';

import { commonPalette } from './commonPalette';

const darkPalette: PaletteOptions = {
  mode: 'dark',
  ...commonPalette,
  secondary: {
    light: '#FCE1E5',
    dark: '#66ffac', // UI KIT reverse
    main: '#97FFC7', // UI KIT default
  },
  neutrals: {
    light: '#5A5D68', // UI KIT disabled
    main: '#464955', // UI KIT general
    dark: '#272B39', // UI KIT input
    border: alpha('#A19C9C', 0.25), // UI KIT border
    secondaryText: '#8D8F96', // UI KIT secondaryText
    bg: '#1F2332', // UI KIT bg
    label: '#C7C7D2', // UI KIT label
    link: '#85FFBD',
    toast: '#F1F3F81A',
    select: '#464955',
    buttonText: '#FFFFFF',
    tableLine: '#FFFFFF0D',
    sidebar: '#0A0E19',
  },
  alerts: {
    success: '#49CC50',
    error: '#FF2A02',
    warning: '#FF720C',
    info: '#0C50FF',
  },
  background: {
    light: '#EEEEEE',
    dark: '#00040F',
  },
  badges: {
    send: { background: alpha('#509A36', 0.4), color: '#EEEEEE' },
    sendIn: { background: alpha('#369A82', 0.4), color: '#EEEEEE' },
    sendOut: { background: alpha('#509A36', 0.4), color: '#EEEEEE' },
    bond: { background: alpha('#989A36', 0.4), color: '#EEEEEE' },
    unbond: { background: alpha('#9A6636', 0.4), color: '#EEEEEE' },
    claim: { background: alpha('#36769A', 0.4), color: '#EEEEEE' },
    receive: { background: alpha('#38369A', 0.4), color: '#EEEEEE' },
    rebond: { background: alpha('#6E369A', 0.4), color: '#EEEEEE' },
    fail: { background: alpha('#9A363C', 0.4), color: '#EEEEEE' },
    multisend: { background: alpha('#36529A', 0.4), color: '#EEEEEE' },
    other: { background: alpha('#485769', 0.4), color: '#EEEEEE' },
    active: { background: alpha('#369A82', 0.4), color: '#EEEEEE' },
    ready: { background: alpha('#989A36', 0.4), color: '#EEEEEE' },
    jailed: { background: alpha('#9A363C', 0.4), color: '#EEEEEE' },
    evm: { background: alpha('#BED6E7', 0.4), color: '#EEEEEE' },
    contractCall: { background: alpha('#97FFC7', 0.4), color: '#EEEEEE' },
    createValidator: { background: alpha('#B453C3', 0.4), color: '#EEEEEE' },
    unjail: { background: alpha('#989A36', 0.4), color: '#EEEEEE' },
    submitProposal: { background: alpha('#38369A', 0.4), color: '#EEEEEE' },
  },
  gradient: {
    card: 'linear-gradient(122deg, rgba(255, 255, 255, 0.10) 24.4%, rgba(255, 255, 255, 0.00) 69.12%), rgba(1, 5, 22, 0.05)',
    cardBlue:
      'linear-gradient(127.18deg, rgba(12, 194, 255, 0.32) 22.25%, rgba(12, 194, 255, 0.17) 48.05%, rgba(12, 194, 255, 0) 68.99%)',
    cardBlack: 'linear-gradient(121.78deg, rgba(255, 255, 255, 0.1) 24.4%, rgba(255, 255, 255, 0) 69.12%)',
    sidebar:
      'linear-gradient(179deg, rgba(21, 25, 41, 0.80) -0.81%, rgba(27, 41, 62, 0.80) 37.63%, rgba(21, 25, 41, 0.80) 68.38%, rgba(21, 25, 41, 0.80) 100.79%)',
    mobileSidebar:
      'linear-gradient(145deg, rgb(21, 25, 41) 100%, rgb(27, 41, 62) 89%, rgb(21, 25, 41) 100%, rgb(21, 25, 41) 100%)',
    menuItemActive: 'linear-gradient(270deg, rgba(13, 184, 242, 0.35) 0%, rgba(13, 184, 242, 0) 100%)',
  },
  shadow: {
    primary: '0px 4px 4px 0px #00000040',
  },
};

export default darkPalette;
