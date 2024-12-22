import { isZeroAddress } from '@xfi/helpers';
import { getAddress, isAddress as isEthereumAddress } from 'ethers';
import urlJoin from 'url-join';

import type { ProfileResponse } from '@/crud/xfiPad';
import { isValidatorAddress } from '@/services/cosmos/helpers';
import { Erc20 } from '@/services/evm';
import { XFI_SCAN_URL } from '@/shared/constants/variables';
import { StorageToken } from '@/store/walletTokens';

/**
 * @description
 * Matches each string with a unique number.
 */
export const hashCode = (str: string): number => {
  const result = Array(str.length)
    .fill(null)
    .reduce((code, _, index) => {
      code = (Math.imul(31, code) + str.charCodeAt(index)) | 0;

      return code;
    }, 0);

  return Math.abs(result);
};

export const getAddressLink = (address: string): string => {
  if (isZeroAddress(address)) return '';

  if (isEthereumAddress(address)) return urlJoin(XFI_SCAN_URL, 'address', address);

  const page = isValidatorAddress(address) ? 'validator' : 'address';

  return urlJoin(XFI_SCAN_URL, page, address);
};

type ParserParams = {
  divider?: string;
  formatter?: (value: string) => string;
};

/**
 * @example
 * parseCurrencyString("1179777609702549mpx,392785807638139725xfi");
 * // returns { mpx: 1179777609702549, xfi: 392785807638139725 }
 * parseCurrencyString("1179777609702549mpx,392785807638139725xfi", {
 *  formatter: (value) =>  value / 10e12
 * });
 * // returns { mpx: 117.9777609702549, xfi: 39278.580763813974 }
 */
export const parseCurrencyString = (
  currencyString: string,
  { divider = ',', formatter = value => value }: ParserParams = {}
) => {
  const currencyRegExp = {
    mpx: /mpx/,
    xfi: /xfi/,
  } as const;
  const removeCharsRexExp = /\D/g;

  return currencyString.split(divider).reduce((result, part) => {
    const matchDenomArray = part.match(currencyRegExp.mpx) || part.match(currencyRegExp.xfi);
    const amount = part.replace(removeCharsRexExp, '');

    if (!matchDenomArray) return result;

    const [denom] = matchDenomArray;

    result[denom] = formatter(amount);

    return result;
  }, {} as { [key: string]: string }) as Partial<{ mpx: string; xfi: string }>;
};

export const isErc20Token = (token: object): token is Erc20.TokenInfo => {
  const { name, symbol, decimals, contractAddress } = token as Erc20.TokenInfo;

  return (
    typeof name === 'string' &&
    typeof symbol === 'string' &&
    typeof decimals === 'number' &&
    typeof contractAddress === 'string' &&
    isEthereumAddress(contractAddress)
  );
};

type GroupedTokens = {
  [address: string]: StorageToken;
};

export const groupTokensByAddress = (tokenList: StorageToken[]): GroupedTokens => {
  return tokenList.reduce((acc, token) => {
    const address = getAddress(token.contractAddress);

    acc[address] = token;

    return acc;
  }, {} as GroupedTokens);
};

export const isExtensionActionRejectedError = (error: unknown): error is Error => {
  // Keplr
  return error instanceof Error && error.message === 'Request rejected';
};

export const getProfileWalletAddresses = (profile?: ProfileResponse | null): { evm: string; cosmos: string } => {
  const walletList = profile?.wallets || [];
  const addresses = { evm: '', cosmos: '' };

  walletList.forEach(({ address, isEVMWallet }) => {
    if (isEVMWallet) {
      addresses.evm = address;
    } else {
      addresses.cosmos = address;
    }
  });

  return addresses;
};

export const excludeExtraToken = <
  T extends {
    contractAddress: string;
  }
>(
  tokens: T[],
  contractAddress?: string
) => {
  return tokens.filter(
    token => !contractAddress || token.contractAddress.toLowerCase() !== contractAddress.toLowerCase()
  );
};
