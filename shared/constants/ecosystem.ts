import { PaletteMode } from '@mui/material';
import { ElementType } from 'react';

import {
  AnatolianTeamIcon,
  BlackNodesIcon,
  BrightlystakeIcon,
  BwarelabsIcon,
  CrossfiAppIcon,
  CrossfiBridgeIcon,
  CrossfiScanIcon,
  CrossfiXAppIcon,
  DexGuruIcon,
  ExploremeIcon,
  ImperatorIcon,
  ItRocketIcon,
  KeplrIcon,
  LogoIcon,
  MetamaskIcon,
  NodesGuruIcon,
  NodeStakeIcon,
  ProtocolIcon,
  RuangnodeIcon,
  SafeIcon,
  Staking4allIcon,
  XSwapIcon,
} from '@/public/icons';

import {
  ANATOLIAN_TEAM_LINK,
  BLACKNODES_LINK,
  BRIGHTLYSTAKE_LINK,
  BWARELABS_LINK,
  CONFIGURING_KEPLR_LINK,
  CONFIGURING_METAMASK_LINK,
  CROSSFI_APP_LINK,
  CROSSFI_EXPLOREME_LINK,
  DOCS_CROSSFI_XAPP,
  IMPERATOR_LINK,
  ITROCKET_LINK,
  NODES_GURU_LINK,
  NODESTAKE_LINK,
  RUANGNODE_LINK,
  SAFE_LINK,
  SCAN_XFI_MS_LINK,
  STAKING4ALL_LINK,
  X_APP_LINK,
  XFI_BRIDGE_LINK,
  XFI_CONSOLE_MAINNET,
  XFI_CONSOLE_TESTNET,
  XFI_SCAN_TESTNET,
  XSWAP_LEARN_MORE_LINK,
  XSWAP_TESTNET_LINK,
} from './links';
import { XFI_SCAN_URL } from './variables';

export type Product = {
  icon: Readonly<Record<PaletteMode, ElementType>>;
  viewBox: string;
  highlightedDescription: string;
  /** @type {FormattedMessageId} */
  description: string;
  /** @type {FormattedMessageId} */
  linkText?: string;
  /** @type {FormattedMessageId} */
  linkText2?: string;
  href?: string;
  href2?: string;
};

export type EcosystemCardInfo = {
  icon: Readonly<Record<PaletteMode, ElementType>>;
  viewBox: string;
  href: string;
  href2?: string;
  /** @type {FormattedMessageId} */
  linkText?: string;
  linkText2?: string;
};

export const PRODUCTS_CARDS: Product[] = [
  {
    icon: CrossfiAppIcon,
    viewBox: '0 0 275 82',
    highlightedDescription: 'CrossFi APP',
    description: 'ECOSYSTEM.ONLINE_BANKING',
    linkText: 'ECOSYSTEM.PRE_ORDER_CROSSFI_CARD',
    href: CROSSFI_APP_LINK,
  },
  {
    icon: CrossfiXAppIcon,
    viewBox: '0 0 275 68',
    highlightedDescription: 'CrossFi APP',
    description: 'ECOSYSTEM.MULTI_PURPOSE_DEFI_APPLICATION',
    linkText: 'SUMMARY.LEARN_MORE',
    href: DOCS_CROSSFI_XAPP,
    linkText2: 'SUMMARY.TESTNET',
    href2: X_APP_LINK,
  },
  {
    icon: XSwapIcon,
    viewBox: '0 0 127 127',
    highlightedDescription: 'xSWAP',
    description: 'ECOSYSTEM.DECENTRALIZED_PROTOCOL',
    linkText: 'SUMMARY.TESTNET',
    href: XSWAP_TESTNET_LINK,
    linkText2: 'SUMMARY.LEARN_MORE',
    href2: XSWAP_LEARN_MORE_LINK,
  },
  {
    icon: ProtocolIcon,
    viewBox: '0 0 200 163',
    highlightedDescription: 'PhoLend',
    description: 'ECOSYSTEM.ADVANCED_NON_CUSTODIAL_PERMISSIONLESS_PROTOCOL',
  },
  {
    icon: SafeIcon,
    viewBox: '0 0 279 102',
    highlightedDescription: 'Safe',
    description: 'ECOSYSTEM.MOST_TRUSTED_PROTOCOL',
    linkText: 'SUMMARY.TESTNET',
    href: SAFE_LINK,
  },
  {
    icon: CrossfiBridgeIcon,
    viewBox: '0 0 272 79',
    highlightedDescription: 'XFI Bridge',
    description: 'ECOSYSTEM.TRANSFER_XFI_COINS',
    linkText: 'SUMMARY.MAINNET',
    href: XFI_BRIDGE_LINK,
  },
];

export const EXPLORERS_CARDS: EcosystemCardInfo[] = [
  {
    icon: CrossfiScanIcon,
    linkText: 'SUMMARY.TESTNET',
    linkText2: 'SUMMARY.MAINNET',
    href: XFI_SCAN_TESTNET,
    href2: XFI_SCAN_URL,
    viewBox: '0 0 147 55',
  },
  {
    icon: DexGuruIcon,
    linkText: 'SUMMARY.TESTNET',
    href: SCAN_XFI_MS_LINK,
    viewBox: '0 0 227 54',
  },
  {
    icon: ExploremeIcon,
    linkText: 'SUMMARY.TESTNET',
    href: CROSSFI_EXPLOREME_LINK,
    viewBox: '0 0 195 54',
  },
];

export const WALLETS_CARDS: EcosystemCardInfo[] = [
  {
    icon: LogoIcon,
    linkText: 'SUMMARY.TESTNET',
    linkText2: 'SUMMARY.MAINNET',
    href: XFI_CONSOLE_TESTNET,
    href2: XFI_CONSOLE_MAINNET,
    viewBox: '0 0 157 44',
  },
  {
    icon: MetamaskIcon,
    linkText: 'SUMMARY.TESTNET',
    href: CONFIGURING_METAMASK_LINK,
    viewBox: '0 0 278 51',
  },
  {
    icon: KeplrIcon,
    linkText: 'SUMMARY.TESTNET',
    href: CONFIGURING_KEPLR_LINK,
    viewBox: '0 0 150 51',
  },
];

export const VALIDATORS_CARDS: EcosystemCardInfo[] = [
  {
    icon: BwarelabsIcon,
    viewBox: '0 0 190 44',
    href: BWARELABS_LINK,
  },
  {
    icon: ImperatorIcon,
    viewBox: '0 0 185 62',
    href: IMPERATOR_LINK,
  },
  {
    icon: BrightlystakeIcon,
    viewBox: '0 0 185 48',
    href: BRIGHTLYSTAKE_LINK,
  },
  {
    icon: Staking4allIcon,
    viewBox: '0 0 185 41',
    href: STAKING4ALL_LINK,
  },
  {
    icon: NodesGuruIcon,
    viewBox: '0 0 185 44',
    href: NODES_GURU_LINK,
  },
  {
    icon: BlackNodesIcon,
    viewBox: '0 0 61 62',
    href: BLACKNODES_LINK,
  },
  {
    icon: NodeStakeIcon,
    viewBox: '0 0 184 39',
    href: NODESTAKE_LINK,
  },
  {
    icon: RuangnodeIcon,
    viewBox: '0 0 185 47',
    href: RUANGNODE_LINK,
  },
  {
    icon: ItRocketIcon,
    viewBox: '0 0 185 43',
    href: ITROCKET_LINK,
  },
  {
    icon: AnatolianTeamIcon,
    viewBox: '0 0 185 62',
    href: ANATOLIAN_TEAM_LINK,
  },
];
