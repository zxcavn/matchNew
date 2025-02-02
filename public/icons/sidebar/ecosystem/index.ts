import type { ThemeIcon } from '../../types';
import { default as EcosystemDarkIcon } from './ecosystem.dark.svg';
import { default as EcosystemLightIcon } from './ecosystem.light.svg';

const EcosystemIcon: ThemeIcon = {
  light: EcosystemLightIcon,
  dark: EcosystemDarkIcon,
} as const;

export default EcosystemIcon;
