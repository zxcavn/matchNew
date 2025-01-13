import type { ThemeIcon } from '../../types';
import { default as SelectedMultisignDarkIcon } from './selectedMultisign.dark.svg';
import { default as SelectedMultisignLightIcon } from './selectedMultisign.light.svg';

const SelectedMultisignIcon: ThemeIcon = {
  light: SelectedMultisignLightIcon,
  dark: SelectedMultisignDarkIcon,
} as const;

export default SelectedMultisignIcon;
