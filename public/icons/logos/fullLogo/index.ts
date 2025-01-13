import { default as LogoDarkIcon } from './fullLogo.dark.svg';
import { default as LogoLightIcon } from './fullLogo.light.svg';
import { ThemeIcon } from '@/lib/xfi.lib/icons/types';

const LogoIcon: ThemeIcon = {
  light: LogoLightIcon,
  dark: LogoDarkIcon,
} as const;

export default LogoIcon;
