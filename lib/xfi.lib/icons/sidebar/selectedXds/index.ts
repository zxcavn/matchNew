import type { ThemeIcon } from '../../types';
import { default as SelectedXdsDarkIcon } from './selectedXds.dark.svg';
import { default as SelectedXdsLightIcon } from './selectedXds.light.svg';

const SelectedXdsIcon: ThemeIcon = {
  dark: SelectedXdsDarkIcon,
  light: SelectedXdsLightIcon,
} as const;

export default SelectedXdsIcon;
