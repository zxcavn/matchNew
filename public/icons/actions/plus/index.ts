import type { ThemeIcon } from '../../types';
import { default as PlusDarkIcon } from './plus.dark.svg';
import { default as PlusLightIcon } from './plus.light.svg';

const PlusIcon: ThemeIcon = {
  light: PlusLightIcon,
  dark: PlusDarkIcon,
} as const;

export default PlusIcon;
