import type { StatResponse } from '@/crud/xfiScan';

export const mapStatisticResponse = (response: StatResponse) => ({
  stakedCoins: response.staked_coins,
});
