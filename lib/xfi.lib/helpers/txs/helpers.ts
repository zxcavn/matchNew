import { MxNumberFormatter } from '@xfi/formatters';
import min from 'lodash/min';

import { type CoinType, CosmosCurrency } from '../../types';
import { normalizeXdsName } from '../xds';
import {
  type ConvertCoinMessage,
  type CreateValidatorMessage,
  type DelegateMessage,
  type EvmMessage,
  type FormatOptions,
  type FormattedTx,
  type FormattedTxMessage,
  type GasInfo,
  type MultisendMessage,
  type ParserParams,
  type RedelegateMessage,
  type RewardMessage,
  type SendMessage,
  type Transaction,
  type TransactionMessage,
  type TxOperationType,
  type UnjailMessage,
  DepositMessage,
  EvmTxType,
  LogEvent,
  LogEventType,
  MessageType,
  SubmitProposalMessage,
  VoteMessage,
} from './types';

export const DEFAULT_GAS_USED = '0';
export const DEFAULT_GAS_LIMIT = '20000000';

/**
 * @example
 * parseCurrencyString("1179777609702549mpx,392785807638139725xfi");
 * // returns { mpx: 1179777609702549, xfi: 392785807638139725 }
 * parseCurrencyString("1179777609702549mpx,392785807638139725xfi", {
 *  formatter: (value) =>  value / 10e12
 * });
 * // returns { mpx: 117.9777609702549, xfi: 39278.580763813974 }
 */
export const parseCurrencyString = (
  currencyString: string,
  { divider = ',', formatter = value => value }: ParserParams = {}
) => {
  const currencyRegExp = {
    mpx: /mpx/,
    xfi: /xfi/,
  } as const;
  const removeCharsRexExp = /\D/g;

  return currencyString.split(divider).reduce((result, part) => {
    const matchDenomArray = part.match(currencyRegExp.mpx) || part.match(currencyRegExp.xfi);
    const amount = part.replace(removeCharsRexExp, '');

    if (!matchDenomArray) return result;

    const [denom] = matchDenomArray;

    result[denom] = formatter(amount);

    return result;
  }, {} as { [key: string]: string }) as Partial<{ mpx: string; xfi: string }>;
};

export const calculateGasUsedPercent = (gasUsed = DEFAULT_GAS_USED, gasLimit = DEFAULT_GAS_LIMIT) => {
  const res =
    ((MxNumberFormatter.toBigInt(gasUsed) * MxNumberFormatter.parseUnits('1')) / MxNumberFormatter.toBigInt(gasLimit)) *
    100n;

  return MxNumberFormatter.formatUnits(res);
};

const getGasPrice = (baseGasPrice: string, maxPriorityFeePerGas: string, maxFeePerGas: string): string => {
  const defaultGasPrice = MxNumberFormatter.toBigInt('10000000000000');

  const gasPrice =
    min([
      MxNumberFormatter.toBigInt(baseGasPrice) + MxNumberFormatter.toBigInt(maxPriorityFeePerGas),
      MxNumberFormatter.toBigInt(maxFeePerGas),
    ]) || defaultGasPrice;

  return gasPrice.toString();
};

const getGasInfo = (message: TransactionMessage, tx: Transaction): GasInfo => {
  // unknown
  if (message.type === MessageType.OTHER) return { messageType: message.type };

  // cosmos
  if (message.type !== MessageType.EVM) {
    return {
      messageType: message.type,
      gasLimit: tx.gasLimit,
      gasUsed: tx.gasUsed,
      gasUsedPercent: calculateGasUsedPercent(tx.gasUsed, tx.gasLimit),
    };
  }

  // evm - DynamicFeeTx
  if (message.data['@type'] === EvmTxType.DYNAMIC_FEE) {
    const { base_fee_per_gas, gas_tip_cap, gas_fee_cap, gas } = message.data;

    const gasPrice = getGasPrice(base_fee_per_gas, gas_tip_cap, gas_fee_cap);
    const commissionAmount = calculateCommission(message, tx).amount;
    const priorityFee =
      MxNumberFormatter.toBigInt(commissionAmount) -
      MxNumberFormatter.toBigInt(base_fee_per_gas) * MxNumberFormatter.toBigInt(tx.gasUsed);

    return {
      messageType: message.type,
      gasLimit: tx.gasLimit,
      gasUsed: tx.gasUsed,
      gasPrice,
      maxFeePerGas: gas_fee_cap,
      maxPriorityFeePerGas: gas_tip_cap,
      priorityFee: priorityFee.toString(),
      gasUsedPercent: calculateGasUsedPercent(tx.gasUsed, gas),
    };
  }

  // evm - LegacyTx
  const { gas_price } = message.data;

  return {
    messageType: message.type,
    gasPrice: gas_price,
    gasLimit: tx.gasLimit,
    gasUsed: tx.gasUsed,
    gasUsedPercent: calculateGasUsedPercent(tx.gasUsed, tx.gasLimit),
  };
};

