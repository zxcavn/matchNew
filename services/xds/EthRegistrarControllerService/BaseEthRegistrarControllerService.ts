import { Contract, Provider, Signer } from 'ethers';

import { Resolver, ResolverService } from '../ResolverService';
import { ABI } from './abi';
import { CommitOptions, EthRegistrarControllerServiceConstructor } from './types';

/**
 * Base class with read methods and internal helper functions
 */
export abstract class BaseEthRegistrarControllerService {
  protected readonly contract: Contract;

  protected readonly provider: Provider;

  protected readonly signer: Signer;

  protected readonly resolver: Resolver;

  readonly address: string;

  constructor({ address, signer, provider, resolver }: EthRegistrarControllerServiceConstructor) {
    this.resolver = resolver;
    this.provider = provider;
    this.signer = signer.connect(provider);
    this.contract = new Contract(address, ABI, this.signer);
    this.address = address;
  }

  async makeCommitment(options: CommitOptions): Promise<string> {
    const data = await this.createMakeCommitmentData(options);

    return this.contract.makeCommitment(...data);
  }

  /**
   * @returns {bigint} milliseconds
   */
  async getCommitmentAge(commitment: string): Promise<bigint> {
    const latestBlock = await this.provider.getBlock('latest');
    const latestBlockTimestamp = latestBlock?.timestamp ? BigInt(latestBlock.timestamp) : BigInt(Date.now());
    const commitmentTimestamp = BigInt(await this.contract.commitments(commitment));

    return (latestBlockTimestamp - commitmentTimestamp) * 1000n;
  }

  /**
   * @returns {bigint} milliseconds
   */
  async maxCommitmentAge(): Promise<bigint> {
    return (await this.contract.maxCommitmentAge()) * 1000n;
  }

  /**
   * @returns {bigint} milliseconds
   */
  async minCommitmentAge(): Promise<bigint> {
    return (await this.contract.minCommitmentAge()) * 1000n;
  }

  /**
   * @returns {bigint} milliseconds
   */
  async minRegistrationDuration(): Promise<bigint> {
    return this.contract.MIN_REGISTRATION_DURATION();
  }

  /**
   * @returns {[bigint, bigint]} [basePrice, premiumPrice]
   */
  async rentPrice(nameLabel: string, duration: bigint): Promise<[bigint, bigint]> {
    const [base, premium] = await this.contract.rentPrice(nameLabel, duration);

    return [base, premium];
  }

  async available(nameLabel: string): Promise<boolean> {
    return this.contract.available(nameLabel);
  }

  async valid(nameLabel: string): Promise<boolean> {
    return this.contract.valid(nameLabel);
  }

  protected async createMakeCommitmentData({
    name,
    duration,
    secret,
    owner,
    resolver = this.resolver.address,
    reverseRecord = true,
    ownerControlledFuses = 0n,
    data: dataOption,
  }: CommitOptions) {
    const address = owner || (await this.signer.getAddress());

    let data: Array<unknown>;

    if (!dataOption) {
      const isAddressResolver = await ResolverService.createIsAddressResolverTypeGuard(this.resolver);

      data = isAddressResolver(this.resolver) ? [await this.resolver.encodeSetAddrData(name, address)] : [];
    } else {
      data = dataOption;
    }

    return [name, address, duration, secret, resolver, data, reverseRecord, ownerControlledFuses] as const;
  }
}
