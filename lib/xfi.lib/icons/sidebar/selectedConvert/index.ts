import type { ThemeIcon } from '../../types';
import { default as SelectedConvertDarkIcon } from './selectedConvert.dark.svg';
import { default as SelectedConvertLightIcon } from './selectedConvert.light.svg';

const SelectedConvertIcon: ThemeIcon = {
  light: SelectedConvertLightIcon,
  dark: SelectedConvertDarkIcon,
} as const;

export default SelectedConvertIcon;
