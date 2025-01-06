import { MxNumberFormatter } from '@xfi/formatters';
import { useCallback } from 'react';

import { pushErrorTxNotification, pushInitTxNotification, pushSuccessTxNotification } from '@/helpers';
import { CosmosCurrency, CosmosMessageType, SendTransactionOptions, WalletType } from '@/shared/types';

import useWallet from './useWallet';
import useWalletTransaction from './useWalletTransaction';

type DelegateData = {
  validatorAddress: string;
  amount: string;
  gasCurrency?: CosmosCurrency;
};

type UseDelegateOptions = {
  walletType?: WalletType;
};

const useDelegate = ({ walletType }: UseDelegateOptions) => {


  const { currentWallet } = useWallet({ walletType });
  const {
    isLoadingFee,
    isLoadingTransaction,
    error,
    formattedFee,
    calculateFee: calculateFeeBase,
    resetTransactionData,
    sendTransaction,
    isPendingTx,
  } = useWalletTransaction();


  const getTxOptions = useCallback(
    ({ validatorAddress, gasCurrency, amount }: DelegateData): SendTransactionOptions => {
      return {
        type: CosmosMessageType.DELEGATE,
        options: {
          validatorAddress: validatorAddress,
          gasCurrency: gasCurrency,
          coin: {
            amount: MxNumberFormatter.parseUnits(amount).toString(),
            denom: CosmosCurrency.MPX,
          },
          walletType,
        },
      };
    },
    [walletType]
  );

  const calculateFee = useCallback(
    (values: DelegateData) => {
      resetTransactionData();
      calculateFeeBase(getTxOptions(values));
    },
    [calculateFeeBase, getTxOptions, resetTransactionData]
  );

  const delegate = (values: DelegateData, { onInitTx }: { onInitTx: () => void }) => {
    sendTransaction(getTxOptions(values), {
      onInitTx: () => {
        onInitTx();
        pushInitTxNotification();
      },
      onSuccess: () => {

        pushSuccessTxNotification(CosmosMessageType.DELEGATE);
      },
      onInitError: error => pushErrorTxNotification(error),
    });
  };

  return {
    calculateFee,
    delegate,
    resetTransactionData,
    availableMpxBalance: currentWallet.balance.mpx,
    isLoadingFee,
    isLoadingTransaction,
    error,
    formattedFee,
    isPendingTx,
  };
};

export default useDelegate;
