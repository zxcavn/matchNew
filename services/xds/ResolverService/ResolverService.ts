import { getAddress, TransactionResponse } from 'ethers';

import { createEstimateFeeMethod, createSendTransactionMethod, getNameHash } from '../helpers';
import { BaseResolverService } from './BaseResolverService';
import type { AddressResolver, Resolver, ResolverServiceConstructor } from './types';
/**
 * PublicResolver
 * @see http://49.13.126.106:4000/address/0xf412955BC8a9EAa2829481F65734Da725B3A6F58
 */
export class ResolverService extends BaseResolverService implements Resolver, AddressResolver {
  constructor(options: ResolverServiceConstructor) {
    super(options);
  }

  async supportsInterface(interfaceId: string): Promise<boolean> {
    return this.contract.supportsInterface(interfaceId);
  }

  /** AddressResolver methods */
  async encodeSetAddrData(nameLabel: string, address: string): Promise<string> {
    const fragment = 'setAddr(bytes32 node, address addr)';

    return this.contract.interface.encodeFunctionData(fragment, [getNameHash(nameLabel), getAddress(address)]);
  }

  async addr(nameLabel: string): Promise<string> {
    return this.contract.addr(getNameHash(nameLabel));
  }

  async name(node: string): Promise<string | null> {
    return (await this.contract.name(node)) || null;
  }

  async setAddr(nameLabel: string, address: string): Promise<TransactionResponse> {
    return this.sendTransaction('setAddr', [getNameHash(nameLabel), getAddress(address)]);
  }

  async estimateSetAddrFee(nameLabel: string, address: string): Promise<bigint> {
    return this.estimateFee('setAddr', [getNameHash(nameLabel), getAddress(address)]);
  }
  /** AddressResolver methods */

  private estimateFee = createEstimateFeeMethod({
    contract: this.contract,
    signer: this.signer,
  });

  private sendTransaction = createSendTransactionMethod({
    contract: this.contract,
    signer: this.signer,
  });
}
