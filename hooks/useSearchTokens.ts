import { useCallback, useEffect, useState } from 'react';


const useSearchTokens = ({ searchValue }: { searchValue: string }) => {
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);

  const getTokens = useCallback(async (page: number, searchValue: string) => {


    return { hasNext };
  }, []);

  const getNext = useCallback(async (page: number, searchValue: string) => {
    const { hasNext } = await getTokens(page, searchValue);

    setHasNext(hasNext);
    setPage(page);
  }, []);

  const onSearchTokens = useCallback(async (searchValue: string) => {
    const { hasNext } = await getTokens(1, searchValue);

    setPage(1);
    setHasNext(hasNext);
  }, []);


  useEffect(() => {
    async function getAllTokens() {
      const {hasNext } = await getTokens(1, searchValue);

      setHasNext(hasNext);
    }
    getAllTokens();
  }, []);

  return { page, hasNext, getNext, onSearchTokens };
};

export default useSearchTokens;
