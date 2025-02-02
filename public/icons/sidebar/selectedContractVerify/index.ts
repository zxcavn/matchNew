import type { ThemeIcon } from '../../types';
import { default as SelectedContractVerifyDarkIcon } from './selectedContractVerify.dark.svg';
import { default as SelectedContractVerifyLightIcon } from './selectedContractVerify.light.svg';

const SelectedContractVerifyIcon: ThemeIcon = {
  light: SelectedContractVerifyLightIcon,
  dark: SelectedContractVerifyDarkIcon,
} as const;

export default SelectedContractVerifyIcon;
