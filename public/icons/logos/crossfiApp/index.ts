import { ThemeIcon } from '@/lib/xfi.lib/icons/types';
import { default as CrossfiAppDarkIcon } from './crossfiApp.dark.svg';
import { default as CrossfiAppLightIcon } from './crossfiApp.light.svg';

const CrossfiAppIcon: ThemeIcon = {
  light: CrossfiAppLightIcon,
  dark: CrossfiAppDarkIcon,
} as const;

export default CrossfiAppIcon;
