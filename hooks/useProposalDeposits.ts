import { useCallback, useEffect, useState } from 'react';

import { getProposalDepositsAsync, govSelector, ProposalDeposit } from '@/store/gov';

import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';

const useProposalDeposits = (proposalId?: string) => {
  const dispatch = useAppDispatch();
  const {
    deposits: { page, pages, isLoading: isLoadingDeposits },
  } = useAppSelector(govSelector);

  const [depositsList, setDepositsList] = useState<ProposalDeposit[]>([]);

  const getNext = useCallback(async () => {
    if (proposalId && page + 1 <= pages) {
      try {
        const res = await dispatch(getProposalDepositsAsync({ proposalId, page: page + 1 })).unwrap();

        setDepositsList(prev => [...prev, ...res.data]);
      } catch (e) {
        console.error(e);
      }
    }
  }, [proposalId, page, pages]);

  const getDeposits = async () => {
    if (proposalId) {
      try {
        const res = await dispatch(getProposalDepositsAsync({ proposalId, page: 1 })).unwrap();

        setDepositsList(res.data);
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    getDeposits();
  }, [proposalId]);

  return { depositsList, page, pages, isLoadingDeposits, getNext, getDeposits };
};

export default useProposalDeposits;
