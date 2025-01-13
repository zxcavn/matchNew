import type { ThemeIcon } from '../../types';
import { default as MultisignDarkIcon } from './multisign.dark.svg';
import { default as MultisignLightIcon } from './multisign.light.svg';

const MultisignIcon: ThemeIcon = {
  light: MultisignLightIcon,
  dark: MultisignDarkIcon,
} as const;

export default MultisignIcon;
