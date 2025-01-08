import { useCallback, useEffect, useState } from 'react';

import { TokenType, xfiScanApi } from '@/crud';
import { TokenResponse } from '@/crud/xfiScan/types/tokens';
import { TOKENS_LIMIT } from '@/shared/constants';


const useSearchTokens = ({ searchValue }: { searchValue: string }) => {
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [foundTokens, setFoundTokens] = useState<TokenResponse[]>([]);

  const getTokens = useCallback(async (page: number, searchValue: string) => {
    const {
      data: { docs, hasNext },
    } = await xfiScanApi.getTokens({
      tokenSymbol: searchValue,
      page,
      limit: TOKENS_LIMIT,
      tokenType: TokenType.CFC_20,
    });

    return { docs, hasNext };
  }, []);

  const getNext = useCallback(async (page: number, searchValue: string) => {
    const { docs, hasNext } = await getTokens(page, searchValue);

    setHasNext(hasNext);
    setPage(page);
    setFoundTokens(prev => [...prev, ...docs]);
  }, []);

  const onSearchTokens = useCallback(async (searchValue: string) => {
    const { docs, hasNext } = await getTokens(1, searchValue);

    setPage(1);
    setHasNext(hasNext);
    setFoundTokens(docs);
  }, []);


  useEffect(() => {
    async function getAllTokens() {
      const { docs, hasNext } = await getTokens(1, searchValue);

      setFoundTokens(docs);
      setHasNext(hasNext);
    }
    getAllTokens();
  }, []);

  return { page, hasNext, getNext, onSearchTokens };
};

export default useSearchTokens;
