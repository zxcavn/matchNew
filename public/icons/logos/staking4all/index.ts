import { ThemeIcon } from '@/lib/xfi.lib/icons/types';
import { default as Staking4allDarkIcon } from './staking4all.dark.svg';
import { default as Staking4allLightIcon } from './staking4all.light.svg';

const Staking4allIcon: ThemeIcon = {
  light: Staking4allLightIcon,
  dark: Staking4allDarkIcon,
} as const;

export default Staking4allIcon;
