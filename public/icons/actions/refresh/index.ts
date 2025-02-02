import type { ThemeIcon } from '../../types';
import { default as RefreshDarkIcon } from './refresh.dark.svg';
import { default as RefreshLightIcon } from './refresh.light.svg';

const RefreshIcon: ThemeIcon = {
  light: RefreshLightIcon,
  dark: RefreshDarkIcon,
} as const;

export default RefreshIcon;
