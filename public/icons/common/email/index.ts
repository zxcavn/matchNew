import type { ThemeIcon } from '../../types';
import { default as EmailDarkIcon } from './email.dark.svg';
import { default as EmailLightIcon } from './email.light.svg';

const EmailIcon: ThemeIcon = {
  light: EmailLightIcon,
  dark: EmailDarkIcon,
} as const;

export default EmailIcon;
