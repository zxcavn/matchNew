export enum CosmosCurrency {
  MPX = 'mpx',
  XFI = 'xfi',
}

export const isCosmosCurrency = (value: string): value is CosmosCurrency => {
  return (<Array<string>>[CosmosCurrency.MPX, CosmosCurrency.XFI]).includes(value);
};

export enum WalletType {
  NEW = 'new',
  OLD = 'old',
}

export enum ChainType {
  COSMOS = 'cosmos',
  EVM = 'evm',
}

export interface Coin {
  denom: CosmosCurrency;
  amount: string;
}

export type TransactionResponse = {
  txHash: string;
};
