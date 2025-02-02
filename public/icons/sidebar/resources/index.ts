import type { ThemeIcon } from '../../types';
import { default as ResourcesDarkIcon } from './resources.dark.svg';
import { default as ResourcesLightIcon } from './resources.light.svg';

const ResourcesIcon: ThemeIcon = {
  light: ResourcesLightIcon,
  dark: ResourcesDarkIcon,
} as const;

export default ResourcesIcon;
