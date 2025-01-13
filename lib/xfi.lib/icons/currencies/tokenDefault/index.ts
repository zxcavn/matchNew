import type { ThemeIcon } from '../../types';
import { default as TokenDefaultDarkIcon } from './tokenDefault.dark.svg';
import { default as TokenDefaultLightIcon } from './tokenDefault.light.svg';

const TokenDefaultIcon: ThemeIcon = {
  dark: TokenDefaultDarkIcon,
  light: TokenDefaultLightIcon,
} as const;

export default TokenDefaultIcon;
