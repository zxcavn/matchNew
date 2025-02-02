import type { ThemeIcon } from '../../types';
import { default as MainDarkIcon } from './main.dark.svg';
import { default as MainLightIcon } from './main.light.svg';

const MainIcon: ThemeIcon = {
  light: MainLightIcon,
  dark: MainDarkIcon,
} as const;

export default MainIcon;
