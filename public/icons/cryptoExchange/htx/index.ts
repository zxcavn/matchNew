import { ThemeIcon } from '@/lib/xfi.lib/icons/types';
import { default as HtxLightIcon } from './htx.light.svg';
import { default as HtxDarkIcon } from './htx.dark.svg'

const HtxIcon: ThemeIcon = {
  light: HtxLightIcon,
  dark: HtxDarkIcon,
} as const;

export default HtxIcon;
