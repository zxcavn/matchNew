import { ThemeIcon } from '@/lib/xfi.lib/icons/types';
import { default as XfiRoundDarkIcon } from './xfiRound.dark.svg';
import { default as XfiRoundLightIcon } from './xfiRound.light.svg';

const XfiRoundIcon: ThemeIcon = {
  light: XfiRoundLightIcon,
  dark: XfiRoundDarkIcon,
} as const;

export default XfiRoundIcon;
