import { useEffect, useRef } from 'react';

import { getStatisticAsync } from '@/store/stat';

import useAppDispatch from './useAppDispatch';

const TIME_PERIOD = 5000;

const useStatistics = () => {
  const dispatch = useAppDispatch();
  const interval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    dispatch(getStatisticAsync());
    interval.current = setInterval(() => {
      dispatch(getStatisticAsync());
    }, TIME_PERIOD);

    return () => {
      if (interval.current) clearInterval(interval.current);
    };
  }, [dispatch]);
};

export default useStatistics;
