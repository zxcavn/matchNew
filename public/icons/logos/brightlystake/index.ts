import { ThemeIcon } from '@/lib/xfi.lib/icons/types';
import { default as BrightlystakeDarkIcon } from './brightlystake.dark.svg';
import { default as BrightlystakeLightIcon } from './brightlystake.light.svg';

const BrightlystakeIcon: ThemeIcon = {
  light: BrightlystakeLightIcon,
  dark: BrightlystakeDarkIcon,
} as const;

export default BrightlystakeIcon;
