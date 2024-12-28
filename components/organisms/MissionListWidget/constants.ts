import { PaletteMode } from '@mui/material';
import { ElementType } from 'react';
import urlJoin from 'url-join';

import { MissionGroup, MissionValidatorType, SocialNetworkType } from '@/crud/xfiPad';
import { CrossfiXAppIcon, XSwapIcon } from '@/public/icons';
import {
  DOCS_CROSSFI_XAPP_INCENTIVIZE,
  JOIN_DISCORD_SERVER_URL,
  SUBSCRIBE_TO_TELEGRAM_CHANNEL_URL,
  X_APP_LINK,
  XSWAP_DETAILS,
  XSWAP_TESTNET_LINK,
} from '@/shared/constants';
import { ChainType } from '@/shared/types';

export type MissionDetailsBase = {
  /** @type {FormattedMessageId} */
  name: string;
  /** @type {FormattedMessageId} */
  description: string;
  chainType?: ChainType;
  socialNetwork?: SocialNetworkType;
  image: string;
};

type MissionWithDetailsUrl = MissionDetailsBase & {
  detailsUrl: string;
  subscribeUrl?: never;
};

type MissionWithSubscribeUrl = MissionDetailsBase & {
  subscribeUrl: string;
  detailsUrl?: never;
};

export type MissionDetails = MissionWithDetailsUrl | MissionWithSubscribeUrl;
export type DappMissionDetails = {
  /** @type {FormattedMessageId} */
  name: string;
  /** @type {FormattedMessageId} */
  description: string;
  detailsUrl: string;
  launchUrl: string;
  icon: {
    src: Readonly<Record<PaletteMode, ElementType>>;
    viewBox: string;
  };
};

const DOCS_CROSSFI_XFI_PAD_LINK = 'https://docs.crossfi.org/crossfi-foundation/xfi-pad';

