import type { ThemeIcon } from '../../types';
import { default as LanguageDarkIcon } from './language.dark.svg';
import { default as LanguageLightIcon } from './language.light.svg';

const LanguageIcon: ThemeIcon = {
  light: LanguageLightIcon,
  dark: LanguageDarkIcon,
} as const;

export default LanguageIcon;
