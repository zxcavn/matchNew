import type { OfflineDirectSigner } from '@cosmjs/proto-signing/build/signer';
import type { Keplr } from '@keplr-wallet/types';
import { mxToHexAddress } from '@xfi/formatters';
import { useIsomorphicLayoutEffect } from '@xfi/hooks';
import type { Signer } from 'ethers';
import { type PropsWithChildren, createContext, useCallback, useContext, useState } from 'react';

import { isExtensionActionRejectedError } from '@/helpers';
import { useAppDispatch, useAutoLock } from '@/hooks';
import { CosmosKeplrSigner, CosmosService, CosmosSigner } from '@/services/cosmos';
import { EventEmitter } from '@/services/eventEmitter';
import { EthereumKeplrSigner, EthereumSigner, EthersService } from '@/services/evm';
import { LocalStorageService } from '@/services/localStorage';
import LoggerService from '@/services/loggerService';
import { KEPLR_CHAIN_CONFIG } from '@/shared/constants/keplrChainConfig';
import { CosmosCurrency, WalletType } from '@/shared/types';
import { logout, setNewWalletData, setOldWalletData, setWalletType } from '@/store/wallet';

import { useEvmRpcProvider } from '../EvmRpcProvider';
import {
  ConnectionType,
  ContextHandlers,
  ContextValues,
  KeplrEvent,
  LoadingState,
  WalletConnectionEvent,
} from './types';

const initialLoadingState: LoadingState = {
  mnemonic: false,
  extension: false,
};

const events = new EventEmitter();

const initialContextValue = {
  isConnected: false,
  isLoading: initialLoadingState,
  isExtensionSupported: false,
  connectionType: null,
  events,
} as ContextValues & ContextHandlers;

const Context = createContext(initialContextValue);

