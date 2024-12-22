import { Stack, Typography } from '@mui/material';
import { useDebouncedCallback } from '@xfi/hooks';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { useAppDispatch, useAppSelector, useProposalVotes, useVoteProposal } from '@/hooks';
import { Icon, Modal } from '@/lib/xfi.lib/components/atoms';
import { ArrowRightIcon } from '@/lib/xfi.lib/icons';
import { useMediaQuery } from '@/lib/xfi.lib/theme';
import { getProposalDetailsAsync, govSelector, Proposal } from '@/store/gov';

import { VoteProposalForm, VoteProposalFormValues } from '@/components/molecules';

import Content from './Content';
import { StyledProposalVoteWidget } from './styles';

type Props = {
  proposal?: Proposal;
};

const ProposalVoteWidget = ({ proposal }: Props) => {
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));
  const { votesList, currentVote, getVotes, getNext, isLoadingCurrentVote, isLoadingVotes } = useProposalVotes(
    proposal?.proposalId
  );

  const {
    govParams: { data: govParams },
  } = useAppSelector(govSelector);

  const [isOpenVoteForm, setIsOpenVoteForm] = useState(false);
  const [isOpenVoteModal, setIsOpenVoteModal] = useState(false);

  const { calculateFee, send, fee, setFeeData, isLoadingFee, isPendingTx, feeError, isLoadingTransaction } =
    useVoteProposal();

  const debouncedCalculateFee = useDebouncedCallback(calculateFee);

  const isLoadingVote = isLoadingFee || isLoadingTransaction || isPendingTx;
  const isDisabledVote = isLoadingVote;

  const onChangeVoteForm = (values: VoteProposalFormValues) => {
    if (proposal?.proposalId) {
      debouncedCalculateFee({ proposalId: proposal.proposalId, ...values });
    }
  };

  const onCancelVoteForm = () => {
    setIsOpenVoteForm(false);
    setFeeData({
      fee: null,
      isLoading: false,
    });
  };

  const onVote = (values: VoteProposalFormValues) => {
    if (proposal?.proposalId) {
      send({ proposalId: proposal.proposalId, ...values }, () => {
        setIsOpenVoteForm(false);
        dispatch(getProposalDetailsAsync({ proposalId: proposal.proposalId, withLoader: false }));
        getVotes();
      });
    }
  };

  const onHeaderClick = () => {
    if (isMobile) {
      setIsOpenVoteModal(true);
    }
  };

  const onEndReached = () => {
    getNext();
  };

  const onOpenVoteForm = () => {
    setIsOpenVoteModal(false);
    setIsOpenVoteForm(true);
  };

  return (
    <>
      <StyledProposalVoteWidget variant="transparent">
        <Stack gap={'1.5rem'}>
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            gap={'1.25rem'}
            sx={{
              cursor: isMobile ? 'pointer' : 'default',
            }}
            onClick={onHeaderClick}
          >
            <Typography variant="h4">
              <FormattedMessage id={'PROPOSALS.PROPOSAL_VOTES'} />
            </Typography>
            {isMobile && <Icon src={ArrowRightIcon} sx={{ fontSize: '1.25rem' }} viewBox="0 0 20 20" />}
          </Stack>
          <Content
            proposal={proposal}
            govParams={govParams}
            currentVote={currentVote}
            votes={votesList}
            showData={!isMobile}
            isLoadingContent={isLoadingVotes || isLoadingCurrentVote}
            isLoadingVoteBtn={isLoadingTransaction || isPendingTx}
            onEndReached={onEndReached}
            onOpenVoteForm={onOpenVoteForm}
          />
        </Stack>
      </StyledProposalVoteWidget>
      <Modal isOpen={isOpenVoteForm} setIsOpen={setIsOpenVoteForm} title={{ id: 'PROPOSALS.VOTE' }}>
        <VoteProposalForm
          fee={fee}
          feeError={feeError || undefined}
          isLoading={isLoadingVote}
          isDisabled={isDisabledVote}
          onChange={onChangeVoteForm}
          onSubmit={onVote}
          onCancel={onCancelVoteForm}
        />
      </Modal>
      <Modal isOpen={isOpenVoteModal} setIsOpen={setIsOpenVoteModal} title={{ id: 'PROPOSALS.PROPOSAL_VOTES' }}>
        <Content
          proposal={proposal}
          govParams={govParams}
          currentVote={currentVote}
          votes={votesList}
          isLoadingContent={isLoadingVotes || isLoadingCurrentVote}
          isLoadingVoteBtn={isLoadingTransaction || isPendingTx}
          onEndReached={onEndReached}
          onOpenVoteForm={onOpenVoteForm}
        />
      </Modal>
    </>
  );
};

export default ProposalVoteWidget;
