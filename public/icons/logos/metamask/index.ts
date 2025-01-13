import { ThemeIcon } from '@/lib/xfi.lib/icons/types';
import { default as MetamaskDarkIcon } from './metamask.dark.svg';
import { default as MetamaskLightIcon } from './metamask.light.svg';

const MetamaskIcon: ThemeIcon = {
  light: MetamaskLightIcon,
  dark: MetamaskDarkIcon,
} as const;

export default MetamaskIcon;
