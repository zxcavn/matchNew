import {
  API_PAD_XFI_FOUNDATION_URL,
  BASE_SENTRY_URL,
  COSMOS_REST_URL,
  DOMAIN,
  DOMAIN_FAUCET_TESTNET,
  IS_DEVELOPMENT,
  SWAP_API_URL,
  XFI_SCAN_URL,
} from '@/shared/constants/variables';

const GOOGLE_ANALYTICS_BASE_URL = 'google-analytics.com';
const GOOGLE_ANALYTICS_URL = `https://*.${GOOGLE_ANALYTICS_BASE_URL}`;
const GOOGLE_TAG_MANAGER = 'www.googletagmanager.com';
const SENTRY = `https://*.${BASE_SENTRY_URL}`;

const SCRIPT_SRC_URLS = [GOOGLE_ANALYTICS_URL, SENTRY, GOOGLE_TAG_MANAGER, 'https://connect.facebook.net'];

const IMG_SRC_URLS = [XFI_SCAN_URL, GOOGLE_TAG_MANAGER, GOOGLE_ANALYTICS_URL, 'https://www.facebook.com'];

const CONNECT_SRC_URLS = [
  COSMOS_REST_URL,
  GOOGLE_ANALYTICS_URL,
  SENTRY,
  DOMAIN_FAUCET_TESTNET,
  SWAP_API_URL,
  API_PAD_XFI_FOUNDATION_URL,
  XFI_SCAN_URL,
  'wss://*.xfiscan.com',
  'wss://xfiscan.com',
];

export const generateNonce = () => Buffer.from(crypto.randomUUID()).toString('base64');

export const getCSP = (nonce: string) => `
  default-src 'self';
  script-src 'self' ${
    DOMAIN.includes('localhost') || IS_DEVELOPMENT ? "'unsafe-eval'" : ''
  } 'wasm-unsafe-eval' 'nonce-${nonce}' ${SCRIPT_SRC_URLS.join(' ')};
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: ${IMG_SRC_URLS.join(' ')};
  connect-src 'self' data: ${CONNECT_SRC_URLS.join(' ')};
  object-src 'none';
`;
