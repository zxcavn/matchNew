export type ProfileResponse = {
  id: string;
  wallets: Wallet[];
  balance: { [key in BalanceKey]: string };
};

export type Wallet = {
  address: string;
  chainId: string;
  isEVMWallet: boolean;
};

export enum BalanceKey {
  XFI = 'xfi',
  MPX = 'mpx',
  XFT = 'xft',
}
