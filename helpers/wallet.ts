import { MxNumberFormatter } from '@xfi/formatters';

import { Coin, CosmosCurrency } from '@/shared/types';
import type { WalletBalance } from '@/store/wallet';

// 1 mpx
const MPX = MxNumberFormatter.parseUnits('1');

export const filterWalletBalance = (coins: Coin[]): Coin[] => {
  return coins.filter(({ amount }) => Boolean(Number(amount)));
};

export const getAvailableBalanceForTransferAll = (balance: WalletBalance): Coin[] => {
  const amount = MxNumberFormatter.toBigInt(balance.mpx);
  const result = amount > MPX ? amount - MPX : 0n;

  return [
    { denom: CosmosCurrency.MPX, amount: result.toString() },
    { denom: CosmosCurrency.XFI, amount: balance.xfi },
  ];
};

export const calculateBalanceForTransferAll = (coins: Coin[], feeAmount: string): Coin[] => {
  return coins.map(({ amount: previousAmount, denom }) => {
    if (denom === CosmosCurrency.MPX) {
      const amount = MxNumberFormatter.toBigInt(previousAmount);
      const fee = MxNumberFormatter.toBigInt(feeAmount);
      const result = amount - fee;

      if (amount < fee) {
        throw new Error('Not enough balance amount for commission');
      }

      return { amount: result.toString(), denom };
    }

    return { amount: previousAmount, denom };
  });
};
