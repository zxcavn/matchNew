import type { ThemeIcon } from '../../types';
import { default as ContractVerifyDarkIcon } from './contractVerify.dark.svg';
import { default as ContractVerifyLightIcon } from './contractVerify.light.svg';

const ContractVerifyIcon: ThemeIcon = {
  light: ContractVerifyLightIcon,
  dark: ContractVerifyDarkIcon,
} as const;

export default ContractVerifyIcon;
