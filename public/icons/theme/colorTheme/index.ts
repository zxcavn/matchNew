import type { ThemeIcon } from '../../types';
import { default as ColorThemeDarkIcon } from './colorTheme.dark.svg';
import { default as ColorThemeLightIcon } from './colorTheme.light.svg';

const ColorThemeIcon: ThemeIcon = {
  light: ColorThemeLightIcon,
  dark: ColorThemeDarkIcon,
} as const;

export default ColorThemeIcon;
