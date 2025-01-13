import { render } from '@testing-library/react';

import '@testing-library/jest-dom';
import CleanButton, { TEST_ID } from './CleanButton';

describe('CleanButton component', () => {
  test('# component should be rendered on the screen', () => {
    const { getByTestId } = render(<CleanButton data-testid={TEST_ID} />);

    expect(getByTestId(TEST_ID)).toBeInTheDocument();
  });
});
