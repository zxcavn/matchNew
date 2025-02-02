import type { ThemeIcon } from '../../types';
import { default as MpxDarkIcon } from './mpx.dark.svg';
import { default as MpxLightIcon } from './mpx.light.svg';

const MpxIcon: ThemeIcon = {
  dark: MpxDarkIcon,
  light: MpxLightIcon,
} as const;

export default MpxIcon;
