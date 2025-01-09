import { useEffect } from 'react';

import { newWalletSelector } from '@/store/wallet';

import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';

const useProposalVotes = (proposalId?: string) => {
  const dispatch = useAppDispatch();
  const newWallet = useAppSelector(newWalletSelector);

  const getVotes = async () => {
    if (proposalId) {

      try {

      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    getVotes();
  }, [proposalId, newWallet.address]);

  return { getVotes};
};

export default useProposalVotes;
