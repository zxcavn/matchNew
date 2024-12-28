import { redirect } from '@xfi/helpers';
import { useIsomorphicLayoutEffect } from '@xfi/hooks';
import { ComponentType } from 'react';

import { useAppDispatch, useShowOldBalance } from '@/hooks';
import { Bip39Service, LocalStorageService } from '@/services';
import { PAGES } from '@/shared/constants';
import { WalletType } from '@/shared/types';
import { setWalletType } from '@/store/wallet';

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
        dispatch(setWalletType(WalletType.NEW));
        redirect(PAGES.cosmosWallet);
      } else {
        dispatch(setWalletType(WalletType.OLD));
      }
    }, []);

    return <Wrapped {...props} />;
  };
};

export default withOldBalance;
