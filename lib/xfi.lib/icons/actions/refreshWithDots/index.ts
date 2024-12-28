import type { ThemeIcon } from '../../types';
import { default as RefreshWithDotsDarkIcon } from './refreshWithDots.dark.svg';
import { default as RefreshWithDotsLightIcon } from './refreshWithDots.light.svg';

const RefreshWithDotsIcon: ThemeIcon = {
  light: RefreshWithDotsLightIcon,
  dark: RefreshWithDotsDarkIcon,
} as const;

export default RefreshWithDotsIcon;
