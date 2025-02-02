import type { ThemeIcon } from '../../types';
import { default as TwoArrowsDarkIcon } from './twoArrows.dark.svg';
import { default as TwoArrowsLightIcon } from './twoArrows.light.svg';

const TwoArrowsIcon: ThemeIcon = {
  light: TwoArrowsLightIcon,
  dark: TwoArrowsDarkIcon,
} as const;

export default TwoArrowsIcon;
