import type { ThemeIcon } from '../../types';
import { default as EvmSmallDarkIcon } from './evmSmall.dark.svg';
import { default as EvmSmallLightIcon } from './evmSmall.light.svg';

const EvmSmallIcon: ThemeIcon = {
  light: EvmSmallLightIcon,
  dark: EvmSmallDarkIcon,
} as const;

export default EvmSmallIcon;
