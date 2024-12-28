import { Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import { ProposalStatus } from '@/crud/cosmos';
import { useAppSelector } from '@/hooks';
import { ProposalBadge, ProposalEndTime, ProposalStatusBadge } from '@/lib/xfi.lib/components/atoms';
import { NONE_VALUE } from '@/lib/xfi.lib/constants';
import { PROPOSAL_STATUS, PROPOSAL_TYPE } from '@/shared/constants';
import { govSelector } from '@/store/gov';

import { StyledProposalDetailsHeading } from './styles';

const ProposalDetailsHeading = () => {
  const {
    proposal: { data: proposal },
  } = useAppSelector(govSelector);

  const isVotingDepositPeriod = useMemo(
    () => proposal?.status === ProposalStatus.VOTING_PERIOD || proposal?.status === ProposalStatus.DEPOSIT_PERIOD,
    [proposal]
  );

  return (
    <StyledProposalDetailsHeading>
      <Stack className="titleBadgeWrapper">
        <Typography variant="h4">#{proposal?.proposalId || 0}</Typography>
        <Typography className="title" variant="h4">
          {proposal?.content?.title || NONE_VALUE}
        </Typography>
        {proposal?.content?.type && (
          <ProposalBadge className="proposalType" type={PROPOSAL_TYPE[proposal.content.type]} />
        )}
      </Stack>
      <Stack mb={'2rem'} direction={'row'} alignItems={'center'} gap={'0.5rem'}>
        {proposal?.status && <ProposalStatusBadge status={PROPOSAL_STATUS[proposal.status]} />}
        {(proposal?.depositEndTime || proposal?.votingEndTime) && (
          <Stack direction={'row'} gap={'0.25rem'}>
            <Typography variant="body2" color={'neutrals.secondaryText'}>
              <FormattedMessage id={isVotingDepositPeriod ? 'PROPOSALS.END' : 'PROPOSALS.ENDED'} />
            </Typography>
            <ProposalEndTime
              status={PROPOSAL_STATUS[proposal.status]}
              depositEndTime={proposal.depositEndTime}
              votingEndTime={proposal.votingEndTime}
            />
          </Stack>
        )}
      </Stack>
    </StyledProposalDetailsHeading>
  );
};

export default ProposalDetailsHeading;
