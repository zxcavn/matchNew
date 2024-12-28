import { screen } from '@testing-library/react';

import { renderWithProviders } from '@/lib/xfi.lib/helpers/test';

import '@testing-library/jest-dom';
import OperationStatus, { Props, TEST_ID } from './OperationStatus';

const TEXT_MOCK: Props['text'] = 'Operation successful';

describe('OperationStatus component', () => {
  test('# component should be rendered with correct text', () => {
    renderWithProviders(<OperationStatus text={TEXT_MOCK} />);
    const successTokenOperation = screen.getByTestId(TEST_ID);

    expect(successTokenOperation).toBeInTheDocument();

    const textElement = screen.getByText(String(TEXT_MOCK));

    expect(textElement).toBeInTheDocument();
  });
});
