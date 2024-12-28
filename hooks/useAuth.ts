import { openNewSource } from '@xfi/helpers';
import { useCallback, useState } from 'react';

import { ConnectionType, useWalletConnection } from '@/hocs/WalletConnectionProvider';
import { EthersService } from '@/services/evm';
import { DOWNLOAD_KEPLR_LINK } from '@/shared/constants';
import type { AddNotificationPayload } from '@/store/notifications/types';
import { authorizeAsync } from '@/store/profile/thunk';

import useAppDispatch from './useAppDispatch';
import useFetchWalletInitialData from './useFetchWalletInitialData';

type Handlers = {
  onError: (message: AddNotificationPayload) => void;
  onSuccess: () => void;
};

const useAuth = () => {
  const dispatch = useAppDispatch();
  const { connectByMnemonic, connectByExtension, isExtensionSupported } = useWalletConnection();
  const fetchWalletInitialData = useFetchWalletInitialData();
  const [isLoadingExtension, setIsLoadingExtension] = useState(false);
  const [isLoadingMnemonic, setIsLoadingMnemonic] = useState(false);

  const authorizeByMnemonic = useCallback(
    async (mnemonic: string, { onSuccess, onError }: Handlers) => {
      try {
        setIsLoadingMnemonic(true);
        await connectByMnemonic(mnemonic);
        await dispatch(authorizeAsync({ signer: EthersService.getInstance().signer })).unwrap();
        await fetchWalletInitialData(ConnectionType.MNEMONIC);

        onSuccess();
      } catch {
        onError({
          type: 'error',
          message: { id: 'ERRORS.AUTH_ERROR' },
          additional: { id: 'MESSAGES.ERROR' },
        });
      } finally {
        setIsLoadingMnemonic(false);
      }
    },
    [connectByMnemonic, fetchWalletInitialData, dispatch]
  );

  const authorizeByExtension = useCallback(
    async ({ onSuccess, onError }: Handlers) => {
      if (!isExtensionSupported) {
        return openNewSource(DOWNLOAD_KEPLR_LINK);
      }

      try {
        setIsLoadingExtension(true);
        await connectByExtension();
        await dispatch(authorizeAsync({ signer: EthersService.getInstance().signer })).unwrap();
        await fetchWalletInitialData(ConnectionType.EXTENSION);

        onSuccess();
      } catch {
        onError({
          type: 'error',
          message: { id: 'ERRORS.KEPLR_CONNECTION' },
          additional: { id: 'MESSAGES.ERROR' },
        });
      } finally {
        setIsLoadingExtension(false);
      }
    },
    [connectByExtension, dispatch, fetchWalletInitialData, isExtensionSupported]
  );

  return {
    isLoading: {
      mnemonic: isLoadingMnemonic,
      extension: isLoadingExtension,
    },
    authorizeByMnemonic,
    authorizeByExtension,
  };
};

export default useAuth;
