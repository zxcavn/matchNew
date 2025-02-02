import type { ThemeIcon } from '../../types';
import { default as GovDarkIcon } from './gov.dark.svg';
import { default as GovLightIcon } from './gov.light.svg';

const GovIcon: ThemeIcon = {
  light: GovLightIcon,
  dark: GovDarkIcon,
} as const;

export default GovIcon;
