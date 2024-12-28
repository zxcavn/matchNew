import { cleanup, render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import Figure from './Figure';

const TEST_ID = 'figure-test-id';

describe('Figure component', () => {
  beforeEach(cleanup);

  test('# component should be rendered on the screen', () => {
    render(<Figure data-testid={TEST_ID} />);
    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
  });
});
