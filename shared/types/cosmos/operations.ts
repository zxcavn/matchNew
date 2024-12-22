import { AccountData } from '@cosmjs/proto-signing';
import { SigningStargateClient } from '@cosmjs/stargate';
import { CommunityPoolSpendProposal } from 'cosmjs-types/cosmos/distribution/v1beta1/distribution';
import { TextProposal, VoteOption } from 'cosmjs-types/cosmos/gov/v1beta1/gov';
import { SoftwareUpgradeProposal } from 'cosmjs-types/cosmos/upgrade/v1beta1/upgrade';

import { CosmosMessage, CosmosMessageType, ProposalMessageType } from './messages';
import { Coin, CosmosCurrency, WalletType } from './shared';

type GasOptions = {
  gasCurrency?: CosmosCurrency;
};

type MemoOptions = {
  /**
   * @description memo string inside a transaction
   * @max max length - 256
   */
  memo?: string;
};

type CommonTransactionOptions = GasOptions &
  MemoOptions & {
    walletType?: WalletType;
  };

export type CalculateFeeBaseOptions = GasOptions &
  MemoOptions & {
    accountData: AccountData;
    client: SigningStargateClient;
    gasLimitCoefficient?: number;
    message: CosmosMessage;
  };

export type TransferOptions = CommonTransactionOptions & {
  coins: Coin[];
  destinationAddress: string;
  gasLimitCoefficient?: number;
  walletType: WalletType;
  checkEnoughCommission?: boolean;
};

export type MultisendInputsOutputs = Array<{ address: string; coins: Coin[] }>;

export type MultisendOptions = CommonTransactionOptions & {
  inputs: MultisendInputsOutputs;
  outputs: MultisendInputsOutputs;
};

export type ConvertCoinOptions = GasOptions & {
  coin: Coin;
  mpxChequeBalance: string;
};

export type DelegateOptions = CommonTransactionOptions & {
  validatorAddress: string;
  coin: Coin;
};

export type UndelegateOptions = DelegateOptions;

export type RedelegateOptions = CommonTransactionOptions & {
  coin: Coin;
  validatorSrcAddress: string;
  validatorDstAddress: string;
};

export type RewardOptions = CommonTransactionOptions & {
  validatorAddress: string;
};

export type SubmitProposalOptions = GasOptions & {
  content:
    | ({ type: ProposalMessageType.TEXT } & TextProposal)
    | ({ type: ProposalMessageType.COMMUNITY_POOL_SPEND } & CommunityPoolSpendProposal)
    | ({ type: ProposalMessageType.SOFTWARE_UPGRADE } & SoftwareUpgradeProposal);
  initialDeposit: {
    amount: string;
    denom: CosmosCurrency;
  };
};

export type DepositOptions = GasOptions & {
  proposalId: Long;
  amount: {
    amount: string;
    denom: CosmosCurrency;
  }[];
};

export type VoteOptions = GasOptions & {
  proposalId: Long;
  option: VoteOption;
};

export type SendTransactionOptions =
  | {
      type: CosmosMessageType.TRANSFER;
      options: TransferOptions;
    }
  | {
      type: CosmosMessageType.MULTISEND;
      options: MultisendOptions;
    }
  | {
      type: CosmosMessageType.CONVERT_COIN;
      options: ConvertCoinOptions;
    }
  | {
      type: CosmosMessageType.DELEGATE;
      options: DelegateOptions;
    }
  | {
      type: CosmosMessageType.UNDELEGATE;
      options: UndelegateOptions;
    }
  | {
      type: CosmosMessageType.REDELEGATE;
      options: RedelegateOptions;
    }
  | {
      type: CosmosMessageType.REWARD;
      options: RewardOptions;
    }
  | {
      type: CosmosMessageType.SUBMIT_PROPOSAL;
      options: SubmitProposalOptions;
    }
  | {
      type: CosmosMessageType.DEPOSIT;
      options: DepositOptions;
    }
  | {
      type: CosmosMessageType.VOTE;
      options: VoteOptions;
    };

export type TxOperationType =
  | 'send'
  | 'sendIn'
  | 'sendOut'
  | 'bond'
  | 'unbond'
  | 'claim'
  | 'receive'
  | 'rebond'
  | 'fail'
  | 'multisend'
  | 'other'
  | 'evm'
  | 'contractCall'
  | 'createValidator'
  | 'unjail'
  | 'submitProposal'
  | 'deposit'
  | 'vote';
