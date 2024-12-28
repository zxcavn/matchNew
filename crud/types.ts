import { GenericAbortSignal } from 'axios';

export type FetchOptions = {
  signal?: GenericAbortSignal;
  headers?: Record<string, string>;
};

export type EncryptedUnbondStatus = {
  hash: string;
};

export type UnbondStatusDto = {
  exceptionAddresses: string[];
  validators: string[];
  date: string;
  isDatePast: boolean;
};

export type BasePaginationParams = {
  page: number;
  limit: number;
  sort?: string;
  select?: string;
};

export type BasePaginationResponse<T extends object> = {
  page: number;
  limit: number;
  hasNext: boolean;
  docs: Array<T>;
};

export enum TokenType {
  CFC_20 = 'CFC-20',
  CFC_721 = 'CFC-721',
}

export type BaseGetTokensParams = {
  tokenType?: TokenType;
};
