import { screen } from '@testing-library/react';

import { renderWithProviders } from '@/lib/xfi.lib/helpers/test';

import '@testing-library/jest-dom';
import CountDown, { TEST_ID } from './CountDown';

describe('CountDown component', () => {
  test('# should display initial time correctly', () => {
    renderWithProviders(<CountDown countStart={0} />);

    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
    expect(screen.getByText('00:00:00')).toBeInTheDocument();
  });

  test('# should display time correctly with non-zero initial count', () => {
    jest.useFakeTimers();
    renderWithProviders(<CountDown countStart={10} />);
    expect(screen.getByText('00:00:10')).toBeInTheDocument();
  });
});
