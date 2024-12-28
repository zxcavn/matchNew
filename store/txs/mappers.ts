import { TokenType } from '@/crud';
import type { TokenTransferResponse } from '@/crud/xfiScan/types/tokenTransfers';
import { normalizeXdsName } from '@/lib/xfi.lib/helpers/xds';

import { DEFAULT_TOKEN_DECIMALS } from './constants';

type XdsNames = {
  [name: string]: string | undefined;
};

const getXdsNames = (response: TokenTransferResponse) => {
  const names = (response.xds || []).filter(Boolean).reduce((result, xds) => {
    if (!xds.name) return result;

    result[xds.address] = xds.name;

    return result;
  }, {} as XdsNames);

  return {
    addressFrom: normalizeXdsName(names[response.addressFrom] || '')?.name,
    addressTo: normalizeXdsName(names[response.addressTo] || '')?.name,
  };
};

export const mapTokenTransferResponse = (response: TokenTransferResponse) => ({
  contractAddress: response.contractAddress,
  tokenSymbol: response.tokenSymbol,
  decimals: response.decimals || DEFAULT_TOKEN_DECIMALS,
  blockNumber: String(response.blockNumber),
  txHash: response.txHash,
  addressFrom: response.addressFrom || '',
  addressTo: response.addressTo || '',
  quant: response.tokenType === TokenType.CFC_20 ? response.quant : '',
  tokenId: response.tokenType === TokenType.CFC_721 ? response.tokenId : '',
  timestamp: response.timestamp,
  tokenName: response.tokenName,
  tokenType: response.tokenType,
  xdsNames: getXdsNames(response),
});
