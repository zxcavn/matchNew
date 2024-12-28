export const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || '';
export const COSMOS_RPC_URL = `${process.env.NEXT_PUBLIC_DOMAIN}${process.env.NEXT_PUBLIC_COSMOS_RPC_PROXY_URL}`;
export const EVM_RPC_URL = `${process.env.NEXT_PUBLIC_DOMAIN}${process.env.NEXT_PUBLIC_EVM_RPC_PROXY_URL}`;
export const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV || '';
export const XFI_SCAN_URL = process.env.NEXT_PUBLIC_DOMAIN_XFI_SCAN || '';
export const XFI_BRIDGE_URL = process.env.NEXT_PUBLIC_DOMAIN_XFI_BRIDGE || '';
export const GET_MPX_URL = process.env.NEXT_PUBLIC_DOMAIN_GET_MPX || '';
export const CROSS_FINANCE_URL = process.env.NEXT_PUBLIC_DOMAIN_CROSS_FINANCE || '';
export const CROSS_FI_FOUNDATION_URL = process.env.NEXT_PUBLIC_DOMAIN_CROSS_FI_FOUNDATION || '';
export const IS_PRODUCTION = APP_ENV === 'production';
export const IS_DEVELOPMENT = APP_ENV === 'development';
export const IS_STAGING = APP_ENV === 'staging';
export const COSMOS_REST_URL = `${process.env.NEXT_PUBLIC_DOMAIN}${process.env.NEXT_PUBLIC_COSMOS_REST_PROXY_URL}`;
export const COSMOS_CHAIN_ID = process.env.NEXT_PUBLIC_COSMOS_CHAIN_ID || '';
export const COSMOS_CHAIN_NAME = process.env.NEXT_PUBLIC_COSMOS_CHAIN_NAME || '';
export const SWAP_XFI_TO_MPX_ADDRESS = process.env.NEXT_PUBLIC_SWAP_XFI_TO_MPX_ADDRESS || '';
export const SWAP_API_URL = process.env.NEXT_PUBLIC_API_SWAP_BASE || '';
export const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || '';
export const API_PAD_XFI_FOUNDATION_URL = process.env.NEXT_PUBLIC_API_PAD_XFI_FOUNDATION || '';
export const APP_PASSWORD = process.env.NEXT_PUBLIC_APP_PASSWORD || '';

export const SUBSCRIBE_TO_TELEGRAM_CHANNEL_URL = process.env.NEXT_PUBLIC_SUBSCRIBE_TO_TELEGRAM_CHANNEL_URL || '';
export const JOIN_DISCORD_SERVER_URL = process.env.NEXT_PUBLIC_JOIN_DISCORD_SERVER_URL || '';

export const XFI_GAS_PRICE = process.env.NEXT_PUBLIC_XFI_GAS_PRICE || '100000000000xfi';
export const MPX_GAS_PRICE = process.env.NEXT_PUBLIC_MPX_GAS_PRICE || '10000000000000mpx';
export const TOKENS_LIMIT = 10;

export const BASE_SENTRY_URL = 'ingest.de.sentry.io';
export const SENTRY_DNS_URL = `https://89da83d36b950db1589f0a5bd033148a@o4507111796834304.${BASE_SENTRY_URL}/4507130058113104`;
export const DOMAIN_FAUCET_TESTNET = process.env.NEXT_PUBLIC_DOMAIN_FAUCET_TESTNET || '';
export const EVM_EXTRA_TOKEN = process.env.NEXT_PUBLIC_EVM_EXTRA_TOKEN || '';
export const EMPX_TOKEN = process.env.NEXT_PUBLIC_EMPX_TOKEN || '';
export const MPX_CHEQUE_TOKEN = process.env.NEXT_PUBLIC_MPX_CHEQUE_TOKEN || '';
export const CONVERT_EMPX_ADDRESS = process.env.NEXT_PUBLIC_CONVERT_EMPX_ADDRESS || '';
export const XFI_FOR_CLAIM_REWARD_ADDRESS = process.env.NEXT_PUBLIC_XFI_FOR_CLAIM_REWARD_ADDRESS || '';

export const EVM_CHAIN_ID = Number(process.env.NEXT_PUBLIC_EVM_CHAIN_ID) || 0;
// XDS
export const XDS_REGISTRY_ADDRESS = process.env.NEXT_PUBLIC_XDS_REGISTRY_ADDRESS;
export const XDS_ETH_REGISTRAR_CONTROLLER_ADDRESS = process.env.NEXT_PUBLIC_XDS_ETH_REGISTRAR_CONTROLLER_ADDRESS || '';
export const XDS_PUBLIC_RESOLVER_ADDRESS = process.env.NEXT_PUBLIC_XDS_PUBLIC_RESOLVER_ADDRESS || '';
export const XDS_BASE_REGISTRAR_CONTROLLER_ADDRESS =
  process.env.NEXT_PUBLIC_XDS_BASE_REGISTRAR_CONTROLLER_ADDRESS || '';
export const XDS_NAME_WRAPPER_ADDRESS = process.env.NEXT_PUBLIC_XDS_NAME_WRAPPER_ADDRESS || '';
export const XDS_REVERSE_REGISTRAR_ADDRESS = process.env.NEXT_PUBLIC_XDS_REVERSE_REGISTRAR_ADDRESS || '';
