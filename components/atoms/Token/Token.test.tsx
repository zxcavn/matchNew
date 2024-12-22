import { screen } from '@testing-library/react';

import { renderWithProviders } from '@/lib/xfi.lib/helpers/test';

import '@testing-library/jest-dom';
import Token, { Props, TEST_ID } from './Token';

const TOKEN_MOCK: Props = {
  symbol: 'XFI',
  name: 'XFinance',
  contractAddress: '0x123abc',
  explorerUrl: 'https://example.com',
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Token component', () => {
  test('# component should render with correct props', () => {
    renderWithProviders(<Token {...TOKEN_MOCK} />);
    const tokenElement = screen.getByTestId(TEST_ID);

    expect(tokenElement).toBeInTheDocument();

    const linkElement = screen.getByRole('link', { name: TOKEN_MOCK.name });

    expect(linkElement).toHaveAttribute('href', TOKEN_MOCK.explorerUrl);
  });
});
