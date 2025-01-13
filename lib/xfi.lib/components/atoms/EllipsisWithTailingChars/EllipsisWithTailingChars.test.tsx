import { screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../helpers/test';
import EllipsisWithTailingChars, { TEST_ID } from './EllipsisWithTailingChars';

class MockResizeObserver {
  observe() {
    // TODO: Mock implementation
  }

  unobserve() {
    // TODO: Mock implementation
  }

  disconnect() {
    // TODO: Mock implementation
  }
}

global.ResizeObserver = MockResizeObserver as any;

describe('EllipsisWithTailingChars component', () => {
  test('# should render on the screen', () => {
    const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

    renderWithProviders(<EllipsisWithTailingChars text={longText} typographyVariant="body2" endChars={3} />);
    const ellipsisElement = screen.getByTestId(TEST_ID);

    expect(ellipsisElement).toBeInTheDocument();

    expect(ellipsisElement.textContent).toContain(longText);
  });
});
