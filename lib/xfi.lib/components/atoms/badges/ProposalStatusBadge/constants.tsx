import { ReactNode } from 'react';

import { DepositPeriodIcon, VotingPeriodIcon } from '../../../../icons';
import { ProposalStatusType } from '../../../../types';
import { Icon } from '../../Icon';

export const PROPOSAL_STATUS_CONFIG: {
  [key in ProposalStatusType]: { title: string; color: string; icon?: ReactNode };
} = {
  [ProposalStatusType.UNSPECIFIED]: {
    title: 'LIB.PROPOSALS.STATUS.UNSPECIFIED',
    color: 'neutrals.secondaryText',
  },
  [ProposalStatusType.PASSED]: {
    title: 'LIB.PROPOSALS.STATUS.PASSED',
    color: 'alerts.success',
  },
  [ProposalStatusType.FAILED]: {
    title: 'LIB.PROPOSALS.STATUS.FAILED',
    color: 'alerts.error',
  },
  [ProposalStatusType.REJECTED]: {
    title: 'LIB.PROPOSALS.STATUS.REJECTED',
    color: 'alerts.error',
  },
  [ProposalStatusType.DEPOSIT_PERIOD]: {
    title: 'LIB.PROPOSALS.STATUS.DEPOSIT_PERIOD',
    color: 'alerts.success',
    icon: <Icon src={DepositPeriodIcon} viewBox="0 0 20 20" sx={{ fontSize: '1.25rem' }} />,
  },
  [ProposalStatusType.VOTING_PERIOD]: {
    title: 'LIB.PROPOSALS.STATUS.VOTING_PERIOD',
    color: 'alerts.success',
    icon: <Icon src={VotingPeriodIcon} viewBox="0 0 20 20" sx={{ fontSize: '1.25rem' }} />,
  },
};
