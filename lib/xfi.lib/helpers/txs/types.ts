import type { CoinType } from '../../types';
import type {
  mapConvertCoinResponse,
  mapCreateValidatorMessageResponse,
  mapDelegateMessageResponse,
  mapDepositMessageResponse,
  mapEvmMessageResponse,
  mapMultisendMessageResponse,
  mapRedelegateMessageResponse,
  mapRewardMessageResponse,
  mapSendMessageResponse,
  mapSubmitProposalMessageResponse,
  mapTransactionResponse,
  mapUnjailMessageResponse,
  mapVoteMessageResponse,
} from './mappers';

export type FormattedTx = {
  height: string;
  failed: boolean;
  timestamp: string;
  type: TxOperationType;
  txHash: string;
  evmTxHash?: string;
  commission: CoinType;
  xdsNames: Partial<{
    fromAddress: string;
    toAddress: string;
  }>;
  // FormattedTxMessage part
  coins: Array<CoinType>;
  fromAddress?: string;
  toAddress?: string | string[];
  memo?: string;
  evmTxType?: EvmTxType;
  gasPrice?: string;
  gasLimit?: string;
  gasUsed?: string;
  maxFeePerGas?: string;
  maxPriorityFeePerGas?: string;
  priorityFee?: string;
  gasUsedPercent?: string;
  nonce?: string;
  input?: EvmTxInput;
  data?: string;
  code?: number;
  internalType?: string;
  proposalId?: string;
  content?: {
    type: ProposalType;
  };
  initialDeposit?: CoinType;
  vote?: VoteOptions;
  depositAmount?: CoinType;
};

export type GasInfo =
  | {
      messageType: MessageType.EVM;
      gasPrice: string;
      gasLimit: string;
      gasUsed: string;
      maxFeePerGas?: string;
      maxPriorityFeePerGas?: string;
      priorityFee?: string;
      gasUsedPercent: string;
    }
  | {
      messageType: MessageType.OTHER;
    }
  | {
      messageType:
        | MessageType.DELEGATE
        | MessageType.MULTISEND
        | MessageType.REDELEGATE
        | MessageType.REWARD
        | MessageType.SEND
        | MessageType.UNDELEGATE
        | MessageType.CREATE_VALIDATOR
        | MessageType.UNJAIL
        | MessageType.SUBMIT_PROPOSAL
        | MessageType.VOTE
        | MessageType.DEPOSIT
        | MessageType.CONVERT_COIN;
      gasLimit: string;
      gasUsed: string;
      gasUsedPercent: string;
    };

export type FormatOptions = {
  messageIndex: number;
  tx: Transaction;
};

export type FormattedTxMessage = Omit<
  FormattedTx,
  'height' | 'failed' | 'timestamp' | 'txHash' | 'evmTxHash' | 'commission' | 'messageType' | 'xdsNames'
>;

export type ParserParams = {
  divider?: string;
  formatter?: (value: string) => string;
};

export type XdsResponse = Array<{
  address: string;
  name?: string;
  expires: string;
}>;

export type TransactionResponse = {
  txhash: string;
  auth_info: AuthInfo;
  body: Body;
  code: number;
  gas_used: string;
  gas_wanted: string;
  evm_txhashes?: string[];
  height: string;
  info: string;
  logs: Log[];
  signatures: string[];
  timestamp: string;
  xds?: XdsResponse;
};

