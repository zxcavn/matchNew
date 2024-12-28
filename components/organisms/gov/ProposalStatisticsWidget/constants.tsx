import { MxNumberFormatter } from '@xfi/formatters';
import type { ReactElement } from 'react';

import { NumberWithSuffix } from '@/lib/xfi.lib/components/atoms';
import { theme } from '@/lib/xfi.lib/theme';
import type { Proposal } from '@/store/gov';

import type { ProposalStat } from './helpers';

export type VoteStat = {
  title: string;
  percent: number;
  tokens: ReactElement;
  color: string;
};

export const getVotesStat = ({
  proposal,
  proposalStat,
}: {
  proposal?: Proposal;
  proposalStat: ProposalStat;
}): VoteStat[] => [
  {
    title: 'PROPOSALS.YES',
    percent: proposalStat.yesPercentage,
    tokens: <NumberWithSuffix value={MxNumberFormatter.formatUnits(proposal?.finalTallyResult?.yes || '0')} />,
    color: theme.palette.alerts.success,
  },
  {
    title: 'PROPOSALS.NO',
    percent: proposalStat.noPercentage,
    tokens: <NumberWithSuffix value={MxNumberFormatter.formatUnits(proposal?.finalTallyResult?.no || '0')} />,
    color: theme.palette.alerts.error,
  },
  {
    title: 'PROPOSALS.VETO',
    percent: proposalStat.noWithVetoPercentage,
    tokens: <NumberWithSuffix value={MxNumberFormatter.formatUnits(proposal?.finalTallyResult?.noWithVeto || '0')} />,
    color: theme.palette.alerts.error,
  },
  {
    title: 'PROPOSALS.VOTE.ABSTAIN',
    percent: proposalStat.abstainPercentage,
    tokens: <NumberWithSuffix value={MxNumberFormatter.formatUnits(proposal?.finalTallyResult?.abstain || '0')} />,
    color: theme.palette.alerts.error,
  },
];
