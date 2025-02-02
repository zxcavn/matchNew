import type { ThemeIcon } from '../../types';
import { default as AssetsDarkIcon } from './assets.dark.svg';
import { default as AssetsLightIcon } from './assets.light.svg';

const AssetsIcon: ThemeIcon = {
  dark: AssetsDarkIcon,
  light: AssetsLightIcon,
} as const;

export default AssetsIcon;
