import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { FeeError, getFeeErrorMessage, getTxErrorMessage, isHandledEvmError } from '@/helpers';
import { useSocketSubscription } from '@/hocs';
import useWallet from '@/hooks/useWallet';
import { LoggerService, NftStorageService } from '@/services';
import { EthersService } from '@/services/evm';
import { Erc721, EstimatedFee } from '@/services/evm/types';

type SendNftParams = {
  options: Erc721.SendOptions;
  onInit: () => void;
  onSuccess: () => void;
  onError: (message: string) => void;
};

type FeeData = {
  fee?: EstimatedFee;
  isLoading: boolean;
  error?: FeeError;
};

const useSendNft = () => {
  const dispatch = useDispatch();

  const { subscribeTx } = useSocketSubscription();

  const [isLoadingSend, setIsLoadingSend] = useState(false);
  const [isPendingTx, setIsPendingTx] = useState(false);
  const [feeData, setFeeData] = useState<FeeData>({
    isLoading: false,
  });

  const {
    updateBalance,
    newWallet: { evmAddress: senderAddress },
  } = useWallet();

  const resetFeeData = useCallback(() => {
    setFeeData({ isLoading: false });
  }, []);

  const calculateFee = useCallback(async (params: Erc721.CalculateFeeOptions) => {
    try {
      setFeeData({
        isLoading: true,
      });

      const ethersService = EthersService.getInstance();
      const fee = await ethersService.getSendErc721TokenFee(params);

      setFeeData({
        fee,
        isLoading: false,
      });
    } catch (e) {
      logError('calculateFee', e, params);
      setFeeData({
        isLoading: false,
        error: getFeeErrorMessage(e),
      });
    }
  }, []);

  const sendNft = useCallback(async ({ options, onInit, onSuccess, onError }: SendNftParams) => {
    try {
      setIsLoadingSend(true);

      const ethersService = EthersService.getInstance();

      const tx = await ethersService.sendErc721Token(options);

      onInit();
      setIsPendingTx(true);
      subscribeTx(tx.hash, () => {
        onSuccess();
        NftStorageService.removeItem(senderAddress, options.contractAddress.toLowerCase(), options.tokenId);
        updateBalance();
        setIsPendingTx(false);
      });
    } catch (error) {
      onError(getTxErrorMessage(error));
      logError('sendNft', error, options);
    } finally {
      setIsLoadingSend(false);
    }
  }, []);

  return {
    isLoadingSend,
    isPendingTx,
    isLoadingFee: feeData.isLoading,
    fee: feeData.fee,
    feeError: feeData.error,
    resetFeeData,
    calculateFee,
    sendNft,
  };
};

const logError = (methodName: string, error: unknown, args: unknown) => {
  if (isHandledEvmError(error)) return;

  LoggerService.error({
    name: `useSendNft: ${methodName} method`,
    error,
    payload: {
      args,
      isEthersServiceInstanceExist: Boolean(EthersService.getInstanceSafely()),
    },
  });
};

export default useSendNft;
