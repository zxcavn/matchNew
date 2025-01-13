import type { ThemeIcon } from '../../types';
import { default as EyeOpenDarkIcon } from './eyeOpen.dark.svg';
import { default as EyeOpenLightIcon } from './eyeOpen.light.svg';

const EyeOpenIcon: ThemeIcon = {
  light: EyeOpenLightIcon,
  dark: EyeOpenDarkIcon,
} as const;

export default EyeOpenIcon;
