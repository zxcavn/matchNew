import { Color } from '../GradientBadge/GradientBadge';
import { ProposalBadgeType } from './types';

export const CONTENT_TYPE_CONFIG: {
  [key in ProposalBadgeType]: { title: string; color: Color };
} = {
  [ProposalBadgeType.TEXT]: {
    title: 'Text',
    color: 'purple',
  },
  [ProposalBadgeType.SOFTWARE_UPGRADE]: {
    title: 'Software Upgrade',
    color: 'turquoise',
  },
  [ProposalBadgeType.MSG_SOFTWARE_UPGRADE]: {
    title: 'Msg Software Upgrade',
    color: 'mintGreen',
  },
  [ProposalBadgeType.COMMUNITY_POOL_SPEND]: {
    title: 'Community Pool Spend',
    color: 'lightBlue',
  },
  [ProposalBadgeType.PARAMETER_CHANGE]: {
    title: 'Parameter Change',
    color: 'pink',
  },
};
