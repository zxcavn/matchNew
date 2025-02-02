import type { ThemeIcon } from '../../types';
import { default as FireDarkIcon } from './fire.dark.svg';
import { default as FireLightIcon } from './fire.light.svg';

const FireIcon: ThemeIcon = {
  light: FireLightIcon,
  dark: FireDarkIcon,
} as const;

export default FireIcon;
