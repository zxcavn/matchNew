import type { ThemeIcon } from '../../types';
import { default as EyeCloseDarkIcon } from './eyeClose.dark.svg';
import { default as EyeCloseLightIcon } from './eyeClose.light.svg';

const EyeCloseIcon: ThemeIcon = {
  light: EyeCloseLightIcon,
  dark: EyeCloseDarkIcon,
} as const;

export default EyeCloseIcon;
