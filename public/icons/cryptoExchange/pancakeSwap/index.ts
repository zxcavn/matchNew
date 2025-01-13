import { ThemeIcon } from '@/lib/xfi.lib/icons/types';
import { default as PancakeSwapLightIcon } from './pancakeSwap.light.svg';
import { default as PancakeSwapDarkIcon } from './pancakeSwap.dark.svg';

const PancakeSwapIcon: ThemeIcon = {
  light: PancakeSwapLightIcon,
  dark: PancakeSwapDarkIcon,
} as const;

export default PancakeSwapIcon;
