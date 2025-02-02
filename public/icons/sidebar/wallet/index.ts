import type { ThemeIcon } from '../../types';
import { default as WalletDarkIcon } from './wallet.dark.svg';
import { default as WalletLightIcon } from './wallet.light.svg';

const WalletIcon: ThemeIcon = {
  light: WalletLightIcon,
  dark: WalletDarkIcon,
} as const;

export default WalletIcon;
