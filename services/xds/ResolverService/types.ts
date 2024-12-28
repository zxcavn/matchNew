import type { Provider, Signer } from 'ethers';

export interface Resolver {
  address: string;
  supportsInterface(interfaceId: string): Promise<boolean>;
}

export type ResolverServiceConstructor = {
  provider: Provider;
  address: string;
  signer: Signer;
};

// 0x3b3b57de
export interface AddressResolver {
  addr(node: string): Promise<unknown>;
  setAddr(node: string, address: string): Promise<unknown>;
  encodeSetAddrData(name: string, address: string): Promise<string>;
}
