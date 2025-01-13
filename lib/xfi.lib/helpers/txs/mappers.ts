import type {
  ConvertCoinResponse,
  CreateValidatorMessageResponse,
  DelegateMessageResponse,
  DepositMessageResponse,
  EvmMessageResponse,
  MessageResponse,
  MultisendMessageResponse,
  RedelegateMessageResponse,
  RewardMessageResponse,
  SendMessageResponse,
  SubmitProposalMessageResponse,
  TransactionResponse,
  UnjailMessageResponse,
  VoteMessageResponse,
  XdsResponse,
} from './types';
import { MessageType } from './types';

type FlattedXdsNames = {
  [address: string]: string | undefined;
};
const flatXdsNames = (response: XdsResponse): FlattedXdsNames => {
  return response.reduce((result, xds) => ((result[xds.address] = xds.name), result), {} as FlattedXdsNames);
};

export const mapTransactionResponse = (tx: TransactionResponse) => ({
  height: String(tx.height),
  txHash: tx.txhash,
  timestamp: tx.timestamp,
  code: tx.code,
  memo: tx.body.memo,
  gasUsed: tx.gas_used,
  gasLimit: tx.gas_wanted,
  logs: tx.logs,
  fee: tx.auth_info.fee,
  messages: mapMessages(tx.body.messages),
  xds: flatXdsNames(tx.xds || []),
});

export const mapDelegateMessageResponse = (message: DelegateMessageResponse) => ({
  type: message['@type'],
  delegatorAddress: message.delegator_address,
  validatorAddress: message.validator_address,
  amount: message.amount,
});

export const mapSendMessageResponse = (message: SendMessageResponse) => ({
  type: message['@type'],
  fromAddress: message.from_address,
  toAddress: message.to_address,
  amount: message.amount,
});

export const mapRewardMessageResponse = (message: RewardMessageResponse) => ({
  type: message['@type'],
  delegatorAddress: message.delegator_address,
  validatorAddress: message.validator_address,
});

export const mapRedelegateMessageResponse = (message: RedelegateMessageResponse) => ({
  type: message['@type'],
  validatorSrcAddress: message.validator_src_address,
  validatorDstAddress: message.validator_dst_address,
  amount: message.amount,
});

export const mapMultisendMessageResponse = (message: MultisendMessageResponse) => ({
  type: message['@type'],
  inputs: message.inputs,
  outputs: message.outputs,
});

export const mapEvmMessageResponse = (message: EvmMessageResponse) => {
  return {
    type: message['@type'],
    hash: message.hash,
    data: message.data,
  };
};

export const mapCreateValidatorMessageResponse = (message: CreateValidatorMessageResponse) => {
  return {
    type: message['@type'],
    fromAddress: message.delegator_address,
    toAddress: message.validator_address,
    amount: message.value,
  };
};

export const mapUnjailMessageResponse = (message: UnjailMessageResponse) => {
  return {
    type: message['@type'],
    toAddress: message.validator_addr,
  };
};

export const mapSubmitProposalMessageResponse = (message: SubmitProposalMessageResponse) => {
  return {
    type: message['@type'],
    initialDeposit: message.initial_deposit[0],
    content: message.content,
    proposer: message.proposer,
  };
};

export const mapVoteMessageResponse = (message: VoteMessageResponse) => {
  return {
    type: message['@type'],
    option: message.option,
    proposalId: message.proposal_id,
    fromAddress: message.voter,
  };
};

export const mapDepositMessageResponse = (message: DepositMessageResponse) => {
  return {
    type: message['@type'],
    amount: message.amount[0],
    proposalId: message.proposal_id,
    fromAddress: message.depositor,
  };
};

export const mapConvertCoinResponse = (message: ConvertCoinResponse) => {
  return {
    type: message['@type'],
    fromAddress: message.sender,
    toAddress: message.receiver,
    coin: message.coin,
  };
};

export const mapMessages = (messages: MessageResponse[]) => {
  return messages.map(message => {
    switch (message['@type']) {
      case MessageType.DELEGATE:

      case MessageType.UNDELEGATE: {
        return mapDelegateMessageResponse(message);
      }

      case MessageType.SEND: {
        return mapSendMessageResponse(message);
      }

      case MessageType.REWARD: {
        return mapRewardMessageResponse(message);
      }

      case MessageType.REDELEGATE: {
        return mapRedelegateMessageResponse(message);
      }

      case MessageType.MULTISEND: {
        return mapMultisendMessageResponse(message);
      }

      case MessageType.EVM: {
        return mapEvmMessageResponse(message);
      }

      case MessageType.CREATE_VALIDATOR: {
        return mapCreateValidatorMessageResponse(message);
      }

      case MessageType.UNJAIL: {
        return mapUnjailMessageResponse(message);
      }

      case MessageType.SUBMIT_PROPOSAL: {
        return mapSubmitProposalMessageResponse(message);
      }

      case MessageType.VOTE: {
        return mapVoteMessageResponse(message);
      }

      case MessageType.DEPOSIT: {
        return mapDepositMessageResponse(message);
      }

      case MessageType.CONVERT_COIN: {
        return mapConvertCoinResponse(message);
      }

      default: {
        return { type: <MessageType.OTHER>MessageType.OTHER };
      }
    }
  });
};