export enum MessageType {
  DELEGATE = '/cosmos.staking.v1beta1.MsgDelegate',
  UNDELEGATE = '/cosmos.staking.v1beta1.MsgUndelegate',
  REDELEGATE = '/cosmos.staking.v1beta1.MsgBeginRedelegate',
  SEND = '/cosmos.bank.v1beta1.MsgSend',
  REWARD = '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
  MULTISEND = '/cosmos.bank.v1beta1.MsgMultiSend',
  EVM = '/ethermint.evm.v1.MsgEthereumTx',
  CREATE_VALIDATOR = '/cosmos.staking.v1beta1.MsgCreateValidator',
  UNJAIL = '/cosmos.slashing.v1beta1.MsgUnjail',
  SUBMIT_PROPOSAL = '/cosmos.gov.v1beta1.MsgSubmitProposal',
  VOTE = '/cosmos.gov.v1beta1.MsgVote',
  DEPOSIT = '/cosmos.gov.v1beta1.MsgDeposit',
  CONVERT_COIN = '/crossfi.erc20.v1.MsgConvertCoin',
  OTHER = 'other',
}

export enum EvmTxType {
  LEGACY = '/ethermint.evm.v1.LegacyTx',
  DYNAMIC_FEE = '/ethermint.evm.v1.DynamicFeeTx',
}

type Args = { [key: string]: string | undefined };

type EvmTxInput = {
  args: Args;
  contractName: string;
  methodName: string;
  signature: string;
  signatureFull: string;
};

export enum LogEventType {
  WITHDRAW_REWARDS = 'withdraw_rewards',
  SUBMIT_PROPOSAL = 'submit_proposal',
  PROPOSAL_DEPOSIT = 'proposal_deposit',
  PROPOSAL_VOTE = 'proposal_vote',
}

type AuthInfo = {
  fee: Fee;
};

type Fee = {
  amount: CoinType[];
  gas_limit: string;
  payer: string;
  granter: string;
};

type Body = {
  messages: MessageResponse[];
  memo: string;
};

export type MessageResponse =
  | SendMessageResponse
  | MultisendMessageResponse
  | DelegateMessageResponse
  | RedelegateMessageResponse
  | RewardMessageResponse
  | EvmMessageResponse
  | CreateValidatorMessageResponse
  | UnjailMessageResponse
  | SubmitProposalMessageResponse
  | VoteMessageResponse
  | ConvertCoinResponse
  | DepositMessageResponse;

export type UnjailMessageResponse = {
  '@type': MessageType.UNJAIL;
  validator_addr: string;
};

export type SendMessageResponse = {
  '@type': MessageType.SEND;
  from_address: string;
  to_address: string;
  amount: Array<CoinType>;
};

export type DelegateMessageResponse = {
  '@type': MessageType.DELEGATE | MessageType.UNDELEGATE;
  delegator_address: string;
  validator_address: string;
  amount: CoinType;
};

export type RewardMessageResponse = {
  '@type': MessageType.REWARD;
  delegator_address: string;
  validator_address: string;
};

export type RedelegateMessageResponse = {
  '@type': MessageType.REDELEGATE;
  validator_src_address: string;
  validator_dst_address: string;
  amount: CoinType;
};

export type MultisendMessageResponse = {
  '@type': MessageType.MULTISEND;
  inputs: MultisendInputsOutputs;
  outputs: MultisendInputsOutputs;
};

export type EvmMessageResponse = {
  '@type': MessageType.EVM;
  data: EvmTxLegacyData | EvmTxDynamicFeeData;
  hash: string;
};

export type CreateValidatorMessageResponse = {
  '@type': MessageType.CREATE_VALIDATOR;
  delegator_address: string;
  validator_address: string;
  value: CoinType;
};

export type SubmitProposalMessageResponse = {
  '@type': MessageType.SUBMIT_PROPOSAL;
  content: {
    '@type': ProposalType;
  };
  initial_deposit: CoinType[];
  proposer: string;
};

export type VoteMessageResponse = {
  '@type': MessageType.VOTE;
  option: VoteOptions;
  proposal_id: string;
  voter: string;
};

export type DepositMessageResponse = {
  '@type': MessageType.DEPOSIT;
  amount: CoinType[];
  proposal_id: string;
  depositor: string;
};

export type ConvertCoinResponse = {
  '@type': MessageType.CONVERT_COIN;
  receiver: string;
  sender: string;
  coin: CoinType;
};

