import { useMediaQuery } from '@mui/material';

/**
 * Mocks the useMediaQuery hook to return a specified result.
 *
 * @param {boolean} result - The result to be returned by the mocked useMediaQuery hook.
 *
 * @returns {jest.SpyInstance<boolean, []>} A Jest spy instance for the useMediaQuery hook.
 */
const mockUseMediaQuery = (result: boolean) => {
  (useMediaQuery as jest.Mock).mockReturnValue(result);
};

export default mockUseMediaQuery;
