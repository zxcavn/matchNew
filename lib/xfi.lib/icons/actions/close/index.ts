import type { ThemeIcon } from '../../types';
import { default as CloseDarkIcon } from './close.dark.svg';
import { default as CloseLightIcon } from './close.light.svg';

const CloseIcon: ThemeIcon = {
  light: CloseLightIcon,
  dark: CloseDarkIcon,
} as const;

export default CloseIcon;
