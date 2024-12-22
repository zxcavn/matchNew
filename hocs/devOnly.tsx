import { redirect } from '@xfi/helpers';
import { useIsomorphicLayoutEffect } from '@xfi/hooks';
import { ComponentType } from 'react';

import { APP_ENV, PAGES } from '@/shared/constants';

const devOnly = <T extends object>(Wrapped: ComponentType<T>) => {
  return function DevOnlyWrapper(props: T) {
    useIsomorphicLayoutEffect(() => {
      if (APP_ENV !== 'development') {
        redirect(PAGES.home);
      }
    }, []);

    return <Wrapped {...props} />;
  };
};

export default devOnly;
