import type { ThemeIcon } from '../../types';
import { default as CopyDarkIcon } from './copy.dark.svg';
import { default as CopyLightIcon } from './copy.light.svg';

const CopyIcon: ThemeIcon = {
  light: CopyLightIcon,
  dark: CopyDarkIcon,
} as const;

export default CopyIcon;
