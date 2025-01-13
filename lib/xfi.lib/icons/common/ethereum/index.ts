import type { ThemeIcon } from '../../types';
import { default as EthereumDarkIcon } from './ethereum.dark.svg';
import { default as EthereumLightIcon } from './ethereum.light.svg';

const EthereumIcon: ThemeIcon = {
  light: EthereumLightIcon,
  dark: EthereumDarkIcon,
} as const;

export default EthereumIcon;
