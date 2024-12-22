import { ThemeIcon } from '@/lib/xfi.lib/icons/types';
import { default as UniswapLightIcon } from './uniswap.light.svg';
import { default as UniswapDarkIcon } from './uniswap.dark.svg';

const UniswapIcon: ThemeIcon = {
  light: UniswapLightIcon,
  dark: UniswapDarkIcon,
} as const;

export default UniswapIcon;
