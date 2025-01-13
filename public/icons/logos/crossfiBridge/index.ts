import { ThemeIcon } from '@/lib/xfi.lib/icons/types';
import { default as CrossfiBridgeDarkIcon } from './crossfiBridge.dark.svg';
import { default as CrossfiBridgeLightIcon } from './crossfiBridge.light.svg';

const CrossfiBridgeIcon: ThemeIcon = {
  light: CrossfiBridgeLightIcon,
  dark: CrossfiBridgeDarkIcon,
} as const;

export default CrossfiBridgeIcon;
