import { ThemeIcon } from '@/lib/xfi.lib/icons/types';
import { default as MexcLightIcon } from './mexc.light.svg';
import { default as MexcDarkIcon } from './mexc.dark.svg'

const MexcIcon: ThemeIcon = {
  light: MexcLightIcon,
  dark: MexcDarkIcon,
} as const;

export default MexcIcon;
