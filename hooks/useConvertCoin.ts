import { MxNumberFormatter } from '@xfi/formatters';
import { useCallback } from 'react';

import { pushErrorTxNotification, pushInitTxNotification } from '@/helpers';
import type { TransactionResponse } from '@/lib/xfi.lib/helpers';
import { type SendTransactionOptions, ConvertCoinOptions, CosmosMessageType } from '@/shared/types';

import useWalletTransaction from './useWalletTransaction';

const useConvertCoin = () => {
  const {
    isLoadingFee,
    isLoadingTransaction,
    fee: feeValue,
    feeError,
    isPendingTx,
    txError,
    error,
    sendTransaction,
    setFeeData,
    calculateFee: calculateTxFee,
    resetTransactionData,
  } = useWalletTransaction();

  const getTxOptions = useCallback((values: ConvertCoinOptions): SendTransactionOptions => {
    const { coin, mpxChequeBalance, gasCurrency } = values;

    return {
      type: CosmosMessageType.CONVERT_COIN,
      options: {
        coin: {
          amount: MxNumberFormatter.parseUnits(coin.amount).toString(),
          denom: coin.denom,
        },
        mpxChequeBalance,
        gasCurrency,
      },
    };
  }, []);

  const calculateFee = useCallback(
    (values: ConvertCoinOptions) => {
      calculateTxFee(getTxOptions(values));
    },
    [calculateTxFee]
  );

  const send = useCallback(
    ({
      values,
      onInitTx,
      onSuccess,
      onInitError,
    }: {
      values: ConvertCoinOptions;
      onInitTx?: () => void;
      onSuccess?: (tx: TransactionResponse) => void;
      onInitError?: () => void;
    }) => {
      sendTransaction(getTxOptions(values), {
        onInitTx: () => {
          onInitTx?.();
          pushInitTxNotification();
        },
        onSuccess: (_, tx: TransactionResponse) => {
          onSuccess?.(tx);
        },
        onInitError: error => {
          setFeeData(values => ({ ...values, error }));
          pushErrorTxNotification(error);
          onInitError?.();
        },
      });
    },
    []
  );

  return {
    send,
    calculateFee,
    fee: feeValue,
    setFeeData,
    resetTransactionData,
    isLoadingFee,
    feeError,
    error,
    isPendingTx,
    isLoadingTransaction,
    submitProposalError: txError,
  };
};

export default useConvertCoin;
