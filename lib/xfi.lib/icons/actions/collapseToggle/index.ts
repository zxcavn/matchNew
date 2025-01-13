import type { ThemeIcon } from '../../types';
import { default as CollapseToggleDarkIcon } from './collapseToggle.dark.svg';
import { default as CollapseToggleLightIcon } from './collapseToggle.light.svg';

const CollapseToggleIcon: ThemeIcon = {
  light: CollapseToggleLightIcon,
  dark: CollapseToggleDarkIcon,
} as const;

export default CollapseToggleIcon;
