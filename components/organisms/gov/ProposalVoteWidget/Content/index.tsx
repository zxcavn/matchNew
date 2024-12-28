import { Stack, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { Virtuoso } from 'react-virtuoso';

import { Button, Loader } from '@/lib/xfi.lib/components/atoms';
import { GovParams, Proposal, ProposalVote } from '@/store/gov';

import { InfoText } from '@/components/atoms';
import { ProposalProgressBar } from '@/components/molecules';

import { VOTE_CONFIG } from '../constants';
import DataRow from '../DataRow';
import { StyledContent, StyledVotesContainer } from './styles';

type Props = {
  proposal?: Proposal;
  govParams?: GovParams;
  currentVote?: ProposalVote;
  votes: ProposalVote[];
  showData?: boolean;
  isLoadingVoteBtn: boolean;
  isLoadingContent: boolean;
  onEndReached: () => void;
  onOpenVoteForm: () => void;
};

const Content = ({
  proposal,
  govParams,
  currentVote,
  votes,
  showData = true,
  isLoadingVoteBtn,
  isLoadingContent,
  onEndReached,
  onOpenVoteForm,
}: Props) => (
  <StyledContent>
    {isLoadingContent && <Loader />}
    {proposal && (
      <Stack className="progressWrapper">
        <ProposalProgressBar data={proposal} minDepositAmount={govParams?.depositParams.minDeposit.amount || '0'} />
      </Stack>
    )}
    {showData && (
      <Stack className="rowsWrapper">
        <Virtuoso
          className={'virtuosoContainer'}
          components={{
            List: StyledVotesContainer,
          }}
          data={votes}
          totalCount={votes.length}
          firstItemIndex={0}
          initialTopMostItemIndex={0}
          endReached={onEndReached}
          itemContent={(_, item) => <DataRow key={item.voter} item={item} />}
        />
      </Stack>
    )}
    {isLoadingContent && <Stack style={{ width: '100%', height: '2.375rem' }} />}
    {!isLoadingContent && currentVote && (
      <Stack className="button" direction={'row'} gap={'1.25rem'} justifyContent={'space-between'}>
        <Typography
          variant="subtitle2"
          sx={{
            color: VOTE_CONFIG[currentVote.option.name].color,
          }}
        >
          <FormattedMessage id={VOTE_CONFIG[currentVote.option.name].myVoteText} />
        </Typography>
        <Button className="changeButton" variant="transparent" isLoading={isLoadingVoteBtn} onClick={onOpenVoteForm}>
          <FormattedMessage id={'PROPOSALS.CHANGE'} />
        </Button>
      </Stack>
    )}
    {!isLoadingContent && !currentVote && (
      <>
        <Button
          className="button"
          size="large"
          isFullWidth={true}
          isLoading={isLoadingVoteBtn}
          onClick={onOpenVoteForm}
        >
          <FormattedMessage id={'PROPOSALS.VOTE'} />
        </Button>
        <Stack gap={'0.5rem'}>
          <InfoText formattedText={{ id: 'PROPOSALS.IF_YOU_DONT_VOTE' }} />
          <InfoText formattedText={{ id: 'PROPOSALS.YOU_CAN_CHANGE_YOUR_VOTE' }} />
        </Stack>
      </>
    )}
  </StyledContent>
);

export default Content;
