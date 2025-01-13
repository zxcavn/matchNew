import { useMemo } from 'react';

import {
  calculateBalanceForTransferAll,
  filterWalletBalance,
  getAvailableBalanceForTransferAll,
  pushErrorTxNotification,
  pushInitTxNotification,
} from '@/helpers';
import { CosmosCurrency, CosmosMessageType, TransactionResponse, WalletType } from '@/shared/types';

import useWallet from './useWallet';
import useWalletTransaction from './useWalletTransaction';

const useTransferOldBalance = () => {
  const { oldWallet, newWallet, updateBalance } = useWallet();
  const {
    error,
    fee,
    isLoadingFee,
    isLoadingTransaction,
    setFeeData,
    resetTransactionData,
    calculateFee: calculateTxFee,
    sendTransaction,
  } = useWalletTransaction();

  const availableBalance = useMemo(
    () => filterWalletBalance(getAvailableBalanceForTransferAll(oldWallet.balance)),
    [oldWallet.balance]
  );

  const setFeeError = () => {
    setFeeData(values => ({ ...values, error: 'ERRORS.NOT_ENOUGH_FOR_COMMISSION' }));
  };

  const calculateFee = () => {
    resetTransactionData();

    const hasMpx = !!availableBalance.find(({ denom }) => denom == CosmosCurrency.MPX);

    if (!hasMpx) {
      setFeeError();

      return;
    }

    calculateTxFee({
      type: CosmosMessageType.TRANSFER,
      options: {
        coins: availableBalance,
        destinationAddress: newWallet.address,
        walletType: WalletType.OLD,
        gasCurrency: CosmosCurrency.MPX,
        checkEnoughCommission: false,
      },
    });
  };

  const transfer = ({
    onSuccess,
    onInitTx,
  }: {
    onInitTx: (res: TransactionResponse) => void;
    onSuccess: (txHash: string) => void;
  }) => {
    if (!fee) return;

    try {
      const sendCoins = calculateBalanceForTransferAll(availableBalance, fee.amount);

      sendTransaction(
        {
          type: CosmosMessageType.TRANSFER,
          options: {
            coins: sendCoins,
            destinationAddress: newWallet.address,
            walletType: WalletType.OLD,
            gasCurrency: CosmosCurrency.MPX,
          },
        },
        {
          onInitTx: res => {
            onInitTx(res);
            pushInitTxNotification();
          },
          onInitError: error => pushErrorTxNotification(error),
          onSuccess: hash => {
            updateBalance();
            onSuccess?.(hash);
          },
        }
      );
    } catch {
      setFeeError();
    }
  };

  return {
    isLoading: isLoadingFee || isLoadingTransaction,
    fromAddress: oldWallet.address,
    toAddress: newWallet.address,
    fee,
    error,
    calculateFee,
    transfer,
    resetTransactionData,
  };
};

export default useTransferOldBalance;
