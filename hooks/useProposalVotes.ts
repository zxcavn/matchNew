import { useCallback, useEffect, useState } from 'react';

import { getProposalVoteByAddressAsync, getProposalVotesAsync, govSelector, ProposalVote } from '@/store/gov';
import { newWalletSelector } from '@/store/wallet';

import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';

const useProposalVotes = (proposalId?: string) => {
  const dispatch = useAppDispatch();
  const newWallet = useAppSelector(newWalletSelector);
  const {
    votes: { page, pages, isLoading: isLoadingVotes },
    currentVote: { data: currentVote, isLoading: isLoadingCurrentVote },
  } = useAppSelector(govSelector);

  const [votesList, setVotesList] = useState<ProposalVote[]>([]);

  const getNext = useCallback(async () => {
    if (proposalId && page + 1 <= pages) {
      try {
        const res = await dispatch(getProposalVotesAsync({ proposalId, page: page + 1 })).unwrap();

        setVotesList(prev => [...prev, ...res.data]);
      } catch (e) {
        console.error(e);
      }
    }
  }, [proposalId, page, pages]);

  const getVotes = async () => {
    if (proposalId) {
      dispatch(getProposalVoteByAddressAsync({ proposalId, voter: newWallet.address }));

      try {
        const res = await dispatch(getProposalVotesAsync({ proposalId, page: 1 })).unwrap();

        setVotesList(res.data);
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    getVotes();
  }, [proposalId, newWallet.address]);

  return { votesList, currentVote, page, pages, isLoadingVotes, isLoadingCurrentVote, getVotes, getNext };
};

export default useProposalVotes;
