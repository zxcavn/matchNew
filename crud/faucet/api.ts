import urlJoin from 'url-join';

import { FetchOptions } from '../types';
import { faucetAxiosInstance } from './axiosInstance';
import { LastClaimResponse, TelegramAuthResponse, TokenResponse } from './types';

const CLAIM_URL = '/claim';
const LAST_CLAIM_URL = '/last_claim';
const GET_LINK = '/get_link';
const CHECK_AUTH = '/check_auth';

export const api = {
  getClaimData: (coin: string, params: URLSearchParams, { signal }: FetchOptions = {}) => {
    return faucetAxiosInstance.get<Promise<void>>(urlJoin(CLAIM_URL, coin), { params, signal });
  },
  getLastClaimData: (coin: string, params: { telegram_id: string }, { signal }: FetchOptions = {}) => {
    return faucetAxiosInstance.get<LastClaimResponse>(urlJoin(LAST_CLAIM_URL, coin), { params, signal });
  },
  getLink: ({ signal }: FetchOptions = {}) => {
    return faucetAxiosInstance.get<TokenResponse>(urlJoin(GET_LINK), { signal });
  },
  checkAuth: (token: string, { signal }: FetchOptions = {}) => {
    return faucetAxiosInstance.get<TelegramAuthResponse>(urlJoin(CHECK_AUTH, token), { signal });
  },
};
