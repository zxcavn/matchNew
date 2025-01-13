import type { ThemeIcon } from '../../types';
import { default as ArrowUpDarkIcon } from './arrowUp.dark.svg';
import { default as ArrowUpLightIcon } from './arrowUp.light.svg';

const ArrowUpIcon: ThemeIcon = {
  light: ArrowUpLightIcon,
  dark: ArrowUpDarkIcon,
} as const;

export default ArrowUpIcon;
