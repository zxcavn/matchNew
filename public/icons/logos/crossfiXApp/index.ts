import { ThemeIcon } from '@/lib/xfi.lib/icons/types';
import { default as CrossfiXAppDarkIcon } from './crossfiXApp.dark.svg';
import { default as CrossfiXAppLightIcon } from './crossfiXApp.light.svg';

const CrossfiXAppIcon: ThemeIcon = {
  light: CrossfiXAppLightIcon,
  dark: CrossfiXAppDarkIcon,
} as const;

export default CrossfiXAppIcon;
