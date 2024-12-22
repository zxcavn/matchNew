import { TokenInventoryResponse } from '@/crud/xfiScan';
import { PaginatedState } from '@/shared/types';

export const PREFIX = 'TOKEN_INVENTORY';

export type Token = TokenInventoryResponse;
type TokenInventory = PaginatedState.Short<Token>;

export type TokenInventoryState = TokenInventory;

export const enum TokenInventoryFetchMethodsEnum {
  getTokenInventory = 'getTokenInventory',
}
