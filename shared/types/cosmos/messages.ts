import { Coin as CosmosCoin } from '@cosmjs/stargate';
import { MsgDeposit, MsgSubmitProposal, MsgVote } from 'cosmjs-types/cosmos/gov/v1beta1/tx';

import type { MultisendInputsOutputs } from './operations';
import { Coin } from './shared';

export enum CosmosMessageType {
  TRANSFER = '/cosmos.bank.v1beta1.MsgSend',
  MULTISEND = '/cosmos.bank.v1beta1.MsgMultiSend',
  CONVERT_COIN = '/crossfi.erc20.v1.MsgConvertCoin',
  DELEGATE = '/cosmos.staking.v1beta1.MsgDelegate',
  UNDELEGATE = '/cosmos.staking.v1beta1.MsgUndelegate',
  REDELEGATE = '/cosmos.staking.v1beta1.MsgBeginRedelegate',
  REWARD = '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
  SUBMIT_PROPOSAL = '/cosmos.gov.v1beta1.MsgSubmitProposal',
  DEPOSIT = '/cosmos.gov.v1beta1.MsgDeposit',
  VOTE = '/cosmos.gov.v1beta1.MsgVote',
}

export enum ProposalMessageType {
  TEXT = '/cosmos.gov.v1beta1.TextProposal',
  SOFTWARE_UPGRADE = '/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal',
  COMMUNITY_POOL_SPEND = '/cosmos.distribution.v1beta1.CommunityPoolSpendProposal',
}

export type CosmosMessage =
  | {
      typeUrl: CosmosMessageType.TRANSFER;
      value: {
        fromAddress: string;
        toAddress: string;
        amount: (Coin | CosmosCoin)[];
      };
    }
  | {
      typeUrl: CosmosMessageType.MULTISEND;
      value: {
        inputs: MultisendInputsOutputs;
        outputs: MultisendInputsOutputs;
      };
    }
  | {
      typeUrl: CosmosMessageType.CONVERT_COIN;
      value: {
        coin: Coin;
        receiver: string;
        sender: string;
      };
    }
  | {
      typeUrl: CosmosMessageType.DELEGATE;
      value: {
        delegatorAddress: string;
        validatorAddress: string;
        amount: Coin;
      };
    }
  | {
      typeUrl: CosmosMessageType.UNDELEGATE;
      value: {
        delegatorAddress: string;
        validatorAddress: string;
        amount: Coin;
      };
    }
  | {
      typeUrl: CosmosMessageType.REDELEGATE;
      value: {
        delegatorAddress: string;
        validatorSrcAddress: string;
        validatorDstAddress: string;
        amount: Coin;
      };
    }
  | {
      typeUrl: CosmosMessageType.REWARD;
      value: {
        delegatorAddress: string;
        validatorAddress: string;
      };
    }
  | {
      typeUrl: CosmosMessageType.SUBMIT_PROPOSAL;
      value: MsgSubmitProposal;
    }
  | {
      typeUrl: CosmosMessageType.DEPOSIT;
      value: MsgDeposit;
    }
  | {
      typeUrl: CosmosMessageType.VOTE;
      value: MsgVote;
    };
