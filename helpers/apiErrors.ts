import { isAxiosError } from 'axios';

const DEFAULT_ERROR_MESSAGE = 'Unknown error';

export const getApiErrorMessage = (error: unknown): string => {
  if (isAxiosError<{ message?: string | string[] }>(error)) {
    const errorMessage = error.response?.data.message;

    return (Array.isArray(errorMessage) ? errorMessage.pop() : errorMessage) || DEFAULT_ERROR_MESSAGE;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return DEFAULT_ERROR_MESSAGE;
};

const WALLET_IS_ALREADY_REGISTERED =
  'The wallet is already registered in the system. Use it to log in or switch to another wallet.';
const WALLET_WAS_NOT_FOUND = 'A user with such a wallet was not found. Register on our platform.';
const TASK_IS_NOT_AVAILABLE = 'The task is not available. Try it in 24 hours.';
const INVALID_TASK_ID = 'Invalid task ID. Try again later.';
const NOT_ALL_THE_CONDITIONS_WERE_MET = 'Not all the conditions were met to complete the mission.';
const THE_CACHE_HAS_ALREADY_BEEN_USED =
  'The cache has already been used to check the job. Please use a different hash.';
const SENDER_MISMATCH = 'The address of the sender of the transaction does not match the address of your wallet.';
const MISSION_IS_UNIQUE = 'The mission is unique and can only be completed once.';

const apiErrorsMap: { [key: string]: string } = {
  [WALLET_IS_ALREADY_REGISTERED]: 'ERRORS.WALLET_IS_ALREADY_REGISTERED',
  [WALLET_WAS_NOT_FOUND]: 'ERRORS.WALLET_WAS_NOT_FOUND',
  [TASK_IS_NOT_AVAILABLE]: 'ERRORS.TASK_IS_NOT_AVAILABLE',
  [INVALID_TASK_ID]: 'ERRORS.INVALID_TASK_ID',
  [NOT_ALL_THE_CONDITIONS_WERE_MET]: 'ERRORS.NOT_ALL_THE_CONDITIONS_WERE_MET',
  [THE_CACHE_HAS_ALREADY_BEEN_USED]: 'ERRORS.THE_CACHE_HAS_ALREADY_BEEN_USED',
  [SENDER_MISMATCH]: 'ERRORS.SENDER_MISMATCH',
  [MISSION_IS_UNIQUE]: 'ERRORS.MISSION_IS_UNIQUE',
};

export const mapApiErrorToText = (errorMessage: string): string => {
  return apiErrorsMap[errorMessage] || 'MESSAGES.ERROR';
};
