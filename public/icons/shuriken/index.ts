import { ThemeIcon } from '@/lib/xfi.lib/icons/types';
import { default as ShurikenLightIcon } from './shuriken.light.svg';
import { default as ShurikenDarkIcon } from './shuriken.dark.svg';

const ShurikenIcon: ThemeIcon = {
  light: ShurikenLightIcon,
  dark: ShurikenDarkIcon,
} as const;

export default ShurikenIcon;
