import { ThemeIcon } from '@/lib/xfi.lib/icons/types';
import { default as ImperatorDarkIcon } from './imperator.dark.svg';
import { default as ImperatorLightIcon } from './imperator.light.svg';

const ImperatorIcon: ThemeIcon = {
  light: ImperatorLightIcon,
  dark: ImperatorDarkIcon,
} as const;

export default ImperatorIcon;
