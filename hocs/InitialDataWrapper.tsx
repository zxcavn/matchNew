import { PropsWithChildren, useEffect } from 'react';

import { useAppDispatch, useIsAuthenticated } from '@/hooks';
import { IS_PRODUCTION } from '@/shared/constants';
import { getGovParamsAsync } from '@/store/gov';

const InitialDataWrapper = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated && !IS_PRODUCTION) {
      dispatch(getGovParamsAsync());
    }
  }, [isAuthenticated]);

  return children;
};

export default InitialDataWrapper;
