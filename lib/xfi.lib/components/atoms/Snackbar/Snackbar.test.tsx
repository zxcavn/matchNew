/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import { renderWithProviders, waitFor } from '../../../helpers/test';
import Snackbar, { TEST_ID } from './Snackbar';

describe('Snackbar component', () => {
  const TEXT_CONTENT = 'text content message';
  const AUTO_HIDE_DURATION = 500;
  const TIMEOUT = AUTO_HIDE_DURATION * 2;
  const CONTENT = <div>{TEXT_CONTENT}</div>;

  let onClick: ReturnType<typeof jest.fn>;

  beforeEach(() => {
    onClick = jest.fn();
  });

  test('# component should be rendered on the screen', () => {
    const { rerender } = renderWithProviders(
      <Snackbar isOpen={false} onClose={onClick}>
        {CONTENT}
      </Snackbar>
    );

    expect(screen.queryByTestId(TEST_ID)).not.toBeInTheDocument();
    rerender(
      <Snackbar isOpen={true} onClose={onClick}>
        {CONTENT}
      </Snackbar>
    );
    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_ID)).toHaveTextContent(TEXT_CONTENT);
  });

  test(`# component should be closed after ${AUTO_HIDE_DURATION} ms`, async () => {
    const { user } = renderWithProviders(
      <Snackbar isOpen={true} onClose={onClick} autoHideDuration={AUTO_HIDE_DURATION}>
        {CONTENT}
      </Snackbar>
    );

    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();

    await user.click(document.body);
    await waitFor(
      () => {
        expect(onClick).toHaveBeenCalled();
      },
      { timeout: TIMEOUT }
    );
  });
});
