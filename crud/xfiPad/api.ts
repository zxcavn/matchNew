import urlJoin from 'url-join';

import type { FetchOptions } from '../types';
import { padXfiFoundationAxiosInstance } from './axiosInstance';
import type {
  AuthParams,
  AuthResponse,
  ChainRewardsResponse,
  CheckHashParams,
  CheckHashResponse,
  CheckMissionProgressParams,
  CheckMissionProgressResponse,
  CheckSocialNetworkParams,
  CheckSocialNetworkResponse,
  ClaimChainRewardsParams,
  ClaimChainRewardsResponse,
  GetChainRewardsParams,
  GetMissionListParams,
  GetMissionListPayload,
  MissionHistoryResponse,
  MissionResponse,
  NonceParams,
  NonceResponse,
  ProfileResponse,
  RefreshTokenResponse,
} from './types';

const PROFILE_URL = '/profile';
const AUTHORIZATION_URL = '/authenticate/web3-wallet';
const NONCE_URL = '/web3/utils/nonce';
const HISTORY_MISSION_URL = '/mission/history';
const MISSION_URL = '/mission/available';
const CHECK_MISSION_PROGRESS_URL = '/mission/check-progress';
const CHECK_SWAP_URL = '/mission/side/check-swap-mpx-crossfi';
const HASH_EXCHANGE_URL = '/mission/side/check-exchange-buy-xfi';
const HASH_SOCIAL_NETWORK = '/mission/side/check-social-network-subscription-by-hash';
const GIVING_REWARD_URL = '/giving-reward';

export const REFRESH_TOKEN_URL = '/authenticate/refresh';

export const api = {
  getProfile: ({ signal }: FetchOptions = {}) => {
    return padXfiFoundationAxiosInstance.get<ProfileResponse>(PROFILE_URL, { signal });
  },
  authorize: (params: AuthParams, options: FetchOptions = {}) => {
    return padXfiFoundationAxiosInstance.post<AuthResponse>(AUTHORIZATION_URL, params, options);
  },
  getNonce: (params: NonceParams, { signal }: FetchOptions = {}) => {
    return padXfiFoundationAxiosInstance.get<NonceResponse>(NONCE_URL, { params, signal });
  },
  refreshToken: (options: FetchOptions = {}) => {
    return padXfiFoundationAxiosInstance.post<RefreshTokenResponse>(REFRESH_TOKEN_URL, {}, options);
  },
  getMissions: (
    { groups, types, ...params }: GetMissionListParams & GetMissionListPayload,
    { signal }: FetchOptions = {}
  ) => {
    return padXfiFoundationAxiosInstance.post<MissionResponse>(MISSION_URL, { groups, types }, { params, signal });
  },
  checkMissionProgress: (params: CheckMissionProgressParams, { signal }: FetchOptions = {}) => {
    return padXfiFoundationAxiosInstance.post<CheckMissionProgressResponse>(CHECK_MISSION_PROGRESS_URL, params, {
      signal,
    });
  },
  checkSwapMpxCrossFi: (params: CheckHashParams, { signal }: FetchOptions = {}) => {
    return padXfiFoundationAxiosInstance.post<CheckHashResponse>(CHECK_SWAP_URL, params, {
      signal,
    });
  },
  getMissionHistory: (params: GetMissionListParams) => {
    return padXfiFoundationAxiosInstance.get<MissionHistoryResponse>(HISTORY_MISSION_URL, { params });
  },
  checkExchangeBuyXfi: (params: CheckHashParams) => {
    return padXfiFoundationAxiosInstance.post<CheckHashResponse>(HASH_EXCHANGE_URL, params);
  },
  checkSocialNetworkSubscription: (params: CheckSocialNetworkParams) => {
    return padXfiFoundationAxiosInstance.post<CheckSocialNetworkResponse>(HASH_SOCIAL_NETWORK, params);
  },
  getChainRewards: (params: GetChainRewardsParams) => {
    return padXfiFoundationAxiosInstance.get<ChainRewardsResponse>(GIVING_REWARD_URL, { params });
  },
  claimChainRewards: ({ id, ...params }: ClaimChainRewardsParams) => {
    return padXfiFoundationAxiosInstance.post<ClaimChainRewardsResponse>(
      urlJoin(GIVING_REWARD_URL, id, 'claim'),
      params
    );
  },
};
