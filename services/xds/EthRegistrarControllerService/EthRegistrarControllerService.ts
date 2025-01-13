import { TransactionResponse } from 'ethers';

import { createEstimateFeeMethod, createSendTransactionMethod } from '../helpers';
import { BaseEthRegistrarControllerService } from './BaseEthRegistrarControllerService';
import { performAsyncOrThrowError } from './errors';
import type { EthRegistrarControllerServiceConstructor, RegisterOptions, RenewOptions } from './types';

export class EthRegistrarControllerService extends BaseEthRegistrarControllerService {
  constructor(args: EthRegistrarControllerServiceConstructor) {
    super(args);
  }

  async estimateRegisterFee({ value, ...commitOptions }: RegisterOptions): Promise<bigint> {
    const data = await this.createMakeCommitmentData(commitOptions);

    return this.estimateFee('register', [...data, { value }]);
  }

  async register({ value, ...commitOptions }: RegisterOptions): Promise<TransactionResponse> {
    const data = await this.createMakeCommitmentData(commitOptions);

    return this.sendTransaction('register', [...data, { value }]);
  }

  async estimateCommitFee(commitment: string): Promise<bigint> {
    return this.estimateFee('commit', [commitment]);
  }

  async commit(commitment: string): Promise<TransactionResponse> {
    return this.sendTransaction('commit', [commitment]);
  }

  async renew({ nameLabel, duration, value }: RenewOptions): Promise<TransactionResponse> {
    return this.sendTransaction('renew', [nameLabel, duration, { value }]);
  }

  async estimateRenewFee({ nameLabel, duration, value }: RenewOptions): Promise<bigint> {
    return this.estimateFee('renew', [nameLabel, duration, { value }]);
  }

  private estimateFee = createEstimateFeeMethod({
    performAsyncFunc: performAsyncOrThrowError,
    contract: this.contract,
    signer: this.signer,
  });

  private sendTransaction = createSendTransactionMethod({
    performAsyncFunc: performAsyncOrThrowError,
    contract: this.contract,
    signer: this.signer,
  });
}
