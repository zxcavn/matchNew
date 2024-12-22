import { MxNumberFormatter } from '@xfi/formatters';
import { useCallback, useMemo, useState } from 'react';

import { getErrorMessage, isExtensionActionRejectedError } from '@/helpers';
import { useSocketSubscription } from '@/hocs';
import { CURRENCIES } from '@/lib/xfi.lib/constants';
import type { TransactionResponse as TxResponse } from '@/lib/xfi.lib/helpers';
import {
  CosmosService,
  CosmosServiceError,
  CosmosTransactionServiceBuilder,
  ICosmosTransactionService,
  LoggerService,
} from '@/services';
import { Coin, SendTransactionOptions, TransactionResponse, WalletType } from '@/shared/types';
import { getTransactionsAsync } from '@/store/txs';

import useAppDispatch from './useAppDispatch';
import useWallet from './useWallet';

type TxState = {
  isLoading: boolean;
  /** @type {FormattedMessageId} */
  error?: string;
};

type FeeState = {
  fee?: Coin | null;
  isLoading: boolean;
  /** @type {FormattedMessageId} */
  error?: string;
};

const txInitialState: TxState = { isLoading: false };
const feeInitialState: FeeState = { isLoading: false };

const useWalletTransaction = () => {
  const dispatch = useAppDispatch();
  const { newWallet, oldWallet, updateBalance } = useWallet();

  const [txData, setTxData] = useState<TxState>(txInitialState);
  const [feeData, setFeeData] = useState<FeeState>(feeInitialState);
  const [isPendingTx, setIsPendingTx] = useState(false);
  const { subscribeTx } = useSocketSubscription();

  const error = txData.error || feeData.error;

  const resetTransactionData = useCallback(() => {
    setTxData(txInitialState);
    setFeeData(feeInitialState);
  }, []);

  const calculateFee = useCallback(async ({ type, options }: SendTransactionOptions) => {
    try {
      setFeeData({ isLoading: true });

      const service: ICosmosTransactionService<typeof options> = CosmosTransactionServiceBuilder.build(type);
      const { amount } = await service.calculateFee(options);

      setFeeData({ isLoading: false, fee: amount[0] as Coin });
    } catch (e) {
      console.error(e);
      logError('calculateFee', e, { type, options });

      const error = getErrorMessage(e) || 'ERRORS.GET_COMMISSION_ERROR';

      setFeeData({ isLoading: false, error });
    }
  }, []);

  const formattedFee = useMemo(() => {
    const { isLoading: isLoadingFee, fee } = feeData;

    if (isLoadingFee || !fee) return null;

    return {
      denom: fee.denom,
      amount: MxNumberFormatter.formatUnitsToDisplay(fee.amount, {
        maxFractionalLength: CURRENCIES[fee.denom].formatDecimals,
      }),
    };
  }, [feeData]);

  const sendTransaction = useCallback(
    async (
      { type, options }: SendTransactionOptions,
      {
        onInitTx,
        onSuccess,
        onInitError,
      }: {
        onInitTx: (res: TransactionResponse) => void;
        onInitError?: (error: string) => void;
        onSuccess?: (txHash: string, tx: TxResponse) => void;
      }
    ) => {
      try {
        setTxData({ isLoading: true });

        const cosmosService: ICosmosTransactionService<typeof options> = CosmosTransactionServiceBuilder.build(type);
        const { txHash } = await cosmosService.send(options);

        onInitTx({ txHash });
        setIsPendingTx(true);
        resetTransactionData();
        subscribeTx(txHash, (_, tx: TxResponse) => {
          updateBalance();
          onSuccess?.(txHash, tx);
          setIsPendingTx(false);

          const isOldWalletTx = 'walletType' in options && options.walletType === WalletType.OLD;
          const address = isOldWalletTx ? oldWallet.address : newWallet.address;

          dispatch(getTransactionsAsync({ address, page: 1, existsEVM: false }));
        });
      } catch (e) {
        console.error(e);

        logError('sendTransaction', e, { type, options });
        const error = getErrorMessage(e) ?? 'ERRORS.TRANSACTION_ERROR';

        onInitError?.(error);
        setTxData({ isLoading: false, error });
      }
    },
    [oldWallet.address, newWallet.address]
  );

  return {
    resetTransactionData,
    calculateFee,
    sendTransaction,
    setFeeData,
    setTxData,
    isLoadingTransaction: txData.isLoading,
    isLoadingFee: feeData.isLoading,
    fee: feeData.fee,
    formattedFee,
    error,
    txError: txData.error,
    feeError: feeData.error,
    isPendingTx,
  };
};

const logError = (methodName: string, error: unknown, args: unknown) => {
  if (error instanceof CosmosServiceError || isExtensionActionRejectedError(error)) return;

  LoggerService.error({
    name: `useWalletTransaction: ${methodName} method`,
    error,
    payload: {
      args,
      isCosmosServiceInstanceExist: Boolean(CosmosService.getInstanceSafely()),
    },
  });
};

export default useWalletTransaction;
