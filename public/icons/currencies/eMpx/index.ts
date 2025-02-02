import type { ThemeIcon } from '../../types';
import { default as EMpxDarkIcon } from './eMpx.dark.svg';
import { default as EMpxLightIcon } from './eMpx.light.svg';

const EMpxIcon: ThemeIcon = {
  light: EMpxLightIcon,
  dark: EMpxDarkIcon,
} as const;

export default EMpxIcon;
