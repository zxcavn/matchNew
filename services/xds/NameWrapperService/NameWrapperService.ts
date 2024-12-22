import { ContractMethodArgs, toBeHex, TransactionResponse, zeroPadBytes } from 'ethers';

import { createEstimateFeeMethod, createSendTransactionMethod, getNameHash } from '../helpers';
import { BaseNameWrapperService } from './BaseNameWrapperService';
import { performAsyncOrThrowError } from './errors';
import { NameWrapperServiceConstructor, SafeTransferFromOptions } from './types';

export class NameWrapperService extends BaseNameWrapperService {
  constructor(options: NameWrapperServiceConstructor) {
    super(options);
  }

  async safeTransferFrom(options: SafeTransferFromOptions): Promise<TransactionResponse> {
    return this.sendTransaction('safeTransferFrom', await this.getSafeTransferFromCallArgs(options));
  }

  async estimateSafeTransferFromFee(options: SafeTransferFromOptions): Promise<bigint> {
    return this.estimateFee('safeTransferFrom', await this.getSafeTransferFromCallArgs(options));
  }

  private async getSafeTransferFromCallArgs({
    nameLabel,
    from,
    to,
  }: SafeTransferFromOptions): Promise<ContractMethodArgs<any>> {
    const fromAddress = from || (await this.signer.getAddress());
    const namehash = getNameHash(nameLabel);
    const amount = 1n;
    const callData = zeroPadBytes(toBeHex('0'), 32);

    return [fromAddress, to, namehash, amount, callData];
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
