import type { ThemeIcon } from '../../types';
import { default as DiamondDarkIcon } from './diamond.dark.svg';
import { default as DiamondLightIcon } from './diamond.light.svg';

const DiamondIcon: ThemeIcon = {
  light: DiamondLightIcon,
  dark: DiamondDarkIcon,
} as const;

export default DiamondIcon;
