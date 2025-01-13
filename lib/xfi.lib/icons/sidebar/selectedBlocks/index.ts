import type { ThemeIcon } from '../../types';
import { default as SelectedBlocksDarkIcon } from './selectedBlocks.dark.svg';
import { default as SelectedBlocksLightIcon } from './selectedBlocks.light.svg';

const SelectedBlocksIcon: ThemeIcon = {
  light: SelectedBlocksLightIcon,
  dark: SelectedBlocksDarkIcon,
} as const;

export default SelectedBlocksIcon;
