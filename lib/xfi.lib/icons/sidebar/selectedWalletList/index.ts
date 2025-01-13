import type { ThemeIcon } from '../../types';
import { default as SelectedWalletListDarkIcon } from './selectedWalletList.dark.svg';
import { default as SelectedWalletListLightIcon } from './selectedWalletList.light.svg';

const SelectedWalletListIcon: ThemeIcon = {
  light: SelectedWalletListLightIcon,
  dark: SelectedWalletListDarkIcon,
} as const;

export default SelectedWalletListIcon;
