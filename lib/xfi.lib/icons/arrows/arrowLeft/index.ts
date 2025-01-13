import type { ThemeIcon } from '../../types';
import { default as ArrowLeftDarkIcon } from './arrowLeft.dark.svg';
import { default as ArrowLeftLightIcon } from './arrowLeft.light.svg';

const ArrowLeftIcon: ThemeIcon = {
  light: ArrowLeftLightIcon,
  dark: ArrowLeftDarkIcon,
} as const;

export default ArrowLeftIcon;
