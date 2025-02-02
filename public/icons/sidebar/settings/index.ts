import type { ThemeIcon } from '../../types';
import { default as SettingsDarkIcon } from './settings.dark.svg';
import { default as SettingsLightIcon } from './settings.light.svg';

const SettingsIcon: ThemeIcon = {
  light: SettingsLightIcon,
  dark: SettingsDarkIcon,
} as const;

export default SettingsIcon;
