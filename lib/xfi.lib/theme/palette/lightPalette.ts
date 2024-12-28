import { alpha, PaletteOptions } from '@mui/material';

import { commonPalette } from './commonPalette';

const lightPalette: PaletteOptions = {
  mode: 'light',
  ...commonPalette,
  secondary: {
    light: '#FCE1E5',
    dark: '#66ffac', // UI KIT reverse
    main: '#004471', // UI KIT default
  },
  neutrals: {
    light: '#E2E2E3', // UI KIT disabled
    main: '#00040F', // UI KIT general
    dark: '#EDEDEE', // UI KIT input
    border: alpha('#A19C9C', 0.25), // UI KIT border
    secondaryText: '#8D8F96', // UI KIT secondaryText
    bg: '#E7E7E8', // UI KIT bg
    label: '#CBC6C6', // UI KIT label
    link: '#004471',
    toast: '#FFFFFF',
    select: '#DEDEDF',
    buttonText: '#FFFFFF',
    tableLine: '#F9F9F9B2',
    sidebar: '#FFFFFF',
  },
  alerts: {
    success: '#49CC50',
    error: '#FF2A02',
    warning: '#FF720C',
    info: '#0C50FF',
  },
  background: {
    light: '#00040F',
    dark: '#F5F5F6',
  },
  badges: {
    send: { background: alpha('#509A36', 0.4), color: '#00040F' },
    sendIn: { background: alpha('#369A82', 0.4), color: '#00040F' },
    sendOut: { background: alpha('#509A36', 0.4), color: '#00040F' },
    bond: { background: alpha('#989A36', 0.4), color: '#00040F' },
    unbond: { background: alpha('#9A6636', 0.4), color: '#00040F' },
    claim: { background: alpha('#36769A', 0.4), color: '#00040F' },
    receive: { background: alpha('#38369A', 0.4), color: '#00040F' },
    rebond: { background: alpha('#6E369A', 0.4), color: '#00040F' },
    fail: { background: alpha('#9A363C', 0.4), color: '#00040F' },
    multisend: { background: alpha('#36529A', 0.4), color: '#00040F' },
    other: { background: alpha('#485769', 0.4), color: '#00040F' },
    active: { background: alpha('#369A82', 0.4), color: '#00040F' },
    ready: { background: alpha('#989A36', 0.4), color: '#00040F' },
    jailed: { background: alpha('#9A363C', 0.4), color: '#00040F' },
    evm: { background: alpha('#BED6E7', 0.4), color: '#00040F' },
    contractCall: { background: alpha('#97FFC7', 0.4), color: '#00040F' },
    createValidator: { background: alpha('#B453C3', 0.4), color: '#00040F' },
    unjail: { background: alpha('#989A36', 0.4), color: '#00040F' },
    submitProposal: { background: alpha('#38369A', 0.4), color: '#00040F' },
  },
  gradient: {
    card: '#FFFFFF',
    cardBlue:
      'linear-gradient(127.18deg, rgba(12, 194, 255, 0.32) 22.25%, rgba(12, 194, 255, 0.17) 48.05%, rgba(12, 194, 255, 0) 68.99%)',
    cardBlack: 'linear-gradient(121.78deg, rgba(255, 255, 255, 0.1) 24.4%, rgba(255, 255, 255, 0) 69.12%)',
    sidebar: '#FFFFFF',
    mobileSidebar: '#FFFFFF',
    menuItemActive: 'linear-gradient(270deg, rgba(13, 184, 242, 0.35) 0%, rgba(13, 184, 242, 0) 100%)',
  },
  shadow: {
    primary: '4px 4px 20px 0px #B4B4B74D',
  },
};

export default lightPalette;
