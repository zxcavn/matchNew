import type { ThemeIcon } from '../../types';
import { default as CosmosDarkIcon } from './cosmos.dark.svg';
import { default as CosmosLightIcon } from './cosmos.light.svg';

const CosmosIcon: ThemeIcon = {
  light: CosmosLightIcon,
  dark: CosmosDarkIcon,
} as const;

export default CosmosIcon;