export const calculateCommission = (message: TransactionMessage, tx: Transaction): CoinType => {
  // cosmos
  if (message.type !== MessageType.EVM) {
    const feeAmount = tx.fee.amount.reduce((acc, curr) => acc + MxNumberFormatter.toBigInt(curr.amount), 0n);
    const denom = tx.fee.amount[0]?.denom || CosmosCurrency.mpx;

    return {
      denom,
      amount: feeAmount.toString(),
    };
  }

  // evm - DynamicFeeTx
  if (message.data['@type'] === EvmTxType.DYNAMIC_FEE) {
    const { base_fee_per_gas, gas_fee_cap, gas_tip_cap } = message.data;
    const effectiveGasPrice = getGasPrice(base_fee_per_gas, gas_tip_cap, gas_fee_cap);

    const amount =
      MxNumberFormatter.toBigInt(effectiveGasPrice) *
      min([(MxNumberFormatter.toBigInt(tx.gasLimit) * 150n) / 100n, MxNumberFormatter.toBigInt(tx.gasUsed)])!;

    return {
      denom: CosmosCurrency.xfi,
      amount: amount.toString(),
    };
  }

  // evm - LegacyTx
  const { gas_price } = message.data;

  const amount =
    MxNumberFormatter.toBigInt(gas_price) *
    min([(MxNumberFormatter.toBigInt(tx.gasLimit) * 150n) / 100n, MxNumberFormatter.toBigInt(tx.gasUsed)])!;

  return {
    denom: CosmosCurrency.xfi,
    amount: amount.toString(),
  };
};

const formatSendMessage = (message: SendMessage): FormattedTxMessage => {
  return {
    coins: message.amount.map(el => ({
      amount: el.amount,
      denom: el.denom,
    })),
    type: 'send',
    fromAddress: message.fromAddress,
    toAddress: message.toAddress,
  };
};

const formatDelegateMessage = (message: DelegateMessage): FormattedTxMessage => {
  const isDelegateMessage = message.type === MessageType.DELEGATE;

  return {
    coins: [
      {
        amount: message.amount.amount,
        denom: message.amount.denom,
      },
    ],
    type: message.type === MessageType.DELEGATE ? 'bond' : 'unbond',
    fromAddress: isDelegateMessage ? message.delegatorAddress : message.validatorAddress,
    toAddress: isDelegateMessage ? message.validatorAddress : message.delegatorAddress,
  };
};

const formatConvertCoinMessage = (message: ConvertCoinMessage): FormattedTxMessage => {
  return {
    coins: [
      {
        amount: message.coin.amount,
        denom: message.coin.denom,
      },
    ],
    type: 'convertCoin',
    fromAddress: message.fromAddress,
    toAddress: message.toAddress,
  };
};

const formatMultisendMessage = (message: MultisendMessage): FormattedTxMessage => {
  return {
    type: 'multisend',
    fromAddress: message.inputs[0].address,
    toAddress: message.outputs.map(({ address }) => address),
    coins: message.inputs[0].coins,
  };
};

const formatRedelegateMessage = (message: RedelegateMessage): FormattedTxMessage => {
  return {
    type: 'rebond',
    fromAddress: message.validatorSrcAddress,
    toAddress: message.validatorDstAddress,
    coins: [
      {
        amount: message.amount.amount,
        denom: message.amount.denom,
      },
    ],
  };
};

const formatRewardMessage = (message: RewardMessage, { tx, messageIndex }: FormatOptions): FormattedTxMessage => {
  const claimWithoutCoins: FormattedTxMessage = {
    type: 'claim',
    fromAddress: message.validatorAddress,
    toAddress: message.delegatorAddress,
    coins: [],
  };

  if (!Array.isArray(tx.logs[messageIndex]?.events)) {
    return claimWithoutCoins;
  }

  const rewardLog = tx.logs[messageIndex].events.find(({ type }) => type === LogEventType.WITHDRAW_REWARDS) as
    | Extract<LogEvent, { type: LogEventType.WITHDRAW_REWARDS }>
    | undefined;

  if (!rewardLog) return claimWithoutCoins;

  const { value: rewardString } = rewardLog.attributes.find(({ key }) => key === 'amount') ?? {};

  if (!rewardString) return claimWithoutCoins;

  const { xfi } = parseCurrencyString(rewardString);

  return {
    ...claimWithoutCoins,
    ...(xfi ? { coins: [{ amount: xfi, denom: CosmosCurrency.xfi }] } : {}),
  };
};

const getEvmMessageOperationType = (message: EvmMessage): TxOperationType => {
  const { data } = message.data;

  if (data) return 'contractCall';

  return 'evm';
};