const WalletConnectionProvider = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch();
  const { updateAutoLockData } = useAutoLock();
  const evmRpcProvider = useEvmRpcProvider();

  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(initialLoadingState);
  const [isExtensionSupported, setIsExtensionSupported] = useState(Boolean(getKeplr()));
  const [connectionType, setConnectionType] = useState<ConnectionType | null>(null);

  useIsomorphicLayoutEffect(() => {
    const keplr = getKeplr();

    setIsExtensionSupported(Boolean(keplr));
  }, []);

  const setInitialWalletData = useCallback(async (connectionType: ConnectionType) => {
    try {
      const { newWallet, oldWallet, newBalance, oldBalance } = await getWalletData(connectionType);

      dispatch(
        setNewWalletData({
          address: newWallet.address,
          evmAddress: mxToHexAddress(newWallet.address),
          balance: { mpx: newBalance.mpx.amount, xfi: newBalance.xfi.amount },
        })
      );
      dispatch(
        setOldWalletData({
          address: oldWallet.address,
          balance: { mpx: oldBalance.mpx.amount, xfi: oldBalance.xfi.amount },
        })
      );
    } catch (e) {
      console.error('setInitialWalletData', e);
    }
  }, []);

  const createServiceInstances = useCallback(
    async (mnemonicOrKeplr: Keplr | string) => {
      const isMnemonic = typeof mnemonicOrKeplr === 'string';

      let cosmosSigner: OfflineDirectSigner;
      let ethereumSigner: Signer;

      if (isMnemonic) {
        const normalizedMnemonic = mnemonicOrKeplr.normalize('NFKD');

        cosmosSigner = await CosmosSigner.createFromMnemonic(normalizedMnemonic);
        ethereumSigner = EthereumSigner.createFromMnemonic(normalizedMnemonic);
      } else {
        cosmosSigner = new CosmosKeplrSigner(mnemonicOrKeplr, KEPLR_CHAIN_CONFIG.chainId);
        ethereumSigner = new EthereumKeplrSigner(null, mnemonicOrKeplr, KEPLR_CHAIN_CONFIG.chainId);
      }

      CosmosService.createInstance({ signer: cosmosSigner });
      EthersService.createInstance({ signer: ethereumSigner, provider: evmRpcProvider });
    },
    [evmRpcProvider]
  );

  const connectByMnemonic = useCallback(async (mnemonic: string) => {
    try {
      setIsLoading({ mnemonic: true });
      await createServiceInstances(mnemonic);
      await setInitialWalletData(ConnectionType.MNEMONIC);

      LocalStorageService.setMnemonic(mnemonic);
      LocalStorageService.setConnectionType(ConnectionType.MNEMONIC);
      setConnectionType(ConnectionType.MNEMONIC);
      updateAutoLockData();
      setIsConnected(true);
      setIsLoading({ mnemonic: false });

      dispatch(setWalletType(WalletType.NEW));
    } catch (error) {
      LoggerService.error({
        name: 'WalletConnectionProvider: connectByMnemonic',
        error,
        payload: {
          isCosmosServiceInstanceExist: Boolean(CosmosService.getInstanceSafely()),
          isEthersServiceInstanceExist: Boolean(EthersService.getInstanceSafely()),
        },
      });

      setIsLoading({ mnemonic: false });

      throw error;
    }
  }, []);

  const onKeystoreChange = useCallback(async () => events.emit(WalletConnectionEvent.ACCOUNT_CHANGE), []);

  const connectByExtension = useCallback(async () => {
    try {
      let keplr = getKeplr();

      if (!keplr) return;

      setIsLoading({ extension: true });

      await keplr.experimentalSuggestChain(KEPLR_CHAIN_CONFIG);
      await keplr.enable(KEPLR_CHAIN_CONFIG.chainId);
      keplr = getKeplr() || keplr;

      await createServiceInstances(keplr);
      await setInitialWalletData(ConnectionType.EXTENSION);

      LocalStorageService.setConnectionType(ConnectionType.EXTENSION);
      setConnectionType(ConnectionType.EXTENSION);
      setIsConnected(true);
      setIsLoading({ extension: false });

      window.addEventListener(KeplrEvent.KEYSTORE_CHANGE, onKeystoreChange);

      dispatch(setWalletType(WalletType.NEW));
    } catch (error) {
      if (!isExtensionActionRejectedError(error)) {
        LoggerService.error({
          name: 'WalletConnectionProvider: connectByExtension',
          error,
          payload: {
            isCosmosServiceInstanceExist: Boolean(CosmosService.getInstanceSafely()),
            isEthersServiceInstanceExist: Boolean(EthersService.getInstanceSafely()),
          },
        });
      }

      setIsLoading({ extension: false });

      throw error;
    }
  }, [onKeystoreChange]);

  const disconnect = useCallback(() => {
    LocalStorageService.setConnectionType(null);
    setIsConnected(false);
    setConnectionType(null);
    dispatch(logout());

    window.removeEventListener(KeplrEvent.KEYSTORE_CHANGE, onKeystoreChange);
    events.off(WalletConnectionEvent.ACCOUNT_CHANGE);
  }, []);

  return (
    <Context.Provider
      value={{
        isLoading,
        isConnected,
        isExtensionSupported,
        connectionType,
        events,
        connectByMnemonic,
        connectByExtension,
        disconnect,
      }}
    >
      {children}
    </Context.Provider>
  );
};

const getKeplr = (): Keplr | undefined => {
  if (typeof window !== 'undefined' && window?.keplr) {
    window.keplr.defaultOptions = {
      sign: {
        preferNoSetFee: true,
        preferNoSetMemo: true,
      },
    };

    return window.keplr;
  }
};

export const useWalletConnection = (): ContextValues & ContextHandlers => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('useWalletConnection must be used within a WalletConnectionProvider');
  }

  return context;
};

const getWalletData = async (connectionType?: ConnectionType | null) => {
  const cosmosService = CosmosService.getInstance();
  const { oldWallet, newWallet } = await cosmosService.getAccounts();
  const newBalance = await cosmosService.getBalanceByCoins(newWallet.address);
  const oldBalance =
    connectionType === ConnectionType.MNEMONIC
      ? await cosmosService.getBalanceByCoins(oldWallet.address)
      : {
          mpx: { denom: CosmosCurrency.MPX, amount: '0' },
          xfi: { denom: CosmosCurrency.XFI, amount: '0' },
        };

  return { oldWallet, newWallet, newBalance, oldBalance };
};

export default WalletConnectionProvider;
