import add from 'date-fns/add';

import type { XdsNameResponse } from '@/crud/xfiScan';
import { normalizeName } from '@/helpers/xds';

import type { XdsName } from './types';

export const mapXdsNameResponse = (
  { id, name, address, expires, createDate, primary, ownerXds, owner }: XdsNameResponse,
  gracePeriodTimestamp: number
): XdsName => {
  const normalizedName = normalizeName(name);

  return {
    id,
    label: normalizedName?.label || '',
    name: normalizedName?.name || '',
    address,
    expires,
    createDate,
    gracePeriodEnd: add(new Date(expires), { seconds: gracePeriodTimestamp / 1000 }).toISOString(),
    isPrimary: primary,
    isExpired: new Date(expires).getTime() < Date.now(),
    ownerAddress: owner,
    owner: ownerXds
      ? {
          address: ownerXds.address,
          name: ownerXds.name && normalizeName(ownerXds.name)?.name,
          expires: ownerXds.expires,
        }
      : undefined,
  };
};
