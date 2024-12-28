import { ThemeIcon } from '@/lib/xfi.lib/icons/types';
import { default as CrossfiScanDarkIcon } from './crossfiScan.dark.svg';
import { default as CrossfiScanLightIcon } from './crossfiScan.light.svg';

const CrossfiScanIcon: ThemeIcon = {
  light: CrossfiScanLightIcon,
  dark: CrossfiScanDarkIcon,
} as const;

export default CrossfiScanIcon;
