import { redirect, redirectWithCompletion } from '@xfi/helpers';
import { useEffectOnce } from '@xfi/hooks';
import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect, useState } from 'react';

import { useAuth, useAutoLock } from '@/hooks';
import { useSettings } from '@/hooks/useSettings';
import { Loader } from '@/lib/xfi.lib/components/atoms';
import { LocalStorageService } from '@/services';
import { PAGES } from '@/shared/constants';

import { Page } from '@/components/templates';

import { ConnectionType, useWalletConnection, WalletConnectionEvent } from './WalletConnectionProvider';

const InitAppWrapper = ({ children }: PropsWithChildren) => {
  const { isTimeExpired } = useAutoLock();
  const { authorizeByExtension, authorizeByMnemonic } = useAuth();
  const { events, connectionType, disconnect } = useWalletConnection();
  const { asPath } = useRouter();
  const [loading, setLoading] = useState(true);

  const hideLoader = () => setLoading(false);

  const onSuccess = async () => {
    if (asPath === PAGES.home.pathname) {
      await redirectWithCompletion(PAGES.cosmosWallet);
    }

    hideLoader();
  };

  const onError = async (error: unknown) => {
    console.error(error);

    if (asPath !== PAGES.home.pathname) {
      await redirectWithCompletion(PAGES.home).catch(console.error);
    }

    hideLoader();
  };

  useSettings();

  useEffectOnce(() => {
    const mnemonic = LocalStorageService.getMnemonic();
    const lastConnectionType = LocalStorageService.getConnectionType();

    if (lastConnectionType === ConnectionType.MNEMONIC && mnemonic && !isTimeExpired()) {
      authorizeByMnemonic(mnemonic, { onSuccess, onError });

      return;
    }

    if (lastConnectionType === ConnectionType.EXTENSION) {
      authorizeByExtension({ onSuccess, onError });

      return;
    }

    onError('Unauthorized');
  });

  useEffect(() => {
    if (connectionType !== ConnectionType.EXTENSION) {
      return () => undefined;
    }

    const handler = () => {
      redirect(PAGES.home).then(() => disconnect());
    };

    events.on(WalletConnectionEvent.ACCOUNT_CHANGE, handler);

    return () => {
      events.off(WalletConnectionEvent.ACCOUNT_CHANGE, handler);
    };
  }, [connectionType]);

  return <Page>{loading ? <Loader variant="page" /> : children}</Page>;
};

export default InitAppWrapper;
