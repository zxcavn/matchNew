import type { ThemeIcon } from '../../types';
import { default as CosmosWalletDarkIcon } from './cosmosWallet.dark.svg';
import { default as CosmosWalletLightIcon } from './cosmosWallet.light.svg';

const CosmosWalletIcon: ThemeIcon = {
  light: CosmosWalletLightIcon,
  dark: CosmosWalletDarkIcon,
} as const;

export default CosmosWalletIcon;
