import type { ThemeIcon } from '../../types';
import { default as LinkDarkIcon } from './link.dark.svg';
import { default as LinkLightIcon } from './link.light.svg';

const LinkIcon: ThemeIcon = {
  light: LinkLightIcon,
  dark: LinkDarkIcon,
} as const;

export default LinkIcon;
