import { renderWithProviders } from '@/lib/xfi.lib/helpers/test';

import '@testing-library/jest-dom';
import TokenAvatar, { Props, TEST_ID } from './TokenAvatar';

const TOKEN_MOCK: Props = {
  symbol: 'XFI',
  contractAddress: '0xabcdef1234567890',
};

describe('TokenAvatar component', () => {
  test('# should render token avatar with correct symbol and background color', () => {
    const { getByTestId, getByText } = renderWithProviders(<TokenAvatar {...TOKEN_MOCK} />);

    const avatarElement = getByTestId(TEST_ID);
    const letterElement = getByText(TOKEN_MOCK.symbol[0]);

    expect(avatarElement).toBeInTheDocument();
    expect(avatarElement).toHaveStyle('background-color: rgb(70, 110, 100)');
    expect(letterElement).toBeInTheDocument();
  });
});
