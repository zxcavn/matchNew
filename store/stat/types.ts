import { mapStatisticResponse } from './mappers';

export const PREFIX = 'STAT';

export type Statistic = ReturnType<typeof mapStatisticResponse>;

export type StatState = {
  data: Statistic;
  isLoading: boolean;
};

export const enum StatFetchMethodsEnum {
  getStatisticAsync = 'getStatisticAsync',
}
