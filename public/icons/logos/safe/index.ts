import { ThemeIcon } from '@/lib/xfi.lib/icons/types';
import { default as SafeDarkIcon } from './safe.dark.svg';
import { default as SafeLightIcon } from './safe.light.svg';

const SafeIcon: ThemeIcon = {
  light: SafeLightIcon,
  dark: SafeDarkIcon,
} as const;

export default SafeIcon;
