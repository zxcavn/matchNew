import { render } from '@testing-library/react';

import '@testing-library/jest-dom';
import Divider, { TEST_ID } from './Divider';

describe('Divider component', () => {
  test('# component should be rendered on the screen', () => {
    const { getByTestId } = render(<Divider data-testid={TEST_ID} />);

    expect(getByTestId(TEST_ID)).toBeInTheDocument();
  });
});
