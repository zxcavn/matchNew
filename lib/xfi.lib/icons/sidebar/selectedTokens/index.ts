import type { ThemeIcon } from '../../types';
import { default as SelectedTokensDarkIcon } from './selectedTokens.dark.svg';
import { default as SelectedTokensLightIcon } from './selectedTokens.light.svg';

const SelectedTokensIcon: ThemeIcon = {
  light: SelectedTokensLightIcon,
  dark: SelectedTokensDarkIcon,
} as const;

export default SelectedTokensIcon;
