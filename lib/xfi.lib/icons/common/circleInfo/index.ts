import type { ThemeIcon } from '../../types';
import { default as CircleInfoDarkIcon } from './circleInfo.dark.svg';
import { default as CircleInfoLightIcon } from './circleInfo.light.svg';

const CircleInfoIcon: ThemeIcon = {
  dark: CircleInfoDarkIcon,
  light: CircleInfoLightIcon,
} as const;

export default CircleInfoIcon;
