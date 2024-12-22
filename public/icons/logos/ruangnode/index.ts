import { ThemeIcon } from '@/lib/xfi.lib/icons/types';
import { default as RuangnodeIconDarkIcon } from './ruangnode.dark.svg';
import { default as RuangnodeIconLightIcon } from './ruangnode.light.svg';

const RuangnodeIcon: ThemeIcon = {
  light: RuangnodeIconLightIcon,
  dark: RuangnodeIconDarkIcon,
} as const;

export default RuangnodeIcon;
