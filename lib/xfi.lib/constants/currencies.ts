import { ReactElement } from 'react';

import { MpxIcon, TokenDefaultIcon, XfiIcon } from '../icons';
import type { ThemeIcon } from '../icons/types';

type Currency = Readonly<{
  symbol: string;
  text: string;
  Icon: ReactElement | ThemeIcon;
  formatDecimals: number;
}>;

export const CURRENCIES: Readonly<Record<'mpx' | 'xfi', Currency>> = {
  xfi: {
    symbol: 'xfi',
    text: 'XFI',
    Icon: XfiIcon,
    formatDecimals: 6,
  },
  mpx: {
    symbol: 'mpx',
    text: 'MPX',
    Icon: MpxIcon,
    formatDecimals: 6,
  },
} as const;

export const DEFAULT_CURRENCY = {
  Icon: TokenDefaultIcon,
  formatDecimals: 6,
} as const;
