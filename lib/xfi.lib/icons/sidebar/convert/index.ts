import type { ThemeIcon } from '../../types';
import { default as ConvertDarkIcon } from './convert.dark.svg';
import { default as ConvertLightIcon } from './convert.light.svg';

const ConvertIcon: ThemeIcon = {
  light: ConvertLightIcon,
  dark: ConvertDarkIcon,
} as const;

export default ConvertIcon;
