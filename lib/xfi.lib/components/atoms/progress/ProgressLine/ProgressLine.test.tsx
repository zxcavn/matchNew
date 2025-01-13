import { screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../../helpers/test';
import ProgressLine, { LINE_TEST_ID, TEST_ID } from './ProgressLine';

describe('ProgressLine component', () => {
  test('# renders with default props', () => {
    renderWithProviders(<ProgressLine currentValue={50} totalValue={100} />);

    const progressLine = screen.getByTestId(TEST_ID);
    const line = screen.getByTestId(LINE_TEST_ID);

    expect(progressLine).toBeInTheDocument();
    expect(line).toBeInTheDocument();
  });

  test('# renders with non valid props', () => {
    renderWithProviders(<ProgressLine currentValue={-50} totalValue={-100} />);

    const progressLine = screen.getByTestId(TEST_ID);
    const line = screen.queryByTestId(LINE_TEST_ID);

    expect(progressLine).toBeInTheDocument();
    expect(line).not.toBeInTheDocument();
  });
});
