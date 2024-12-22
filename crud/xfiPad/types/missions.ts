export type GetMissionListParams = {
  limit: number;
  offset: number;
};

export type GetMissionListPayload = {
  groups: MissionGroup[];
  types: MissionType[];
};

export type CheckHashResponse = {
  ok: true;
};

export enum MissionType {
  DAILY = 'DAILY',
  UNIQUE = 'UNIQUE',
  ALWAYS = 'ALWAYS',
}

export enum MissionGroup {
  MPX = 'MPX',
  XFI = 'XFI',
  STAKING = 'STAKING',
  OTHERS = 'OTHERS',
  SOCIAL_NETWORK = 'SOCIAL_NETWORK',
}

export enum OldMissionValidatorType {
  // Old for archive tab
  SEND_MPX_OR_XFI_COSMOS = 'SEND_MPX_OR_XFI_COSMOS',
  SEND_MPX_OR_XFI_DIFFERENT_ADDRESS = 'SEND_MPX_OR_XFI_DIFFERENT_ADDRESS',
  SEND_XFI_AND_MPX = 'SEND_XFI_AND_MPX',
}

export enum MissionValidatorType {
  // MPX
  SEND_MPX_COSMOS = 'SEND_MPX_COSMOS',
  SEND_MPX_DIFFERENT_ADDRESS = 'SEND_MPX_DIFFERENT_ADDRESS',
  // XFI
  SEND_XFI_COSMOS = 'SEND_XFI_COSMOS',
  SEND_XFI_EVM = 'SEND_XFI_EVM',
  SEND_XFI_DIFFERENT_ADDRESS = 'SEND_XFI_DIFFERENT_ADDRESS',
  // Staking
  DELEGATE_MPX_TO_VALIDATOR = 'DELEGATE_MPX_TO_VALIDATOR',
  CLAIM_FAUCET_XFI_REWARDS = 'CLAIM_FAUCET_XFI_REWARDS',
  // Others
  SEND_EVM_FOUNDATION_XFT_TOKEN = 'SEND_EVM_FOUNDATION_XFT_TOKEN',
  SEND_MPX_AND_XFI_DIFFERENT_ADDRESS = 'SEND_MPX_AND_XFI_DIFFERENT_ADDRESS',
  // Social networks
  SUBSCRIBE_TO_TELEGRAM_CHANNEL = 'SUBSCRIBE_TO_TELEGRAM_CHANNEL',
  JOIN_DISCORD_SERVER = 'JOIN_DISCORD_SERVER',
}

type BalanceKeys = 'xfi' | 'mpx' | 'xft';

export type Mission = {
  id: string;
  type: MissionType;
  group: MissionGroup;
  validator: MissionValidatorType;
  reward: {
    type: 'AMOUNT';
    currency: BalanceKeys;
    amount: number;
  };
  lastTimestampAchievement: number;
  nextTimestampAchievement: number;
};

export type BaseMissionResponse<Docs> = {
  limit: number;
  offset: number;
  totalDocs: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number;
  prevPage: number;
  page: number;
  docs: Docs[];
};

export type MissionResponse = BaseMissionResponse<Mission>;

export type CheckMissionProgressParams = {
  hash: string;
  missionId: string;
};

export type CheckMissionProgressResponse = {
  ok: true;
};

export type CheckHashParams = {
  hash: string;
};

export type MissionRewardType = {
  type: string;
  currency: string;
  amount: number;
};

export type MissionHistoryType = {
  validator: MissionValidatorType;
  reward: MissionRewardType;
  hash: string;
  createdAt: string;
};

export type MissionHistoryResponse = BaseMissionResponse<MissionHistoryType>;

export enum SocialNetworkType {
  telegram = 'telegram',
  discord = 'discord',
}

export type CheckSocialNetworkParams = {
  hash: string;
  socialNetwork: SocialNetworkType;
};

export type CheckSocialNetworkResponse = {
  ok: true;
};
