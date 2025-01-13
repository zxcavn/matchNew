import { useCallback, useState } from 'react';

import {
  FeeError,
  getFeeErrorMessage,
  getTxErrorMessage,
  isHandledEvmError,
  isSendNativeCoinsToContractError,
} from '@/helpers';
import { useSocketSubscription } from '@/hocs';
import { LoggerService } from '@/services';
import { EthersService } from '@/services/evm';
import { EstimatedFee, SendCoin } from '@/services/evm/types';

import useAppDispatch from './useAppDispatch';
import useWallet from './useWallet';

type SendCoinParams = {
  options: SendCoin.SendOptions;
  onInit: () => void;
  onSuccess: () => void;
  /** @param {FormattedMessageId} message */
  onError: (message: string) => void;
};

export const useSendEvmCoin = () => {
  const { subscribeTx } = useSocketSubscription();
  const dispatch = useAppDispatch();
  const {
    newWallet: { evmAddress },
    updateBalance,
  } = useWallet();

  const [feeData, setFeeData] = useState<{
    fee?: EstimatedFee;
    isLoading: boolean;
    error?: FeeError;
  }>({
    isLoading: false,
  });

  const [isLoadingSend, setIsLoadingSend] = useState(false);
  const [isPendingTx, setIsPendingTx] = useState(false);

  const resetFeeData = useCallback(() => {
    setFeeData({ isLoading: false });
  }, []);

  const calculateFee = useCallback(async (params: SendCoin.CalculateFeeOptions) => {
    try {
      setFeeData({
        isLoading: true,
      });

      const ethersService = EthersService.getInstance();
      const fee = await ethersService.getSendCoinFee(params);

      setFeeData({
        fee,
        isLoading: false,
      });
    } catch (e) {
      const error: FeeError = isSendNativeCoinsToContractError(e)
        ? { wallet: 'ERRORS.YOU_CANNOT_SEND_XFI_TO_CONTRACT_ADDRESS' }
        : getFeeErrorMessage(e);

      logError('calculateFee', e, params);
      setFeeData({
        isLoading: false,
        error,
      });
    }
  }, []);

  const sendCoin = useCallback(
    async ({ options, onInit, onSuccess, onError }: SendCoinParams) => {
      try {
        setIsLoadingSend(true);

        const ethersService = EthersService.getInstance();
        const tx = await ethersService.sendCoin(options);

        onInit();
        setIsPendingTx(true);
        subscribeTx(tx.hash, () => {
          updateBalance();
          onSuccess();
          setIsPendingTx(false);
        });
      } catch (error) {
        const message = isSendNativeCoinsToContractError(error)
          ? 'ERRORS.YOU_CANNOT_SEND_XFI_TO_CONTRACT_ADDRESS'
          : getTxErrorMessage(error);

        onError(message);
        logError('sendCoin', error, options);
      } finally {
        setIsLoadingSend(false);
      }
    },
    [evmAddress]
  );

  return {
    isLoadingSend,
    isPendingTx,
    isLoadingFee: feeData.isLoading,
    fee: feeData.fee,
    feeError: feeData.error,
    resetFeeData,
    calculateFee,
    sendCoin,
  };
};

const logError = (methodName: string, error: unknown, args: unknown) => {
  if (isHandledEvmError(error) || isSendNativeCoinsToContractError(error)) return;

  LoggerService.error({
    name: `useSendEvmCoin: ${methodName} method`,
    error,
    payload: {
      args,
      isEthersServiceInstanceExist: Boolean(EthersService.getInstanceSafely()),
    },
  });
};

export default useSendEvmCoin;
