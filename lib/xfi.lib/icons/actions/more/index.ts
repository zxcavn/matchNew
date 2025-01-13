import type { ThemeIcon } from '../../types';
import { default as MoreDarkIcon } from './more.dark.svg';
import { default as MoreLightIcon } from './more.light.svg';

const MoreIcon: ThemeIcon = {
  light: MoreLightIcon,
  dark: MoreDarkIcon,
} as const;

export default MoreIcon;
