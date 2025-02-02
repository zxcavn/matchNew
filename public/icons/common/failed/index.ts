import type { ThemeIcon } from '../../types';
import { default as FailedDarkIcon } from './failed.dark.svg';
import { default as FailedLightIcon } from './failed.light.svg';

const FailedIcon: ThemeIcon = {
  light: FailedLightIcon,
  dark: FailedDarkIcon,
} as const;

export default FailedIcon;
