import type { ThemeIcon } from '../../types';
import { default as AttachmentDarkIcon } from './attachment.dark.svg';
import { default as AttachmentLightIcon } from './attachment.light.svg';

const AttachmentIcon: ThemeIcon = {
  light: AttachmentLightIcon,
  dark: AttachmentDarkIcon,
} as const;

export default AttachmentIcon;
