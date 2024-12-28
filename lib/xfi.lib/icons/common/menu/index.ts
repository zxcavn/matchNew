import type { ThemeIcon } from '../../types';
import { default as MenuDarkIcon } from './menu.dark.svg';
import { default as MenuLightIcon } from './menu.light.svg';

const MenuIcon: ThemeIcon = {
  light: MenuLightIcon,
  dark: MenuDarkIcon,
} as const;

export default MenuIcon;
