import type { ThemeIcon } from '../../types';
import { default as XdsDarkIcon } from './xds.dark.svg';
import { default as XdsLightIcon } from './xds.light.svg';

const XdsIcon: ThemeIcon = {
  dark: XdsDarkIcon,
  light: XdsLightIcon,
} as const;

export default XdsIcon;
