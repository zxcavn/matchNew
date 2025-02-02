import { waitFor as rtlWaitFor, waitForOptions } from '@testing-library/react';

const SAFE_DELAY_MS = 2000;

export const waitFor = async <T>(callback: () => Promise<T> | T, options?: waitForOptions): Promise<T> => {
  const { timeout = SAFE_DELAY_MS, ...restOptions } = options || {};

  return rtlWaitFor(callback, { timeout, ...restOptions }) as Promise<T>;
};

export default waitFor;
