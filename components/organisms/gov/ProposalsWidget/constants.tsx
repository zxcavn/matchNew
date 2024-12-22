import { Stack, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { ProposalStatus } from '@/crud/cosmos';
import { ProposalBadge, ProposalEndTime, ProposalStatusBadge } from '@/lib/xfi.lib/components/atoms';
import { MultiColumnsListColumns, MultiColumnsListColumnTypesEnum } from '@/lib/xfi.lib/components/molecules';
import { NONE_VALUE, PROPOSAL_STATUS, PROPOSAL_TYPE } from '@/shared/constants';
import { Proposal } from '@/store/gov';

import { ProposalProgressBar } from '@/components/molecules';

export const MOBILE_COLUMNS: MultiColumnsListColumns<Proposal> = [
  {
    type: MultiColumnsListColumnTypesEnum.jsx,
    render: ({ content, proposalId, status }) => {
      return (
        <Stack p={'1rem'}>
          <Typography mb={'0.25rem'} variant="subtitle2" style={{ overflowWrap: 'break-word' }}>
            {content?.title || NONE_VALUE}
          </Typography>
          <Typography mb={'0.5rem'} variant="body2" color="neutrals.secondaryText">
            #{proposalId}
          </Typography>
          <ProposalStatusBadge status={PROPOSAL_STATUS[status]} isIconFirst={true} />
        </Stack>
      );
    },
  },
];

export const DESKTOP_COLUMNS = (minDepositAmount: string): MultiColumnsListColumns<Proposal> => [
  {
    type: MultiColumnsListColumnTypesEnum.jsx,
    render: ({ content, proposalId }) => {
      return (
        <Stack mr={'1.25rem'} gap={'0.5rem'} width={'15.25rem'}>
          <Typography
            variant="subtitle2"
            style={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
            {content?.title || NONE_VALUE}
          </Typography>
          <Typography variant="body2" color="neutrals.secondaryText">
            #{Number(proposalId) || 0}
          </Typography>
        </Stack>
      );
    },
  },
  {
    type: MultiColumnsListColumnTypesEnum.jsx,
    render: ({ content }) => {
      return (
        <Stack width={'13.75rem'} alignItems={'center'} justifyContent={'flex-start'}>
          <ProposalBadge type={PROPOSAL_TYPE[content?.type]} />
        </Stack>
      );
    },
  },
  {
    type: MultiColumnsListColumnTypesEnum.jsx,
    render: ({ status, depositEndTime, votingEndTime }) => {
      const isVotingDepositPeriod = status === ProposalStatus.VOTING_PERIOD || status === ProposalStatus.DEPOSIT_PERIOD;

      return (
        <Stack mr={'1.25rem'} gap={'0.5rem'} width={'15.3125rem'}>
          <ProposalStatusBadge status={PROPOSAL_STATUS[status]} />
          <Stack direction={'row'} gap={'0.25rem'}>
            <Typography variant="body2" color={'neutrals.secondaryText'}>
              <FormattedMessage id={isVotingDepositPeriod ? 'PROPOSALS.END' : 'PROPOSALS.ENDED'} />
            </Typography>
            <ProposalEndTime
              status={PROPOSAL_STATUS[status]}
              depositEndTime={depositEndTime}
              votingEndTime={votingEndTime}
            />
          </Stack>
        </Stack>
      );
    },
  },
  {
    type: MultiColumnsListColumnTypesEnum.jsx,
    align: 'right',
    render: data => {
      return (
        <Stack gap={'1.3125rem'} width={'19.4375rem'}>
          <ProposalProgressBar data={data} minDepositAmount={minDepositAmount} />
        </Stack>
      );
    },
  },
];
