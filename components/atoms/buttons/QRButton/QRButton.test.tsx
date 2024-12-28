import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '@/lib/xfi.lib/helpers/test';

import '@testing-library/jest-dom';
import QRButton, { TEST_ID } from './QRButton';

describe('QRButton component', () => {
  test('# should render QRCode when button is clicked and value is provided', () => {
    const value = 'testValue';

    renderWithProviders(<QRButton value={value} />);

    const button = screen.getByRole('button');

    fireEvent.click(button);

    const qrCode = screen.getByTestId(TEST_ID);

    expect(qrCode).toBeInTheDocument();
  });

  test('# should close QRCode popover when button is clicked again', () => {
    renderWithProviders(<QRButton value="testValue" />);

    const button = screen.getByRole('button');

    userEvent.click(button);
    userEvent.click(button);

    const qrCode = screen.queryByTestId(TEST_ID);

    expect(qrCode).not.toBeInTheDocument();
  });
});
