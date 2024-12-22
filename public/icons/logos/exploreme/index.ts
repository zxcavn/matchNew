import { ThemeIcon } from '@/lib/xfi.lib/icons/types';
import { default as ExploremeDarkIcon } from './exploreme.dark.svg';
import { default as ExploremeLightIcon } from './exploreme.light.svg';

const ExploremeIcon: ThemeIcon = {
  light: ExploremeLightIcon,
  dark: ExploremeDarkIcon,
} as const;

export default ExploremeIcon;
