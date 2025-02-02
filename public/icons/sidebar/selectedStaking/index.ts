import type { ThemeIcon } from '../../types';
import { default as SelectedStakingDarkIcon } from './selectedStaking.dark.svg';
import { default as SelectedStakingLightIcon } from './selectedStaking.light.svg';

const SelectedStakingIcon: ThemeIcon = {
  light: SelectedStakingLightIcon,
  dark: SelectedStakingDarkIcon,
} as const;

export default SelectedStakingIcon;
