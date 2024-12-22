jest.mock('next/router', () => jest.requireActual('next-router-mock'));

jest.mock(
  'url-join',
  () =>
    (...args) =>
      args.join('/')
);

jest.mock('@mui/material', () => {
  return {
    ...jest.requireActual('@mui/material'),
    useMediaQuery: jest.fn().mockReturnValue(false),
  };
});
