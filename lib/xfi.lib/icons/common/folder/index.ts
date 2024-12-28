import type { ThemeIcon } from '../../types';
import { default as FolderDarkIcon } from './folder.dark.svg';
import { default as FolderLightIcon } from './folder.light.svg';

const FolderIcon: ThemeIcon = {
  light: FolderLightIcon,
  dark: FolderDarkIcon,
} as const;

export default FolderIcon;
