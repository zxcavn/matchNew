export type SwapCurrency = {
  createDate: string;
  digitCount: string;
  name: string;
  rate: number;
  symbol: string;
  type: string;
  updateDate: string;
  _id: string;
};

export type SwapCurrenciesResponse = { docs: SwapCurrency[] };

export type GetSwapCurrencies = {
  limit: number;
};

export type SwapCurrenciesCountResponse = {
  count: number;
};
