import type { ThemeIcon } from '../../types';
import { default as LogoutDarkIcon } from './logout.dark.svg';
import { default as LogoutLightIcon } from './logout.light.svg';

const LogoutIcon: ThemeIcon = {
  light: LogoutLightIcon,
  dark: LogoutDarkIcon,
} as const;

export default LogoutIcon;
