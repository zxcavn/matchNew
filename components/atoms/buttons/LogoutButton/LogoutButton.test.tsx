import { fireEvent, screen } from '@testing-library/react';

import { renderWithProviders } from '@/lib/xfi.lib/helpers/test';
import waitFor from '@/lib/xfi.lib/helpers/test/waitFor';

import '@testing-library/jest-dom';
import LogoutButton, { Props, TEST_ID } from './LogoutButton';

const MOCKS: Props = {
  handleLogoutClick: jest.fn(),
  isExtensionConnection: true,
};

describe('LogoutButton component', () => {
  test('# should render and call handleLogoutClick when clicked', async () => {
    const { getByTestId } = renderWithProviders(<LogoutButton {...MOCKS} />);
    const button = getByTestId(TEST_ID);

    await waitFor(() => fireEvent.click(button));
    expect(MOCKS.handleLogoutClick).toHaveBeenCalled();
  });

  test('# should display tooltip with correct title', async () => {
    const { getByTestId } = renderWithProviders(<LogoutButton {...MOCKS} />);
    const tooltip = getByTestId(TEST_ID);

    fireEvent.mouseEnter(tooltip);

    await waitFor(() => {
      const tooltipText = screen.getByText('SUMMARY.LOG_OUT');

      expect(tooltipText).toBeInTheDocument();
    });
  });
});
