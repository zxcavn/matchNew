import { SwapCurrency } from '@/crud/swap';

import type { GroupedCurrenciesBySymbol } from './types';

export const mapCurrenciesResponse = (docs: SwapCurrency[]): GroupedCurrenciesBySymbol => {
  const formattedDocs: Record<string, Omit<SwapCurrency, 'symbol'>> = {};

  for (const currency of docs) {
    const { symbol, ...docs } = currency;

    formattedDocs[String(symbol)] = { ...docs };
  }

  return formattedDocs;
};
