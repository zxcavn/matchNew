import { useCallback, useState } from 'react';

import { TokenType } from '@/crud';
import { getTxErrorMessage, isHandledEvmError } from '@/helpers';
import { useSocketSubscription } from '@/hocs';
import { LoggerService } from '@/services';
import { Erc20, EthersService } from '@/services/evm';
import { getTokenTransfersAsync, getTransactionsAsync } from '@/store/txs';

import useAppDispatch from './useAppDispatch';
import useWallet from './useWallet';

type SendTokenParams = {
  options: Erc20.SendOptions;
  onInit: () => void;
  onSuccess: () => void;
  /** @param {FormattedMessageId} message */
  onError: (message: string) => void;
};

const useSendToken = () => {
  const dispatch = useAppDispatch();
  const {
    newWallet: { evmAddress },
    updateBalance,
  } = useWallet();
  const { subscribeTx } = useSocketSubscription();
  const [isLoading, setIsLoading] = useState(false);
  const [isPendingTx, setIsPendingTx] = useState(false);

  const sendToken = useCallback(
    async ({ options, onInit, onSuccess, onError }: SendTokenParams) => {
      try {
        setIsLoading(true);

        const ethersService = EthersService.getInstance();
        const tx = await ethersService.sendErc20Token(options);

        onInit();
        setIsPendingTx(true);
        subscribeTx(tx.hash, () => {
          updateBalance();
          onSuccess();
          setIsPendingTx(false);
          dispatch(getTokenTransfersAsync({ address: evmAddress, page: 1, tokenType: TokenType.CFC_20 }));
          dispatch(getTransactionsAsync({ existsEVM: true, address: evmAddress, page: 1 }));
        });
      } catch (error) {
        console.error(error);
        onError(getTxErrorMessage(error));

        if (!isHandledEvmError(error)) {
          LoggerService.error({
            name: 'useSendToken',
            error,
            payload: {
              options,
              isEthersServiceInstanceExist: Boolean(EthersService.getInstanceSafely()),
            },
          });
        }
      } finally {
        setIsLoading(false);
      }
    },
    [evmAddress]
  );

  return {
    isLoading,
    isPendingTx,
    sendToken,
  };
};

export default useSendToken;
