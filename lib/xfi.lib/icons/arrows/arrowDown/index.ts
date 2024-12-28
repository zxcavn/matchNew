import type { ThemeIcon } from '../../types';
import { default as ArrowDownDarkIcon } from './arrowDown.dark.svg';
import { default as ArrowDownLightIcon } from './arrowDown.light.svg';

const ArrowDownIcon: ThemeIcon = {
  light: ArrowDownLightIcon,
  dark: ArrowDownDarkIcon,
} as const;

export default ArrowDownIcon;
