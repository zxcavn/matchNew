import type { ThemeIcon } from '../../types';
import { default as CosmosSmallDarkIcon } from './cosmosSmall.dark.svg';
import { default as CosmosSmallLightIcon } from './cosmosSmall.light.svg';

const CosmosSmallIcon: ThemeIcon = {
  light: CosmosSmallLightIcon,
  dark: CosmosSmallDarkIcon,
} as const;

export default CosmosSmallIcon;
