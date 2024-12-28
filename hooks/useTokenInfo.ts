import { useCallback, useState } from 'react';

import { Erc20, EthersService } from '@/services/evm';

const initialTokenValue: Erc20.TokenInfo = {
  contractAddress: '',
  name: '',
  symbol: '',
  decimals: 0,
};

const initialBalance = '0';

const useTokenInfo = () => {
  const [tokenData, setTokenData] = useState<{
    isLoading: boolean;
    error: string;
    tokenInfo: Erc20.TokenInfo;
    balance: string;
  }>({
    isLoading: false,
    error: '',
    tokenInfo: initialTokenValue,
    balance: initialBalance,
  });

  const getTokenInfo = useCallback(async (contractAddress: string) => {
    setTokenData(values => ({
      ...values,
      isLoading: true,
      tokenInfo: initialTokenValue,
      balance: initialBalance,
    }));

    try {
      const ethersService = EthersService.getInstance();
      const tokenInfo = await ethersService.getErc20TokenInfo({ contractAddress });
      const balance = await ethersService.balanceOfContract({ address: contractAddress });

      setTokenData({
        tokenInfo,
        balance,
        isLoading: false,
        error: '',
      });
    } catch {
      setTokenData({
        tokenInfo: initialTokenValue,
        balance: initialBalance,
        isLoading: false,
        error: 'ERRORS.CHECK_CONTRACT_ADDRESS',
      });
    }
  }, []);

  const resetTokenInfo = () =>
    setTokenData({
      tokenInfo: initialTokenValue,
      balance: initialBalance,
      isLoading: false,
      error: '',
    });

  return {
    getTokenInfo,
    resetTokenInfo,
    ...tokenData,
  };
};

export default useTokenInfo;
