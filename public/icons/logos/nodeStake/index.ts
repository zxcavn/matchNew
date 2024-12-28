import { ThemeIcon } from '@/lib/xfi.lib/icons/types';
import { default as NodeStakeDarkIcon } from './nodeStake.dark.svg';
import { default as NodeStakeLightIcon } from './nodeStake.light.svg';

const NodeStakeIcon: ThemeIcon = {
  light: NodeStakeLightIcon,
  dark: NodeStakeDarkIcon,
} as const;

export default NodeStakeIcon;
