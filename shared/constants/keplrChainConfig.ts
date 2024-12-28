import type { ChainInfo } from '@keplr-wallet/types';

import { COSMOS_CHAIN_ID, COSMOS_CHAIN_NAME, COSMOS_REST_URL, COSMOS_RPC_URL } from './variables';

export const KEPLR_CHAIN_CONFIG: ChainInfo = {
  bech32Config: {
    bech32PrefixAccAddr: 'mx',
    bech32PrefixAccPub: 'mxpub',
    bech32PrefixConsAddr: 'mxvalcons',
    bech32PrefixConsPub: 'mxvalconspub',
    bech32PrefixValAddr: 'mxvaloper',
    bech32PrefixValPub: 'mxvaloperpub',
  },
  beta: true,
  rpc: COSMOS_RPC_URL,
  rest: COSMOS_REST_URL,
  chainId: COSMOS_CHAIN_ID,
  chainName: COSMOS_CHAIN_NAME,
  bip44: { coinType: 60 },
  chainSymbolImageUrl:
    'https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/crossfi-evm-testnet/crossfi.png',
  currencies: [
    {
      coinDecimals: 18,
      coinDenom: 'XFI',
      coinMinimalDenom: 'xfi',
    },
    {
      coinDecimals: 18,
      coinDenom: 'MPX',
      coinMinimalDenom: 'mpx',
    },
  ],
  features: [
    'ibc-go',
    'ibc-transfer',
    'query:/cosmos/bank/v1beta1/spendable_balances',
    'eth-address-gen',
    'eth-key-sign',
  ],
  feeCurrencies: [
    {
      coinDecimals: 18,
      coinDenom: 'XFI',
      coinMinimalDenom: 'xfi',
      gasPriceStep: {
        average: 25000000000,
        high: 30000000000,
        low: 20000000000,
      },
    },
    {
      coinDecimals: 18,
      coinDenom: 'MPX',
      coinMinimalDenom: 'mpx',
      gasPriceStep: {
        average: 25000000000,
        high: 30000000000,
        low: 20000000000,
      },
    },
  ],
  stakeCurrency: {
    coinDecimals: 18,
    coinDenom: 'MPX',
    coinMinimalDenom: 'mpx',
  },
};
