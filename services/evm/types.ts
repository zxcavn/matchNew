export type EstimatedFee = {
  amount: bigint;
  maxFeePerGas: bigint;
  maxPriorityFeePerGas: bigint;
};

export namespace Erc20 {
  export type TokenInfo = {
    name: string;
    symbol: string;
    decimals: number;
    contractAddress: string;
  };

  export type CalculateFeeOptions = {
    contractAddress: string;
    amount: string;
    recipientAddress: string;
  };

  export type SendOptions = CalculateFeeOptions;
}

export namespace SendCoin {
  export type CalculateFeeOptions = {
    amount: string;
    recipientAddress: string;
  };

  export type SendOptions = CalculateFeeOptions;
}

export namespace Erc721 {
  export type TokenInfo = {
    name: string;
    symbol: string;
    contractAddress: string;
  };

  export interface CalculateFeeOptions {
    contractAddress: string;
    recipientAddress: string;
    tokenId: string;
  }

  export type SendOptions = CalculateFeeOptions;
}
