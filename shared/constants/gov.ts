import { ProposalStatus } from '@/crud/cosmos';
import { ProposalBadgeType } from '@/lib/xfi.lib/components/atoms';
import { ProposalStatusType } from '@/lib/xfi.lib/types';

import { ProposalMessageType } from '../types';

export const PROPOSAL_STATUS = {
  [ProposalStatus.UNSPECIFIED]: ProposalStatusType.UNSPECIFIED,
  [ProposalStatus.PASSED]: ProposalStatusType.PASSED,
  [ProposalStatus.FAILED]: ProposalStatusType.FAILED,
  [ProposalStatus.REJECTED]: ProposalStatusType.REJECTED,
  [ProposalStatus.DEPOSIT_PERIOD]: ProposalStatusType.DEPOSIT_PERIOD,
  [ProposalStatus.VOTING_PERIOD]: ProposalStatusType.VOTING_PERIOD,
};

export const PROPOSAL_TYPE = {
  [ProposalMessageType.TEXT]: ProposalBadgeType.TEXT,
  [ProposalMessageType.COMMUNITY_POOL_SPEND]: ProposalBadgeType.COMMUNITY_POOL_SPEND,
  [ProposalMessageType.SOFTWARE_UPGRADE]: ProposalBadgeType.SOFTWARE_UPGRADE,
  [ProposalMessageType.MSG_SOFTWARE_UPGRADE]: ProposalBadgeType.MSG_SOFTWARE_UPGRADE,
  [ProposalMessageType.PARAMETER_CHANGE]: ProposalBadgeType.PARAMETER_CHANGE,
};
