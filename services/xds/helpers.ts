import { Contract, ContractMethodArgs, namehash, Signer, TransactionResponse } from 'ethers';

import { ROOT_XDS_DOMAIN } from './constants';

export const getNameHash = (nameLabel: string): string => {
  return namehash(`${nameLabel}.${ROOT_XDS_DOMAIN}`);
};

type CreateMethodParams = {
  contract: Contract;
  signer: Signer;
  performAsyncFunc?: <R>(func: (...args: Array<any>) => Promise<R>) => Promise<R>;
};

export const createEstimateFeeMethod = ({ performAsyncFunc, signer, contract }: CreateMethodParams) => {
  return async function estimateFee<Args extends Array<unknown>>(
    method: string,
    args: ContractMethodArgs<Args>
  ): Promise<bigint> {
    const func = async () => {
      if (!signer.provider) {
        throw new Error('Provider is not exist in signer');
      }

      const { maxFeePerGas } = await signer.provider.getFeeData();

      if (!maxFeePerGas) {
        throw new Error('Provider is connected to the legacy network');
      }

      await contract[method].staticCall(...args);
      const gas = await contract[method].estimateGas(...args);

      return BigInt(gas * maxFeePerGas);
    };

    return performAsyncFunc ? performAsyncFunc(func) : func();
  };
};

export const createSendTransactionMethod = ({ performAsyncFunc, signer, contract }: CreateMethodParams) => {
  return async function sendTransaction<Args extends Array<unknown>>(
    method: string,
    args: ContractMethodArgs<Args>
  ): Promise<TransactionResponse> {
    const func = async () => {
      await contract[method].staticCall(...args);
      const tx = await contract[method].populateTransaction(...args);

      return signer.sendTransaction(tx);
    };

    return performAsyncFunc ? performAsyncFunc(func) : func();
  };
};
