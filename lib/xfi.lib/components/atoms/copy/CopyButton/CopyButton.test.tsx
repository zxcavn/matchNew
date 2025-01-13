import { screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import { renderWithProviders, waitFor } from '../../../../helpers/test';
import CopyButton, { BUTTON_TEST_ID, BUTTON_TEXT_TEST_ID } from './CopyButton';

const COPY_VALUE = 'copy value';

describe('CopyButton component', () => {
  test('# component must copy value and show tooltip', async () => {
    const { user } = renderWithProviders(<CopyButton value={COPY_VALUE} />);
    const copyElement = screen.getByTestId(BUTTON_TEST_ID);

    expect(copyElement).toBeInTheDocument();

    await waitFor(() => user.click(copyElement));

    const clipboardText = await navigator.clipboard.readText();

    expect(clipboardText).toBe(COPY_VALUE);
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
  });

  test('# component should be without text', () => {
    renderWithProviders(<CopyButton value={COPY_VALUE} hasText={false} />);
    const textElement = screen.queryByTestId(BUTTON_TEXT_TEST_ID);

    expect(textElement).not.toBeInTheDocument();
  });
});
