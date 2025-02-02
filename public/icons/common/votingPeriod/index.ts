import { ThemeIcon } from '../../types';
import { default as VotingPeriodDarkIcon } from './votingPeriod.dark.svg';
import { default as VotingPeriodLightIcon } from './votingPeriod.light.svg';

const VotingPeriodIcon: ThemeIcon = {
  light: VotingPeriodLightIcon,
  dark: VotingPeriodDarkIcon,
} as const;

export default VotingPeriodIcon;
