import type { ThemeIcon } from '../../types';
import { default as SelectedSettingsDarkIcon } from './selectedSettings.dark.svg';
import { default as SelectedSettingsLightIcon } from './selectedSettings.light.svg';

const SelectedSettingsIcon: ThemeIcon = {
  light: SelectedSettingsLightIcon,
  dark: SelectedSettingsDarkIcon,
} as const;

export default SelectedSettingsIcon;
