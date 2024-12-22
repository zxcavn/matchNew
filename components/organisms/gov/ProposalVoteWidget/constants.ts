import { ProposalVoteOption } from '@/crud/cosmos';
import { theme } from '@/lib/xfi.lib/theme';

export const VOTE_CONFIG: {
  [key in ProposalVoteOption]: {
    text: string;
    myVoteText: string;
    color: string;
  };
} = {
  [ProposalVoteOption.VOTE_OPTION_YES]: {
    myVoteText: 'PROPOSALS.YOU_VOTED_FOR',
    text: 'PROPOSALS.VOTED_FOR',
    color: theme.palette.alerts.success,
  },
  [ProposalVoteOption.VOTE_OPTION_NO]: {
    myVoteText: 'PROPOSALS.YOU_VOTED_AGAINST',
    text: 'PROPOSALS.VOTED_AGAINST',
    color: theme.palette.alerts.error,
  },
  [ProposalVoteOption.VOTE_OPTION_NO_WITH_VETO]: {
    myVoteText: 'PROPOSALS.YOU_VOTED_VETO',
    text: 'PROPOSALS.VETO',
    color: theme.palette.background.light,
  },
  [ProposalVoteOption.VOTE_OPTION_ABSTAIN]: {
    myVoteText: 'PROPOSALS.YOU_VOTED_ABSTAIN',
    text: 'PROPOSALS.ABSTAIN',
    color: theme.palette.neutrals.secondaryText,
  },
};
