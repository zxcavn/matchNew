import type { ThemeIcon } from '../../types';
import { default as SelectedHashCheckDarkIcon } from './selectedHashCheck.dark.svg';
import { default as SelectedCheckLightIcon } from './selectedHashCheck.light.svg';

const SelectedHashCheckIcon: ThemeIcon = {
  light: SelectedCheckLightIcon,
  dark: SelectedHashCheckDarkIcon,
} as const;

export default SelectedHashCheckIcon;
