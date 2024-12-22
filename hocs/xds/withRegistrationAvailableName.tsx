import { redirect } from '@xfi/helpers';
import { useIsomorphicLayoutEffect } from '@xfi/hooks';
import { ComponentType } from 'react';

import { useXdsNameAvailability, useXdsNamePageParam, XdsNameAvailabilityStatus } from '@/hooks/xds';
import { PAGES } from '@/shared/constants';
import type { PropsWithLoading } from '@/shared/types';

const withRegistrationAvailableName = <T extends PropsWithLoading>(Wrapped: ComponentType<T>) => {
  return function WithRegistrationAvailableNameWrapper(props: T) {
    const { name } = useXdsNamePageParam();
    const { isLoading, status } = useXdsNameAvailability(name, { debounceTimeout: 0 });

    useIsomorphicLayoutEffect(() => {
      if (isLoading || !status) return;

      if (status !== XdsNameAvailabilityStatus.AVAILABLE) {
        redirect(PAGES.xds.registration);
      }
    }, [name, isLoading, status]);

    return <Wrapped {...props} isLoading={isLoading} />;
  };
};

export default withRegistrationAvailableName;
