import { trimStringAndInsertDots } from '@xfi/helpers';

import { ConnectionType } from '@/hocs/WalletConnectionProvider';

export const TRIM_ADDRESS_MEDIA_QUERY = '(max-width:700px)';

export const TRIM_CONFIG: Record<ConnectionType, Partial<Parameters<typeof trimStringAndInsertDots>[0]>> = {
  [ConnectionType.EXTENSION]: {
    charsBeforeDots: 5,
    charsAfterDots: 3,
  },
  [ConnectionType.MNEMONIC]: {
    charsBeforeDots: 10,
    charsAfterDots: 3,
  },
};
