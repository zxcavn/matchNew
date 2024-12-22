import { redirect } from '@xfi/helpers';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { ConnectionType, useWalletConnection } from '@/hocs/WalletConnectionProvider';
import { setLanguage } from '@/lib/i18n';
import { PAGES } from '@/shared/constants';
import { logout } from '@/store/profile';

import useAppDispatch from './useAppDispatch';
import useAutoLock from './useAutoLock';

export const useSettings = () => {
  const dispatch = useAppDispatch();
  const { disconnect, connectionType } = useWalletConnection();
  const { isTimeExpired } = useAutoLock();
  const { isReady, locale, asPath } = useRouter();

  useEffect(() => {
    if (connectionType === ConnectionType.MNEMONIC && isTimeExpired()) {
      dispatch(logout());
      redirect(PAGES.home).then(() => disconnect());
    }
  }, [asPath, connectionType]);

  useEffect(() => {
    if (!isReady) return;

    dispatch(setLanguage(locale));
  }, [isReady, locale]);
};
