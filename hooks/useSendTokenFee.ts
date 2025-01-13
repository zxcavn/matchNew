import { useCallback, useState } from 'react';

import { FeeError, getFeeErrorMessage, isHandledEvmError } from '@/helpers/evmErrors';
import { LoggerService } from '@/services';
import { EthersService } from '@/services/evm';
import { Erc20, EstimatedFee } from '@/services/evm/types';

const useSendTokenFee = () => {
  const [data, setData] = useState<{
    feeData?: EstimatedFee;
    isLoading: boolean;
    error?: FeeError;
  }>({
    isLoading: false,
  });

  const calculateFee = useCallback(async (params: Erc20.CalculateFeeOptions) => {
    try {
      setData({
        isLoading: true,
      });

      const ethersService = EthersService.getInstance();
      const feeData = await ethersService.getSendErc20TokenFee(params);

      setData({
        feeData,
        isLoading: false,
      });
    } catch (error) {
      console.error(error);

      if (!isHandledEvmError(error)) {
        LoggerService.error({
          name: 'useSendTokenFee',
          error,
          payload: {
            isEthersServiceInstanceExist: Boolean(EthersService.getInstanceSafely()),
          },
        });
      }

      setData({
        isLoading: false,
        error: getFeeErrorMessage(error),
      });
    }
  }, []);

  const resetFeeData = useCallback(() => {
    setData({
      isLoading: false,
    });
  }, []);

  return {
    ...data,
    calculateFee,
    resetFeeData,
  };
};

export default useSendTokenFee;
