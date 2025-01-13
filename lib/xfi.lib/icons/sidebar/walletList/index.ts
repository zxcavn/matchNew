import type { ThemeIcon } from '../../types';
import { default as WalletListDarkIcon } from './walletList.dark.svg';
import { default as WalletListLightIcon } from './walletList.light.svg';

const WalletListIcon: ThemeIcon = {
  light: WalletListLightIcon,
  dark: WalletListDarkIcon,
} as const;

export default WalletListIcon;
