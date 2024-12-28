import type { ThemeIcon } from '../../types';
import { default as SelectedGovDarkIcon } from './selectedGov.dark.svg';
import { default as SelectedGovLightIcon } from './selectedGov.light.svg';

const SelectedGovIcon: ThemeIcon = {
  light: SelectedGovLightIcon,
  dark: SelectedGovDarkIcon,
} as const;

export default SelectedGovIcon;
