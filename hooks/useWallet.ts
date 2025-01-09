import { CosmosService } from '@/services';
import { WalletType } from '@/shared/types';
import { MxNumberFormatter } from '@xfi/formatters';
import { useCallback } from 'react';
import useAppDispatch from './useAppDispatch';

const MIN_MPX_AMOUNT = MxNumberFormatter.parseUnits('5');
const MIN_XFI_AMOUNT = MxNumberFormatter.parseUnits('0');

type UseWalletOptions = {
  walletType?: WalletType;
};

const useWallet = ({ walletType = WalletType.NEW }: UseWalletOptions = {}) => {
  const dispatch = useAppDispatch();

  const updateBalance = useCallback(async () => {
    try {
      const service = CosmosService.getInstance();

    } catch (error) {
      console.error('useWallet: updateBalance', error);
    }
  }, [dispatch]);

  return {
    currentWallet: walletType === WalletType.OLD,
    updateBalance,
  };
};

export default useWallet;
