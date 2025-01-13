import { ThemeIcon } from '../../types';
import { default as DepositPeriodDarkIcon } from './depositPeriod.dark.svg';
import { default as DepositPeriodLightIcon } from './depositPeriod.light.svg';

const DepositPeriodIcon: ThemeIcon = {
  light: DepositPeriodLightIcon,
  dark: DepositPeriodDarkIcon,
} as const;

export default DepositPeriodIcon;
