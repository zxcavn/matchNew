import type { ThemeIcon } from '../../types';
import { default as ArrowRightDarkIcon } from './arrowRight.dark.svg';
import { default as ArrowRightLightIcon } from './arrowRight.light.svg';

const ArrowRightIcon: ThemeIcon = {
  light: ArrowRightLightIcon,
  dark: ArrowRightDarkIcon,
} as const;

export default ArrowRightIcon;
