import { ThemeIcon } from '@/lib/xfi.lib/icons/types';
import { default as BwarelabsDarkIcon } from './bwarelabs.dark.svg';
import { default as BwarelabsLightIcon } from './bwarelabs.light.svg';

const BwarelabsIcon: ThemeIcon = {
  light: BwarelabsLightIcon,
  dark: BwarelabsDarkIcon,
} as const;

export default BwarelabsIcon;
