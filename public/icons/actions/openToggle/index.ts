import type { ThemeIcon } from '../../types';
import { default as OpenToggleDarkIcon } from './openToggle.dark.svg';
import { default as OpenToggleLightIcon } from './openToggle.light.svg';

const OpenToggleIcon: ThemeIcon = {
  light: OpenToggleLightIcon,
  dark: OpenToggleDarkIcon,
} as const;

export default OpenToggleIcon;
