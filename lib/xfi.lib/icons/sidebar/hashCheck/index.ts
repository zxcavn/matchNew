import type { ThemeIcon } from '../../types';
import { default as HashCheckDarkIcon } from './hashCheck.dark.svg';
import { default as HashCheckLightIcon } from './hashCheck.light.svg';

const HashCheckIcon: ThemeIcon = {
  light: HashCheckLightIcon,
  dark: HashCheckDarkIcon,
} as const;

export default HashCheckIcon;
