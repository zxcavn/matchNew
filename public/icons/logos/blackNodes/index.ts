import { ThemeIcon } from '@/lib/xfi.lib/icons/types';
import { default as BlackNodesDarkIcon } from './blackNodes.dark.svg';
import { default as BlackNodesLightIcon } from './blackNodes.light.svg';

const BlackNodesIcon: ThemeIcon = {
  light: BlackNodesLightIcon,
  dark: BlackNodesDarkIcon,
} as const;

export default BlackNodesIcon;
