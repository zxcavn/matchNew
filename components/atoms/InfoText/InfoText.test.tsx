import { screen } from '@testing-library/react';

import { renderWithProviders } from '@/lib/xfi.lib/helpers/test';

import '@testing-library/jest-dom';
import InfoText, { Props, TEST_ID } from './InfoText';

const FORMATTED_TEXT_MOCK: Props['formattedText'] = { id: 'WALLET.UNDELEGATE_TIME' };

describe('InfoText component', () => {
  test('# component should render with correct formatted text', () => {
    renderWithProviders(<InfoText formattedText={FORMATTED_TEXT_MOCK} />);

    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();

    const formattedMessage = screen.getByText(String(FORMATTED_TEXT_MOCK.id));

    expect(formattedMessage).toBeInTheDocument();
  });
});
