import { redirect } from '@xfi/helpers';
import { useIsomorphicLayoutEffect } from '@xfi/hooks';
import { useRouter } from 'next/router';
import { ComponentType, useState } from 'react';

import { useAppSelector, useIsAuthenticated } from '@/hooks';
import { PAGES } from '@/shared/constants';
import { profileSelector } from '@/store/profile/selectors';

const withAuth = <T extends object>(Wrapped: ComponentType<T>) => {
  return function WithAuthWrapper(props: T) {
    const { isReady: isRouterReady } = useRouter();
    const [redirecting, setRedirecting] = useState(false);
    const isAuthenticated = useIsAuthenticated();
    const { isReady: isProfileReady, isLoading } = useAppSelector(profileSelector);

    const isReady = isRouterReady && isProfileReady && !isLoading;

    const handleRedirect = async (path: string) => {
      setRedirecting(true);
      await redirect(path);
      setRedirecting(false);
    };

    useIsomorphicLayoutEffect(() => {
      if (isReady && !isAuthenticated) {
        handleRedirect(PAGES.home.pathname);
      }
    }, [isReady, isAuthenticated]);

    if (redirecting || !isAuthenticated) return null;

    return <Wrapped {...props} />;
  };
};

export default withAuth;
