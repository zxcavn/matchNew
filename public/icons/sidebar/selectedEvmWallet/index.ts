import type { ThemeIcon } from '../../types';
import { default as SelectedEvmWalletDarkIcon } from './selectedEvmWallet.dark.svg';
import { default as SelectedEvmWalletLightIcon } from './selectedEvmWallet.light.svg';

const SelectedEvmWalletIcon: ThemeIcon = {
  light: SelectedEvmWalletLightIcon,
  dark: SelectedEvmWalletDarkIcon,
} as const;

export default SelectedEvmWalletIcon;
