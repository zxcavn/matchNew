import type { ThemeIcon } from '../../types';
import { default as EvmWalletDarkIcon } from './evmWallet.dark.svg';
import { default as EvmWalletLightIcon } from './evmWallet.light.svg';

const EvmWalletIcon: ThemeIcon = {
  light: EvmWalletLightIcon,
  dark: EvmWalletDarkIcon,
} as const;

export default EvmWalletIcon;
