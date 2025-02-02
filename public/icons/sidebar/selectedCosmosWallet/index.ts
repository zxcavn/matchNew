import type { ThemeIcon } from '../../types';
import { default as SelectedCosmosWalletDarkIcon } from './selectedCosmosWallet.dark.svg';
import { default as SelectedCosmosWalletLightIcon } from './selectedCosmosWallet.light.svg';

const SelectedCosmosWalletIcon: ThemeIcon = {
  light: SelectedCosmosWalletLightIcon,
  dark: SelectedCosmosWalletDarkIcon,
} as const;

export default SelectedCosmosWalletIcon;
