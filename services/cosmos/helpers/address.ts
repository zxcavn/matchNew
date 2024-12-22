/**
 * @file
 * @see https://github.com/Zilliqa/Zilliqa/wiki/Address-Standard-(Bech32)
 * @see https://github.com/cosmos/cosmos-sdk/blob/main/types/address.go
 */
import { normalizeBech32 } from '@cosmjs/encoding';

export const ADDRESS_PREFIX = 'mx';

const BECH32_SEPARATOR = '1';
const VALIDATOR_PREFIX = 'val';
const OPERATOR_PREFIX = 'oper';

const ACCOUNT_ADDRESS_PREFIX = ADDRESS_PREFIX;
const VALIDATOR_ADDRESS_PREFIX = [ADDRESS_PREFIX, VALIDATOR_PREFIX, OPERATOR_PREFIX].join('');

export const isAddress = (address: string): boolean => {
  try {
    return Boolean(normalizeBech32(address).startsWith(ADDRESS_PREFIX));
  } catch {
    return false;
  }
};

export const isAccountAddress = (address: string): boolean => {
  const prefix = [ACCOUNT_ADDRESS_PREFIX, BECH32_SEPARATOR].join('');

  return isAddress(address) && address.startsWith(prefix);
};

export const isValidatorAddress = (address: string): boolean => {
  const prefix = [VALIDATOR_ADDRESS_PREFIX, BECH32_SEPARATOR].join('');

  return isAddress(address) && address.startsWith(prefix);
};
