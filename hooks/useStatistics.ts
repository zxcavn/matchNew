import { useEffect, useRef } from 'react';
import useAppDispatch from './useAppDispatch';

const TIME_PERIOD = 5000;

const useStatistics = () => {
  const dispatch = useAppDispatch();
  const interval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    interval.current = setInterval(() => {
    }, TIME_PERIOD);

    return () => {
      if (interval.current) clearInterval(interval.current);
    };
  }, [dispatch]);
};

export default useStatistics;
