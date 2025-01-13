import { ThemeIcon } from '@/lib/xfi.lib/icons/types';
import { default as ItRocketDarkIcon } from './itRocket.dark.svg';
import { default as ItRocketLightIcon } from './itRocket.light.svg';

const ItRocketIcon: ThemeIcon = {
  light: ItRocketLightIcon,
  dark: ItRocketDarkIcon,
} as const;

export default ItRocketIcon;
