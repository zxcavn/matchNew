import { screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import { renderWithProviders, waitFor } from '../../../../helpers/test';
import enMessages from '../../../../i18n/messages/en.json';
import { TOOLTIP_TITLE_TEST_ID } from '../CopyTooltipTitle';
import CopyTooltip, { type Props, TOOLTIP_TEST_ID } from './CopyTooltip';

const COPY_VALUE = 'copy value';
const COPY_TEXT = 'LIB.SUMMARY.COPY';
const EXPECTED_COPY_TEXT = enMessages[COPY_TEXT];
const EXPECTED_COPIED_TEXT = enMessages['LIB.SUMMARY.COPIED'];
const BUTTON_TEST_ID = 'button-test-id';
const TRIGGER = <button data-testid={BUTTON_TEST_ID}></button>;

describe('CopyTooltip component', () => {
  const MOCK_PROPS: Props = {
    value: COPY_VALUE,
    copyText: COPY_TEXT,
    children: TRIGGER,
  };

  test('# component must show tooltip on hover', async () => {
    const { user } = renderWithProviders(<CopyTooltip {...MOCK_PROPS}>{TRIGGER}</CopyTooltip>);

    const tooltipElement = screen.getByTestId(TOOLTIP_TEST_ID);

    await waitFor(() => user.hover(tooltipElement));

    await waitFor(() => {
      const tooltipTitle = screen.getByTestId(TOOLTIP_TITLE_TEST_ID);

      expect(tooltipTitle).toBeInTheDocument();
      expect(tooltipTitle).toHaveTextContent(EXPECTED_COPY_TEXT);
    });
    await waitFor(() => user.unhover(tooltipElement));

    await waitFor(() => {
      expect(screen.queryByTestId(TOOLTIP_TITLE_TEST_ID)).not.toBeInTheDocument();
    });
  });

  test('# component must copy value and show another tooltip title', async () => {
    const { user } = renderWithProviders(<CopyTooltip {...MOCK_PROPS}>{TRIGGER}</CopyTooltip>);

    const tooltipElement = screen.getByTestId(TOOLTIP_TEST_ID);

    await waitFor(() => user.hover(tooltipElement));
    await waitFor(() => screen.getByTestId(TOOLTIP_TITLE_TEST_ID));
    await waitFor(() => user.click(screen.getByTestId(TOOLTIP_TITLE_TEST_ID)));

    const clipboardText = await navigator.clipboard.readText();

    await waitFor(async () => {
      expect(clipboardText).toBe(COPY_VALUE);
      expect(screen.getByTestId(TOOLTIP_TITLE_TEST_ID)).toHaveTextContent(EXPECTED_COPIED_TEXT);
    });
  });
});
