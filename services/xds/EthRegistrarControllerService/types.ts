import { Provider, Signer } from 'ethers';

import type { Resolver } from '../ResolverService';

export interface CommitOptions {
  name: string;
  owner?: string;
  duration: bigint;
  secret: string;
  resolver?: string;
  data?: unknown[];
  /**
   * set as primary name
   */
  reverseRecord?: boolean;
  ownerControlledFuses?: bigint;
}

export interface RegisterOptions extends CommitOptions {
  value: bigint;
}

export interface FeeData {
  maxFeePerGas: bigint;
  maxPriorityFeePerGas: bigint;
}

export interface EthRegistrarControllerServiceConstructor {
  provider: Provider;
  signer: Signer;
  address: string;
  resolver: Resolver;
}

export interface RenewOptions {
  nameLabel: string;
  duration: bigint;
  value: bigint;
}
