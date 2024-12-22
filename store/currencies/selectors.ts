import type { RootState } from '../index';
import { GroupedCurrenciesBySymbol } from './types';

export const currenciesSelector = (state: RootState) => state.currencies;

export const currencyBySymbolSelector =
  (symbol: string) =>
  (state: RootState): GroupedCurrenciesBySymbol[number] | undefined => {
    return state.currencies.docs[symbol];
  };

export const isLoadingCurrenciesSelector = (state: RootState) => state.currencies.isLoading;
