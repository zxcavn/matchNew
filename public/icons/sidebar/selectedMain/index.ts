import type { ThemeIcon } from '../../types';
import { default as SelectedMainDarkIcon } from './selectedMain.dark.svg';
import { default as SelectedMainLightIcon } from './selectedMain.light.svg';

const SelectedMainIcon: ThemeIcon = {
  light: SelectedMainLightIcon,
  dark: SelectedMainDarkIcon,
} as const;

export default SelectedMainIcon;
