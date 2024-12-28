import urlJoin from 'url-join';

import { BasePaginationParams, FetchOptions } from '../types';
import { xfiScanAxiosInstance } from './axiosInstance';
import type {
  AddressInfoResponse,
  GetAddressInfoParams,
  GetTokenInventoryParams,
  GetTransactionListParams,
  ResolvedXdsNameOrAddressResponse,
  StatResponse,
  TokenInventoryListResponse,
  TokenInventoryResponse,
  TransactionListPaginatedResponse,
  ValidatorListResponse,
  XdsNameResponse,
} from './types';
import {
  GetTokenHoldersParams,
  GetTokenParams,
  TOKEN_SELECT,
  TokensHoldersResponse,
  TokensResponse,
} from './types/tokens';
import { GetTokenTransfersParams, TokenTransfersResponse } from './types/tokenTransfers';
import { GetXdsNamesParams, GracePeriodResponse, XdsNamesResponse } from './types/xds';

const ADDRESSES_URL = '/addresses';
const VALIDATORS_URL = '/validators';
const TRANSACTIONS_URL = '/txs';
const TOKEN_TRANSFERS_URL = '/token-transfers';
const TOKEN_URL = '/tokens';
const TOKEN_HOLDERS_URL = '/token-holders';
const STAT_URL = '/stat';
const TOKENS_INVENTORY_URL = '/token-inventory';
const XDS_URL = '/xds';
const GRACE_PERIOD_URL = '/grace-period';

export const api = {
  getValidators: (params: BasePaginationParams, { signal }: FetchOptions = {}) => {
    return xfiScanAxiosInstance.get<ValidatorListResponse>(VALIDATORS_URL, { params, signal });
  },
  getAddressInfo: (address: string, { signal, ...params }: GetAddressInfoParams = {}) => {
    return xfiScanAxiosInstance.get<AddressInfoResponse>(urlJoin(ADDRESSES_URL, address), { signal, params });
  },
  getTransactions: (params: GetTransactionListParams, { signal }: FetchOptions = {}) => {
    return xfiScanAxiosInstance.get<TransactionListPaginatedResponse>(TRANSACTIONS_URL, { params, signal });
  },
  getTokenTransfers: (params: GetTokenTransfersParams, { signal }: FetchOptions = {}) => {
    return xfiScanAxiosInstance.get<TokenTransfersResponse>(TOKEN_TRANSFERS_URL, { params, signal });
  },
  getTokens: (params: GetTokenParams, { signal }: FetchOptions = {}) => {
    return xfiScanAxiosInstance.get<TokensResponse>(TOKEN_URL, { params: { select: TOKEN_SELECT, ...params }, signal });
  },
  getTokensHolders: (params: GetTokenHoldersParams, { signal }: FetchOptions = {}) => {
    return xfiScanAxiosInstance.get<TokensHoldersResponse>(TOKEN_HOLDERS_URL, {
      params,
      signal,
    });
  },
  getStat: () => {
    return xfiScanAxiosInstance.get<StatResponse>(STAT_URL);
  },
  getTokenInventory: (params: GetTokenInventoryParams, { signal }: FetchOptions = {}) => {
    return xfiScanAxiosInstance.get<TokenInventoryListResponse>(TOKENS_INVENTORY_URL, { params, signal });
  },
  getTokenInventoryByTokenId: (contactAddress: string, tokenId: string, { signal }: FetchOptions = {}) => {
    return xfiScanAxiosInstance.get<TokenInventoryResponse>(urlJoin(TOKENS_INVENTORY_URL, contactAddress, tokenId), {
      signal,
    });
  },
  getXdsNames: (params: GetXdsNamesParams, { signal }: FetchOptions = {}) => {
    return xfiScanAxiosInstance.get<XdsNamesResponse>(XDS_URL, { params, signal });
  },
  getXdsName: (nameLabel: string, { signal }: FetchOptions = {}) => {
    return xfiScanAxiosInstance.get<XdsNameResponse>(urlJoin(XDS_URL, nameLabel), { signal });
  },
  resolveXdsNameOrAddress: (nameOrAddress: string, { signal }: FetchOptions = {}) => {
    return xfiScanAxiosInstance.get<ResolvedXdsNameOrAddressResponse>(urlJoin(XDS_URL, 'resolve', nameOrAddress), {
      signal,
    });
  },
  getXdsGracePeriod: ({ signal }: FetchOptions = {}) => {
    return xfiScanAxiosInstance.get<GracePeriodResponse>(urlJoin(XDS_URL, GRACE_PERIOD_URL), { signal });
  },
};
