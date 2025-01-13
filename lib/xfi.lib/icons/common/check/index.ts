import type { ThemeIcon } from '../../types';
import { default as CheckDarkIcon } from './check.dark.svg';
import { default as CheckLightIcon } from './check.light.svg';

const CheckIcon: ThemeIcon = {
  light: CheckLightIcon,
  dark: CheckDarkIcon,
} as const;

export default CheckIcon;
