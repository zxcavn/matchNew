import type { ThemeIcon } from '../../types';
import { default as XfiDarkIcon } from './xfi.dark.svg';
import { default as XfiLightIcon } from './xfi.light.svg';

const XfiIcon: ThemeIcon = {
  dark: XfiDarkIcon,
  light: XfiLightIcon,
} as const;

export default XfiIcon;
