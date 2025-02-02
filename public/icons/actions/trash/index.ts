import type { ThemeIcon } from '../../types';
import { default as TrashDarkIcon } from './trash.dark.svg';
import { default as TrashLightIcon } from './trash.light.svg';

const TrashIcon: ThemeIcon = {
  light: TrashLightIcon,
  dark: TrashDarkIcon,
} as const;

export default TrashIcon;
