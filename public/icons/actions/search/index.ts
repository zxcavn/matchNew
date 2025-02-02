import type { ThemeIcon } from '../../types';
import { default as SearchDarkIcon } from './search.dark.svg';
import { default as SearchLightIcon } from './search.light.svg';

const SearchIcon: ThemeIcon = {
  light: SearchLightIcon,
  dark: SearchDarkIcon,
} as const;

export default SearchIcon;
