import type { ThemeIcon } from '../../types';
import { default as XappDarkIcon } from './xapp.dark.svg';
import { default as XappLightIcon } from './xapp.light.svg';

const XappIcon: ThemeIcon = {
  light: XappLightIcon,
  dark: XappDarkIcon,
} as const;

export default XappIcon;
