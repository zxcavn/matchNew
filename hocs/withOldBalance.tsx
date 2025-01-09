import { redirect } from '@xfi/helpers';
import { useIsomorphicLayoutEffect } from '@xfi/hooks';
import { ComponentType } from 'react';

import { useAppDispatch, useShowOldBalance } from '@/hooks';
import { Bip39Service, LocalStorageService } from '@/services';
import { PAGES } from '@/shared/constants';

const withOldBalance = <T extends object>(Wrapped: ComponentType<T>) => {
  return function WithOldBalanceWrapper(props: T) {
    const showOldBalance = useShowOldBalance();
    const dispatch = useAppDispatch();

    useIsomorphicLayoutEffect(() => {
      const mnemonic = LocalStorageService.getMnemonic();

      if (!mnemonic || !Bip39Service.isValid(mnemonic)) {
        redirect(PAGES.home);
      }

      if (!showOldBalance) {
        redirect(PAGES.cosmosWallet);
      } else {
      }
    }, []);

    return <Wrapped {...props} />;
  };
};

export default withOldBalance;
