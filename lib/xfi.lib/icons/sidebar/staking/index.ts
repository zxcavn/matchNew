import type { ThemeIcon } from '../../types';
import { default as StakingDarkIcon } from './staking.dark.svg';
import { default as StakingLightIcon } from './staking.light.svg';

const CosmosIcon: ThemeIcon = {
  light: StakingLightIcon,
  dark: StakingDarkIcon,
} as const;

export default CosmosIcon;
