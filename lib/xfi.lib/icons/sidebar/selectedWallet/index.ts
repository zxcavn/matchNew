import type { ThemeIcon } from '../../types';
import { default as SelectedWalletDarkIcon } from './selectedWallet.dark.svg';
import { default as SelectedWalletLightIcon } from './selectedWallet.light.svg';

const SelectedWalletIcon: ThemeIcon = {
  light: SelectedWalletLightIcon,
  dark: SelectedWalletDarkIcon,
} as const;

export default SelectedWalletIcon;
