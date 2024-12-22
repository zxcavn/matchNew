import { ThemeIcon } from '@/lib/xfi.lib/icons/types';
import { default as CoinsInStakeDarkIcon } from './coinsInStake.dark.svg';
import { default as CoinsInStakeLightIcon } from './coinsInStake.light.svg';

const CoinsInStakeIcon: ThemeIcon = {
  light: CoinsInStakeLightIcon,
  dark: CoinsInStakeDarkIcon,
} as const;

export default CoinsInStakeIcon;
