import type { ThemeIcon } from '../../types';
import { default as BlocksDarkIcon } from './blocks.dark.svg';
import { default as BlocksLightIcon } from './blocks.light.svg';

const BlocksIcon: ThemeIcon = {
  light: BlocksLightIcon,
  dark: BlocksDarkIcon,
} as const;

export default BlocksIcon;