const formatEvmMessage = (message: EvmMessage): FormattedTxMessage => {
  const { value, to, from, input } = message.data;

  return {
    type: getEvmMessageOperationType(message),
    evmTxType: message.data['@type'],
    toAddress: to,
    fromAddress: from,
    coins: [
      {
        amount: value,
        denom: CosmosCurrency.xfi,
      },
    ],
    input,
  };
};

const formatCreateValidatorMessage = (message: CreateValidatorMessage): FormattedTxMessage => {
  const { fromAddress, toAddress, amount } = message;

  return {
    type: 'createValidator',
    toAddress: toAddress,
    fromAddress: fromAddress,
    coins: [
      {
        amount: amount.amount,
        denom: amount.denom,
      },
    ],
  };
};

const formatMsgUnjailMessage = (message: UnjailMessage): FormattedTxMessage => {
  return {
    type: 'unjail',
    toAddress: message.toAddress,
    coins: [],
  };
};

const formatSubmitProposalMessage = (message: SubmitProposalMessage): FormattedTxMessage => {
  return {
    type: 'submitProposal',
    fromAddress: message.proposer,
    initialDeposit: message.initialDeposit,
    content: { ...message.content, type: message.content['@type'] },
    coins: [],
  };
};

const formatVoteMessage = (message: VoteMessage): FormattedTxMessage => {
  return {
    type: 'vote',
    fromAddress: message.fromAddress,
    vote: message.option,
    coins: [],
  };
};

const formatDepositMessage = (message: DepositMessage): FormattedTxMessage => {
  return {
    type: 'deposit',
    fromAddress: message.fromAddress,
    depositAmount: message.amount,
    coins: [],
  };
};

const formatMessage = (message: TransactionMessage, options: FormatOptions): FormattedTxMessage => {
  switch (message.type) {
    case MessageType.SEND: {
      return formatSendMessage(message);
    }

    case MessageType.DELEGATE:

    case MessageType.UNDELEGATE: {
      return formatDelegateMessage(message);
    }

    case MessageType.MULTISEND: {
      return formatMultisendMessage(message);
    }

    case MessageType.REDELEGATE: {
      return formatRedelegateMessage(message);
    }

    case MessageType.REWARD: {
      return formatRewardMessage(message, options);
    }

    case MessageType.EVM: {
      return formatEvmMessage(message);
    }

    case MessageType.CREATE_VALIDATOR: {
      return formatCreateValidatorMessage(message);
    }

    case MessageType.UNJAIL: {
      return formatMsgUnjailMessage(message);
    }

    case MessageType.SUBMIT_PROPOSAL: {
      return formatSubmitProposalMessage(message);
    }

    case MessageType.VOTE: {
      return formatVoteMessage(message);
    }

    case MessageType.DEPOSIT: {
      return formatDepositMessage(message);
    }

    case MessageType.CONVERT_COIN: {
      return formatConvertCoinMessage(message);
    }

    default: {
      return {
        type: 'other',
        coins: [],
      };
    }
  }
};

export function splitAndFormatTx(tx: Transaction): Array<FormattedTx> {
  return tx.messages.map((message, messageIndex) => {
    const formattedTxMessage = formatMessage(message, { messageIndex, tx });
    const commission = calculateCommission(message, tx);
    const evmTxHash = message.type === MessageType.EVM ? message.hash : undefined;
    const nonce = message.type === MessageType.EVM ? message.data.nonce : '';

    const xdsNameLabels = {
      fromAddress: tx.xds[formattedTxMessage.fromAddress || ''],
      toAddress: typeof formattedTxMessage.toAddress === 'string' ? tx.xds[formattedTxMessage.toAddress] : undefined,
    };
    const xdsNames: FormattedTx['xdsNames'] = {};

    if (xdsNameLabels.fromAddress) {
      xdsNames.fromAddress = normalizeXdsName(xdsNameLabels.fromAddress || '')?.name;
    }

    if (xdsNameLabels.toAddress) {
      xdsNames.toAddress = normalizeXdsName(xdsNameLabels.toAddress || '')?.name;
    }

    return {
      ...formattedTxMessage,
      txHash: tx.txHash,
      evmTxHash,
      height: tx.height,
      failed: Boolean(tx.code),
      code: tx.code,
      timestamp: tx.timestamp,
      commission,
      ...getGasInfo(message, tx),
      nonce,
      memo: tx.memo,
      xdsNames,
      proposalId: getProposalId(tx?.logs?.[0]?.events || []),
    };
  });
}

const getProposalId = (events: LogEvent[]) => {
  for (const event of events) {
    if (
      event.attributes &&
      (event.type === LogEventType.PROPOSAL_DEPOSIT || event.type === LogEventType.PROPOSAL_VOTE)
    ) {
      const proposalIdAttribute = event.attributes.find(attr => attr.key === 'proposal_id');

      if (proposalIdAttribute) {
        return proposalIdAttribute.value;
      }
    }
  }
};
