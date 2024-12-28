import { screen } from '@testing-library/react';
import { formatAddressToDisplay, formatXdsNameToDisplay } from '@xfi/formatters';

import '@testing-library/jest-dom';
import { renderWithProviders, waitFor } from '../../../helpers/test';
import XdsAddressTooltip, { CHECK_ICON_TEST_ID, COPY_BUTTON_TEST_ID, TEST_ID } from './XdsAddressTooltip';

describe('XdsAddressTooltip component', () => {
  const TOOLTIP_CONTENT = 'TOOLTIP_CONTENT';
  const ADDRESS = '0xC316c18A7B02c3216eF3ad6Cf9Cfe0cF5250096b';
  const NAME = 'name.xfi';

  test('# should be rendered on the screen', async () => {
    const { getByTestId, user } = renderWithProviders(
      <XdsAddressTooltip name={NAME} address={ADDRESS}>
        <div>{TOOLTIP_CONTENT}</div>
      </XdsAddressTooltip>
    );
    const elementElement = getByTestId(TEST_ID);

    expect(elementElement).toBeInTheDocument();
    expect(elementElement).toHaveTextContent(TOOLTIP_CONTENT);

    await waitFor(() => user.hover(elementElement));
    await waitFor(() => {
      expect(screen.getByText(formatXdsNameToDisplay(NAME))).toBeInTheDocument();
      expect(screen.getByText(formatAddressToDisplay(ADDRESS))).toBeInTheDocument();
    });
  });

  test('# should be rendered with copy button', async () => {
    const { getByTestId, user } = renderWithProviders(
      <XdsAddressTooltip withCopyAddress name={NAME} address={ADDRESS}>
        <div>{TOOLTIP_CONTENT}</div>
      </XdsAddressTooltip>
    );
    const elementElement = getByTestId(TEST_ID);

    await waitFor(() => user.hover(elementElement));
    const copyButtonElement = screen.getByTestId(COPY_BUTTON_TEST_ID);

    expect(copyButtonElement).toBeInTheDocument();
    await waitFor(() => user.click(copyButtonElement));
    expect(screen.getByTestId(CHECK_ICON_TEST_ID)).toBeInTheDocument();
  });
});
