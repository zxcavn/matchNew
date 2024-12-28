import type { ThemeIcon } from '../../types';
import { default as SelectedLogoutDarkIcon } from './selectedLogout.dark.svg';
import { default as SelectedLogoutLightIcon } from './selectedLogout.light.svg';

const SelectedLogoutIcon: ThemeIcon = {
  light: SelectedLogoutLightIcon,
  dark: SelectedLogoutDarkIcon,
} as const;

export default SelectedLogoutIcon;
