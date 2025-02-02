import type { ThemeIcon } from '../../types';
import { default as SelectedNftsDarkIcon } from './selectedNfts.dark.svg';
import { default as SelectedNftsLightIcon } from './selectedNfts.light.svg';

const SelectedNftsIcon: ThemeIcon = {
  light: SelectedNftsLightIcon,
  dark: SelectedNftsDarkIcon,
} as const;

export default SelectedNftsIcon;
