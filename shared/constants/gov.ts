import { ProposalBadgeType } from '@/lib/xfi.lib/components/atoms';

import { ProposalMessageType } from '../types';

export const PROPOSAL_TYPE = {
  [ProposalMessageType.TEXT]: ProposalBadgeType.TEXT,
  [ProposalMessageType.COMMUNITY_POOL_SPEND]: ProposalBadgeType.COMMUNITY_POOL_SPEND,
  [ProposalMessageType.SOFTWARE_UPGRADE]: ProposalBadgeType.SOFTWARE_UPGRADE,
  [ProposalMessageType.MSG_SOFTWARE_UPGRADE]: ProposalBadgeType.MSG_SOFTWARE_UPGRADE,
  [ProposalMessageType.PARAMETER_CHANGE]: ProposalBadgeType.PARAMETER_CHANGE,
};
