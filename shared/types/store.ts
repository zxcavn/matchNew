export type ErrorType = null | string | string[];

export namespace PaginatedState {
  export type Default<Data> = {
    isLoading?: boolean;
    data: Array<Data>;
    page: number;
    pages: number;
    error?: ErrorType;
  };

  export type Short<Data> = {
    isLoading?: boolean;
    page: number;
    hasNext: boolean;
    data: Array<Data>;
    limit: number;
    error?: ErrorType;
  };
}

export type DefaultState<Data> = {
  isLoading?: boolean;
  error?: ErrorType;
  data: Data | null;
};

export const DEFAULT_SHORT_PAGINATED_STATE = { data: [], page: 1, hasNext: false, limit: 0 };
