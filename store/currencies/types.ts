import { SwapCurrency } from '@/crud/swap/types';
import { ErrorType } from '@/shared/types';

export const SLICE_NAME = 'CURRENCIES';

export const enum SwapCurrenciesFetchMethodsEnum {
  getSwapCurrenciesAsync = `${SLICE_NAME}/getSwapCurrenciesAsync`,
  getSwapCurrenciesCountAsync = `${SLICE_NAME}/getSwapCurrenciesCountAsync`,
}

export type GroupedCurrenciesBySymbol = Record<string, Omit<SwapCurrency, 'symbol'>>;

export interface SwapCurrenciesInitialState {
  isLoading: boolean;
  error: ErrorType;
  docs: GroupedCurrenciesBySymbol;
}
