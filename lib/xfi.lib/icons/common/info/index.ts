import type { ThemeIcon } from '../../types';
import { default as InfoDarkIcon } from './info.dark.svg';
import { default as InfoLightIcon } from './info.light.svg';

const InfoIcon: ThemeIcon = {
  light: InfoLightIcon,
  dark: InfoDarkIcon,
} as const;

export default InfoIcon;
