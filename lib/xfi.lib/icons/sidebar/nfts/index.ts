import type { ThemeIcon } from '../../types';
import { default as NftsDarkIcon } from './nfts.dark.svg';
import { default as NftsLightIcon } from './nfts.light.svg';

const NftsIcon: ThemeIcon = {
  light: NftsLightIcon,
  dark: NftsDarkIcon,
} as const;

export default NftsIcon;
