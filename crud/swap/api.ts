import urlJoin from 'url-join';

import { swapAxiosInstance } from './axiosInstance';
import { GetSwapCurrencies, SwapCurrenciesCountResponse, SwapCurrenciesResponse, SwapCurrency } from './types';

export const API_SWAP_CURRENCY = '/1.0/xfi-exchange/currency';
export const API_SWAP_CURRENCY_LIMIT = '/1.0/xfi-exchange/currency/count';

const swapApi = {
  getSwapCurrencies: (params: GetSwapCurrencies) => {
    return swapAxiosInstance.get<SwapCurrenciesResponse>(API_SWAP_CURRENCY, { params });
  },
  getSwapCurrenciesCount: () => {
    return swapAxiosInstance.get<SwapCurrenciesCountResponse>(API_SWAP_CURRENCY_LIMIT);
  },
  getSwapCurrency: (currency: string) => {
    return swapAxiosInstance.get<SwapCurrency>(urlJoin(API_SWAP_CURRENCY, currency));
  },
};

export default swapApi;
