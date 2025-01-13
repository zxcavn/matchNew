import type { Provider, Signer } from 'ethers';

export type NameWrapperServiceConstructor = {
  provider: Provider;
  address: string;
  signer: Signer;
  baseRegistrarAddress: string;
};

export type SafeTransferFromOptions = {
  to: string;
  nameLabel: string;
  from?: string;
};
