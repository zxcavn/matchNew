import { MxNumberFormatter } from '@xfi/formatters';

import { type ChainRewardResponse, ChainRewardRecipientType } from '@/crud/xfiPad';

import type { ChainRewardCardData } from '@/components/molecules';

const RECIPIENT_TYPE_TITLE = {
  [ChainRewardRecipientType.VALIDATORS]: 'CHAIN_REWARDS.VALIDATORS.TITLE',
  [ChainRewardRecipientType.TMPX]: 'CHAIN_REWARDS.TMPX.TITLE',
  [ChainRewardRecipientType.ZEALY]: 'CHAIN_REWARDS.ZEALY.TITLE',
} as const;

const RECIPIENT_TYPE_DESCRIPTION = {
  [ChainRewardRecipientType.VALIDATORS]: 'CHAIN_REWARDS.VALIDATORS.DESCRIPTION',
  [ChainRewardRecipientType.TMPX]: 'CHAIN_REWARDS.TMPX.DESCRIPTION',
  [ChainRewardRecipientType.ZEALY]: 'CHAIN_REWARDS.ZEALY.DESCRIPTION',
} as const;

export const mapChainRewardsToCardData = (
  rewards: ChainRewardResponse[]
): (ChainRewardCardData & { id: string; recipientType: string })[] => {
  return rewards.map(({ id, recipientType, reward }) => {
    const title = RECIPIENT_TYPE_TITLE[recipientType] || '';
    const description = RECIPIENT_TYPE_DESCRIPTION[recipientType] || '';

    return {
      id,
      recipientType,
      title,
      description,
      amount: MxNumberFormatter.formatToDisplay(String(reward.amount), { maxFractionalLength: 6 }),
      currency: reward.currency.toUpperCase(),
    };
  });
};

export const calculateAmountForTransferXfi = (prevAmount: string, feeAmount: string) => {
  const amount = MxNumberFormatter.toBigInt(prevAmount);
  const fee = MxNumberFormatter.toBigInt(feeAmount);
  const result = amount - fee;

  return result.toString();
};
