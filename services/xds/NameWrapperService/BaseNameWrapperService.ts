import { Contract, Provider, Signer } from 'ethers';

import { getNameHash } from '../helpers';
import { ABI } from './abi';
import { BASE_REGISTRAR_IMPLEMENTATION_ABI } from './baseRegistrarImplementationAbi';
import { NameWrapperServiceConstructor } from './types';

/**
 * Base class with read methods and internal helper functions
 */
export abstract class BaseNameWrapperService {
  protected readonly contract: Contract;

  private readonly baseRegistrar: Contract;

  protected readonly signer: Signer;

  readonly address: string;

  private readonly provider: Provider;

  constructor({ provider, signer, address, baseRegistrarAddress }: NameWrapperServiceConstructor) {
    this.signer = signer.connect(provider);
    this.address = address;
    this.contract = new Contract(address, ABI, this.signer);
    this.baseRegistrar = new Contract(baseRegistrarAddress, BASE_REGISTRAR_IMPLEMENTATION_ABI, this.signer);
    this.provider = provider;
  }

  /**
   * @returns {[string, bigint, bigint]} [address, fuses, expiry(milliseconds)]
   */
  async getData(nameLabel: string): Promise<[string, bigint, bigint]> {
    const [owner, fuses, expiry] = await this.contract.getData(getNameHash(nameLabel));

    return [owner, fuses, expiry * 1000n];
  }

  /**
   * @returns {bigint} milliseconds
   */
  async gracePeriod(): Promise<bigint> {
    return (await this.baseRegistrar.GRACE_PERIOD()) * 1000n;
  }
}
