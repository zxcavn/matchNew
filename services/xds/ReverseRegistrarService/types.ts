import type { Provider, Signer } from 'ethers';

export type ReverseRegistrarServiceConstructor = {
  provider: Provider;
  address: string;
  signer: Signer;
};

export type SetNameOptions = {
  name: string;
};
