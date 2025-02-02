import type { ThemeIcon } from '../../types';
import { default as MinusDarkIcon } from './minus.dark.svg';
import { default as MinusLightIcon } from './minus.light.svg';

const MinusIcon: ThemeIcon = {
  light: MinusLightIcon,
  dark: MinusDarkIcon,
} as const;

export default MinusIcon;
