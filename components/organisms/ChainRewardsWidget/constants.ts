import { ChainRewardRecipientType } from '@/crud/xfiPad';

export const FEE_BUFFER = '0.03';
export const PAID_REWARDS_AMOUNT: { [key in ChainRewardRecipientType]?: string } = {
  [ChainRewardRecipientType.TMPX]: '1',
  [ChainRewardRecipientType.XFT]: '2',
};
