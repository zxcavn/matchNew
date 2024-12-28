import { fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../../helpers/test';
import CopyTooltipTitle, { type Props, TOOLTIP_TITLE_TEST_ID } from './CopyTooltipTitle';

describe('CopyTooltipTitle component', () => {
  const onClick = jest.fn();

  const MOCK_PROPS: Props = {
    copyText: 'copy text',
    isCopied: true,
    onClick: onClick,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('# renders and handles click when isCopied is true', () => {
    const { getByTestId } = renderWithProviders(<CopyTooltipTitle {...MOCK_PROPS} isCopied={true} />);

    const component = getByTestId(TOOLTIP_TITLE_TEST_ID);

    expect(component).toBeInTheDocument();

    fireEvent.click(component);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('# renders correctly with isCopied false', () => {
    const { getByTestId } = renderWithProviders(<CopyTooltipTitle {...MOCK_PROPS} isCopied={false} />);

    const component = getByTestId(TOOLTIP_TITLE_TEST_ID);

    expect(component).toBeInTheDocument();
  });
});
