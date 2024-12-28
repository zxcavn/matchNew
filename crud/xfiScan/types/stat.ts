import { Coin } from '@/shared/types';

export type StatResponse = {
  coins: Coin[];
  staked_coins: Coin[];
  unbonding_coins: Coin[];
  unclaimed_coins: Coin[];
  latest_block_hash: string;
  latest_block_height: string;
  latest_block_time: string;
  total_txs: string;
  total_addresses: string;
  validators: {
    active: number;
    inactive: number;
  };
};
