import { MissionGroup, MissionValidatorType } from '@/crud/xfiPad/types';

export const MISSION_GROUP_ORDER = [
  MissionGroup.MPX,
  MissionGroup.XFI,
  MissionGroup.STAKING,
  MissionGroup.OTHERS,
  MissionGroup.SOCIAL_NETWORK,
];

export const MISSION_LIST_ORDER = [
  // MPX
  MissionValidatorType.SEND_MPX_COSMOS,
  MissionValidatorType.SEND_MPX_DIFFERENT_ADDRESS,
  // XFI
  MissionValidatorType.SEND_XFI_COSMOS,
  MissionValidatorType.SEND_XFI_EVM,
  MissionValidatorType.SEND_XFI_DIFFERENT_ADDRESS,
  // Staking
  MissionValidatorType.DELEGATE_MPX_TO_VALIDATOR,
  MissionValidatorType.CLAIM_FAUCET_XFI_REWARDS,
  // Others
  MissionValidatorType.SEND_EVM_FOUNDATION_XFT_TOKEN,
  MissionValidatorType.SEND_MPX_AND_XFI_DIFFERENT_ADDRESS,
  // Social networks
  MissionValidatorType.SUBSCRIBE_TO_TELEGRAM_CHANNEL,
  MissionValidatorType.JOIN_DISCORD_SERVER,
];
