import { Contract, Provider, Signer } from 'ethers';

import { ABI } from './abi';
import type { AddressResolver, Resolver, ResolverServiceConstructor } from './types';

export abstract class BaseResolverService {
  readonly address: string;

  protected readonly contract: Contract;

  protected readonly provider: Provider;

  protected signer: Signer;

  constructor({ provider, address, signer }: ResolverServiceConstructor) {
    this.address = address;
    this.contract = new Contract(address, ABI, signer.connect(provider));
    this.provider = provider;
    this.signer = signer;
  }

  /**
   * interface id 0x3b3b57de
   */
  static async createIsAddressResolverTypeGuard(
    resolver: Resolver
  ): Promise<(v: unknown) => v is typeof resolver & AddressResolver> {
    const interfaceId = '0x3b3b57de';
    const isSupported = await resolver.supportsInterface(interfaceId).catch(() => false);

    return (v): v is typeof resolver & AddressResolver => isSupported;
  }
}