export const MISSION_DETAILS_LIST: Record<MissionValidatorType, MissionDetails> = {
  // MPX
  [MissionValidatorType.SEND_MPX_COSMOS]: {
    name: 'MISSIONS.SEND_MPX_COSMOS.NAME',
    description: 'MISSIONS.SEND_MPX_COSMOS.DESCRIPTION',
    chainType: ChainType.COSMOS,
    detailsUrl: urlJoin(DOCS_CROSSFI_XFI_PAD_LINK, '#send'),
    image: '/images/missions/sendMpxCosmos.jpeg',
  },
  [MissionValidatorType.SEND_MPX_DIFFERENT_ADDRESS]: {
    name: 'MISSIONS.SEND_MPX_DIFFERENT_ADDRESS.NAME',
    description: 'MISSIONS.SEND_MPX_DIFFERENT_ADDRESS.DESCRIPTION',
    chainType: ChainType.COSMOS,
    detailsUrl: urlJoin(DOCS_CROSSFI_XFI_PAD_LINK, '#mulltisend-1'),
    image: '/images/missions/sendMpxDiffenentAddress.jpeg',
  },
  // Use XFI to earn XFT
  [MissionValidatorType.SEND_XFI_COSMOS]: {
    name: 'MISSIONS.SEND_XFI_COSMOS.NAME',
    description: 'MISSIONS.SEND_XFI_COSMOS.DESCRIPTION',
    chainType: ChainType.COSMOS,
    detailsUrl: urlJoin(DOCS_CROSSFI_XFI_PAD_LINK, '#send'),
    image: '/images/missions/sendXfiCosmos.png',
  },
  [MissionValidatorType.SEND_XFI_EVM]: {
    name: 'MISSIONS.SEND_XFI_EVM.NAME',
    description: 'MISSIONS.SEND_XFI_EVM.DESCRIPTION',
    chainType: ChainType.EVM,
    detailsUrl: urlJoin(DOCS_CROSSFI_XFI_PAD_LINK, '#evm'),
    image: '/images/missions/sendXfiEvm.png',
  },
  [MissionValidatorType.SEND_XFI_DIFFERENT_ADDRESS]: {
    name: 'MISSIONS.SEND_XFI_DIFFERENT_ADDRESS.NAME',
    description: 'MISSIONS.SEND_XFI_DIFFERENT_ADDRESS.DESCRIPTION',
    chainType: ChainType.COSMOS,
    detailsUrl: urlJoin(DOCS_CROSSFI_XFI_PAD_LINK, '#mulltisend-1'),
    image: '/images/missions/sendXfiDifferentAddress.jpeg',
  },
  // Staking
  [MissionValidatorType.DELEGATE_MPX_TO_VALIDATOR]: {
    name: 'MISSIONS.DELEGATE_MPX_TO_VALIDATOR.NAME',
    description: 'MISSIONS.DELEGATE_MPX_TO_VALIDATOR.DESCRIPTION',
    chainType: ChainType.COSMOS,
    detailsUrl: urlJoin(DOCS_CROSSFI_XFI_PAD_LINK, '#bond'),
    image: '/images/missions/delegateMpxToValidator.jpeg',
  },
  [MissionValidatorType.CLAIM_FAUCET_XFI_REWARDS]: {
    name: 'MISSIONS.CLAIM_FAUCET_XFI_REWARDS.NAME',
    description: 'MISSIONS.CLAIM_FAUCET_XFI_REWARDS.DESCRIPTION',
    chainType: ChainType.COSMOS,
    detailsUrl: urlJoin(DOCS_CROSSFI_XFI_PAD_LINK, '#claim'),
    image: '/images/missions/claimFaucetXfiRewards.jpeg',
  },
  // Others
  [MissionValidatorType.SEND_EVM_FOUNDATION_XFT_TOKEN]: {
    name: 'MISSIONS.SEND_EVM_FOUNDATION_XFT_TOKEN.NAME',
    description: 'MISSIONS.SEND_EVM_FOUNDATION_XFT_TOKEN.DESCRIPTION',
    chainType: ChainType.EVM,
    detailsUrl: urlJoin(DOCS_CROSSFI_XFI_PAD_LINK, '#transfer'),
    image: '/images/missions/sendEvmFoundationXftToken.jpeg',
  },
  [MissionValidatorType.SEND_MPX_AND_XFI_DIFFERENT_ADDRESS]: {
    name: 'MISSIONS.SEND_MPX_AND_XFI_DIFFERENT_ADDRESS.NAME',
    description: 'MISSIONS.SEND_MPX_AND_XFI_DIFFERENT_ADDRESS.DESCRIPTION',
    chainType: ChainType.COSMOS,
    detailsUrl: urlJoin(DOCS_CROSSFI_XFI_PAD_LINK, '#mulltisend-2'),
    image: '/images/missions/sendMpxAndXfiDifferentAddress.png',
  },
  // Social networks
  [MissionValidatorType.SUBSCRIBE_TO_TELEGRAM_CHANNEL]: {
    name: 'MISSIONS.SUBSCRIBE_TO_TELEGRAM_CHANNEL.NAME',
    description: 'MISSIONS.SUBSCRIBE_TO_TELEGRAM_CHANNEL.DESCRIPTION',
    subscribeUrl: SUBSCRIBE_TO_TELEGRAM_CHANNEL_URL,
    socialNetwork: SocialNetworkType.telegram,
    image: '/images/missions/joinTelegram.jpeg',
  },
  [MissionValidatorType.JOIN_DISCORD_SERVER]: {
    name: 'MISSIONS.JOIN_DISCORD_SERVER.NAME',
    description: 'MISSIONS.JOIN_DISCORD_SERVER.DESCRIPTION',
    subscribeUrl: JOIN_DISCORD_SERVER_URL,
    socialNetwork: SocialNetworkType.discord,
    image: '/images/missions/joinDiscord.jpeg',
  },
};

export const DAPPS_MISSIONS: DappMissionDetails[] = [
  {
    name: 'CrossFi xApp',
    description: 'MISSIONS.DAPPS.XAPP.DESCRIPTION',
    detailsUrl: DOCS_CROSSFI_XAPP_INCENTIVIZE,
    launchUrl: X_APP_LINK,
    icon: {
      src: CrossfiXAppIcon,
      viewBox: '0 0 275 68',
    },
  },
  {
    name: 'xSwap',
    description: 'MISSIONS.DAPPS.XSWAP.DESCRIPTION',
    detailsUrl: XSWAP_DETAILS,
    launchUrl: XSWAP_TESTNET_LINK,
    icon: {
      src: XSwapIcon,
      viewBox: '-40 -7 196 140',
    },
  },
];

export const MISSION_GROUP_DETAILS_LIST: Record<
  MissionGroup,
  {
    /** @type {FormattedMessageId} */
    title: string;
  }
> = {
  [MissionGroup.MPX]: {
    title: 'MISSION_GROUP.MPX.TITLE',
  },
  [MissionGroup.XFI]: {
    title: 'MISSION_GROUP.XFI.TITLE',
  },
  [MissionGroup.OTHERS]: {
    title: 'MISSION_GROUP.OTHERS.TITLE',
  },
  [MissionGroup.STAKING]: {
    title: 'MISSION_GROUP.STAKING.TITLE',
  },
  [MissionGroup.SOCIAL_NETWORK]: {
    title: 'MISSION_GROUP.SOCIAL_NETWORKS.TITLE',
  },
};
