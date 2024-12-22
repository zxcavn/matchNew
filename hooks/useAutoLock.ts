import { useCallback } from 'react';

import { LocalStorageService } from '@/services';
import { autoLockSelector } from '@/store/app/selectors';
import { setAutoLockData as setAutoLockDataAction } from '@/store/app/slice';
import { AutoLockData } from '@/store/app/types';

import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';

const useAutoLock = () => {
  const dispatch = useAppDispatch();
  const autoLock = useAppSelector(autoLockSelector);

  const setAutoLockData = useCallback((data: AutoLockData) => {
    dispatch(setAutoLockDataAction(data));
  }, []);

  const updateAutoLockData = useCallback(() => {
    const { timer, expiresIn } = LocalStorageService.getAutoLockData();

    if (!timer) return;

    const now = Date.now();

    if (!expiresIn || expiresIn < now) {
      dispatch(
        setAutoLockDataAction({
          timer,
          expiresIn: now + timer,
        })
      );
    }
  }, []);

  const isTimeExpired = useCallback(() => {
    const { timer, expiresIn } = LocalStorageService.getAutoLockData();
    const now = Date.now();

    return timer ? expiresIn < now : false;
  }, []);

  return {
    autoLock,
    updateAutoLockData,
    setAutoLockData,
    isTimeExpired,
  };
};

export default useAutoLock;
