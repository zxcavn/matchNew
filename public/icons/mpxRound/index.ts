import { ThemeIcon } from '@/lib/xfi.lib/icons/types';
import { default as MpxRoundDarkIcon } from './mpxRound.dark.svg';
import { default as MpxRoundLightIcon } from './mpxRound.light.svg';

const MpxRoundIcon: ThemeIcon = {
  light: MpxRoundLightIcon,
  dark: MpxRoundDarkIcon,
} as const;

export default MpxRoundIcon;