export type OtherMessageResponse = {
  '@type': MessageType.OTHER;
};

type EvmTxSignature = {
  // base64
  r: string;
  // base64
  s: string;
  // base64
  v: string;
};

type EvmTxLegacyData = {
  '@type': EvmTxType.LEGACY;
  // base64
  data: string | null;
  gas: string;
  gas_price: string;
  gas_used: string;
  gas_limit: string;
  nonce: string;
  to?: string;
  from: string;
  value: string;
  input?: EvmTxInput;
} & EvmTxSignature;

type EvmTxDynamicFeeData = {
  '@type': EvmTxType.DYNAMIC_FEE;
  chain_id: string;
  // base64
  data: string | null;
  gas: string;
  gas_fee_cap: string;
  gas_tip_cap: string;
  base_fee_per_gas: string;
  gas_limit: string;
  gas_used: string;
  nonce: string;
  to?: string;
  from: string;
  value: string;
  input?: EvmTxInput;
} & EvmTxSignature;

export type MultisendInputsOutputs = Array<{
  address: string;
  coins: Array<CoinType>;
}>;

type Log = {
  msg_index: number;
  events: LogEvent[];
};

export type LogEvent =
  | {
      type: LogEventType.WITHDRAW_REWARDS;
      attributes: Array<{
        key: 'amount';
        value: string;
      }>;
    }
  | {
      type: LogEventType.SUBMIT_PROPOSAL | LogEventType.PROPOSAL_DEPOSIT | LogEventType.PROPOSAL_VOTE;
      attributes: Array<{
        key: 'proposal_id';
        value: string;
      }>;
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
  | 'submitProposal'
  | 'vote'
  | 'deposit'
  | 'unjail'
  | 'convertCoin';

export type Transaction = ReturnType<typeof mapTransactionResponse>;
export type DelegateMessage = ReturnType<typeof mapDelegateMessageResponse>;
export type RedelegateMessage = ReturnType<typeof mapRedelegateMessageResponse>;
export type SendMessage = ReturnType<typeof mapSendMessageResponse>;
export type RewardMessage = ReturnType<typeof mapRewardMessageResponse>;
export type MultisendMessage = ReturnType<typeof mapMultisendMessageResponse>;
export type EvmMessage = ReturnType<typeof mapEvmMessageResponse>;
export type CreateValidatorMessage = ReturnType<typeof mapCreateValidatorMessageResponse>;
export type UnjailMessage = ReturnType<typeof mapUnjailMessageResponse>;
export type SubmitProposalMessage = ReturnType<typeof mapSubmitProposalMessageResponse>;
export type VoteMessage = ReturnType<typeof mapVoteMessageResponse>;
export type DepositMessage = ReturnType<typeof mapDepositMessageResponse>;
export type ConvertCoinMessage = ReturnType<typeof mapConvertCoinResponse>;
export type OtherMessage = { type: MessageType.OTHER };

export type TransactionMessage =
  | DelegateMessage
  | RedelegateMessage
  | SendMessage
  | RewardMessage
  | MultisendMessage
  | EvmMessage
  | CreateValidatorMessage
  | UnjailMessage
  | SubmitProposalMessage
  | VoteMessage
  | DepositMessage
  | ConvertCoinMessage
  | OtherMessage;

export enum ProposalType {
  TEXT = '/cosmos.gov.v1beta1.TextProposal',
  SOFTWARE_UPGRADE = '/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal',
  COMMUNITY_POOL_SPEND = '/cosmos.distribution.v1beta1.CommunityPoolSpendProposal',
}

export enum VoteOptions {
  ABSTAIN = 'VOTE_OPTION_ABSTAIN',
  NO = 'VOTE_OPTION_NO',
  YES = 'VOTE_OPTION_YES',
  VETO = 'VOTE_OPTION_NO_WITH_VETO',
}
