import { ErrorType } from '@/shared/types';

import { mapValidatorsListResponse } from './mappers';

export const SLICE_NAME = 'VALIDATORS';

export const enum ValidatorsFetchMethodsEnum {
  getValidators = `${SLICE_NAME}/getValidators`,
  getValidatorsById = `${SLICE_NAME}/getValidatorsById`,
}

export type ValidatorsList = ReturnType<typeof mapValidatorsListResponse>;

export interface ValidatorsInitialState {
  loading: boolean;
  error: ErrorType;
  data: ValidatorsList;
}
