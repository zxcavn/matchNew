import type { ThemeIcon } from '../../types';
import { default as EvmDarkIcon } from './evm.dark.svg';
import { default as EvmLightIcon } from './evm.light.svg';

const EvmIcon: ThemeIcon = {
  light: EvmLightIcon,
  dark: EvmDarkIcon,
} as const;

export default EvmIcon;
