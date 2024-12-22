import { stringToPath } from '@cosmjs/crypto';
import type { HttpBatchClientOptions } from '@cosmjs/tendermint-rpc';

const COSMOS_HD_PATH = stringToPath("m/44'/118'/0'/0/0");
const ETHEREUM_HD_PATH = stringToPath("m/44'/60'/0'/0/0");

export const HD_PATHS = [COSMOS_HD_PATH, ETHEREUM_HD_PATH];

export const MNEMONIC_LENGTH = 15;

export const DEFAULT_GAS_LIMIT_COEFFICIENT = 1.4;

export const HTTP_BATCH_CLIENT_OPTIONS: Partial<HttpBatchClientOptions> = {
  dispatchInterval: 150,
};
