export type Block = {
  block_size: string;
  block_hash: string;
  txs: number[];
  sigs: Signature[];
  height: string;
  timestamp: string;
  evm: EvmBlockData;
};

type EvmBlockData = {
  baseFeePerGas: string;
  difficulty: string;
  extraData: string;
  gasLimit: string;
  gasUsed: string;
  hash: string;
  miner: string;
  nonce: string;
  number: string;
  parentHash: string;
  transactions: string[];
};

type Signature = {
  address: string;
  signed: boolean;
};

export interface Subscription {
  unsubscribe: () => void;
}

export enum SocketEvent {
  NEW_BLOCK = 'new-block',
  NEW_TX = 'new-tx',
}
