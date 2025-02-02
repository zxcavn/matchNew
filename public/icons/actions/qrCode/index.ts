import type { ThemeIcon } from '../../types';
import { default as QRCodeDarkIcon } from './qrCode.dark.svg';
import { default as QRCodeLightIcon } from './qrCode.light.svg';

const QRCodeIcon: ThemeIcon = {
  light: QRCodeLightIcon,
  dark: QRCodeDarkIcon,
} as const;

export default QRCodeIcon;
