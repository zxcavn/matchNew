import { Contract, TransactionResponse } from 'ethers';

import { createEstimateFeeMethod, createSendTransactionMethod } from '../helpers';
import { ABI } from './abi';
import { ReverseRegistrarServiceConstructor, SetNameOptions } from './types';

export class ReverseRegistrarService {
  readonly address: string;

  readonly contract: Contract;

  constructor({ provider, signer: signerParam, address }: ReverseRegistrarServiceConstructor) {
    const signer = signerParam.connect(provider);

    this.contract = new Contract(address, ABI, signer);

    this.address = address;
    this.estimateFee = createEstimateFeeMethod({
      contract: this.contract,
      signer,
    });
    this.sendTransaction = createSendTransactionMethod({
      contract: this.contract,
      signer,
    });
  }

  private estimateFee: ReturnType<typeof createEstimateFeeMethod>;

  private sendTransaction: ReturnType<typeof createSendTransactionMethod>;

  async setName({ name }: SetNameOptions): Promise<TransactionResponse> {
    return this.sendTransaction('setName', [name]);
  }

  async estimateSetNameFee({ name }: SetNameOptions): Promise<bigint> {
    return this.estimateFee('setName', [name]);
  }

  async node(address: string): Promise<string> {
    return this.contract.node(address);
  }
}
