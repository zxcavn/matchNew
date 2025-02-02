import type { ThemeIcon } from '../../types';
import { default as TokensDarkIcon } from './tokens.dark.svg';
import { default as TokensLightIcon } from './tokens.light.svg';

const TokensIcon: ThemeIcon = {
  light: TokensLightIcon,
  dark: TokensDarkIcon,
} as const;

export default TokensIcon;
