import { default as keplrDarkIcon } from './keplr.dark.svg';
import { default as keplrLightIcon } from './keplr.light.svg';
import { ThemeIcon } from '@/lib/xfi.lib/icons/types';

const KeplrIcon: ThemeIcon = {
  light: keplrLightIcon,
  dark: keplrDarkIcon,
} as const;

export default KeplrIcon;
