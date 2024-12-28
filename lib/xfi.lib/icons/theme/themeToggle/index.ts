import type { ThemeIcon } from '../../types';
import { default as ThemeToggleDarkIcon } from './themeToggle.dark.svg';
import { default as ThemeToggleLightIcon } from './themeToggle.light.svg';

const ThemeToggleIcon: ThemeIcon = {
  light: ThemeToggleLightIcon,
  dark: ThemeToggleDarkIcon,
} as const;

export default ThemeToggleIcon;
