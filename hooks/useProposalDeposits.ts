import { useEffect } from 'react';
import useAppDispatch from './useAppDispatch';


const useProposalDeposits = (proposalId?: string) => {
  const dispatch = useAppDispatch();
 
  const getDeposits = async () => {
    if (proposalId) {
      try {
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    getDeposits();
  }, [proposalId]);

  return { getDeposits };
};

export default useProposalDeposits;
