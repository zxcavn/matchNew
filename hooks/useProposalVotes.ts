import { useEffect } from 'react';
import useAppDispatch from './useAppDispatch';

const useProposalVotes = (proposalId?: string) => {
  const dispatch = useAppDispatch();

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
  }, [proposalId]);

  return { getVotes};
};

export default useProposalVotes;
