import { MxNumberFormatter } from '@xfi/formatters';
import { useCallback, useMemo } from 'react';

import { CosmosService } from '@/services';
import { WalletType } from '@/shared/types';
import { newWalletSelector, oldWalletSelector, setNewWalletBalance, setOldWalletBalance } from '@/store/wallet';

import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';

const MIN_MPX_AMOUNT = MxNumberFormatter.parseUnits('5');
const MIN_XFI_AMOUNT = MxNumberFormatter.parseUnits('0');

type UseWalletOptions = {
  walletType?: WalletType;
};

const useWallet = ({ walletType = WalletType.NEW }: UseWalletOptions = {}) => {
  const dispatch = useAppDispatch();
  const oldWallet = useAppSelector(oldWalletSelector);
  const newWallet = useAppSelector(newWalletSelector);

  const updateBalance = useCallback(async () => {
    try {
      const service = CosmosService.getInstance();
      const oldBalance = await service.getBalanceByCoins(oldWallet.address);
      const newBalance = await service.getBalanceByCoins(newWallet.address);

      dispatch(setOldWalletBalance({ xfi: oldBalance.xfi.amount, mpx: oldBalance.mpx.amount }));
      dispatch(setNewWalletBalance({ xfi: newBalance.xfi.amount, mpx: newBalance.mpx.amount }));
    } catch (error) {
      console.error('useWallet: updateBalance', error);
    }
  }, [dispatch, oldWallet.address, newWallet.address]);

  const hasOldBalance = useMemo(
    () =>
      MxNumberFormatter.toBigInt(oldWallet.balance.mpx) >= MIN_MPX_AMOUNT ||
      MxNumberFormatter.toBigInt(oldWallet.balance.xfi) > MIN_XFI_AMOUNT,
    [oldWallet.balance.mpx, oldWallet.balance.xfi]
  );

  return {
    oldWallet,
    newWallet,
    currentWallet: walletType === WalletType.OLD ? oldWallet : newWallet,
    hasOldBalance,
    updateBalance,
  };
};

export default useWallet;
