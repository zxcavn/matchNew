import { fireEvent, render, waitFor } from '@testing-library/react';

import '@testing-library/jest-dom';
import { NONE_VALUE } from '../../../constants';
import { useIntlHelpers } from '../../../i18n';
import CollapseHeader, { TITLE_TEST_ID } from './CollapseHeader';

jest.mock('../../../i18n', () => ({
  useIntlHelpers: jest.fn(),
}));

jest.mock('react-intl', () => ({
  ...jest.requireActual('react-intl'),
  useIntl: () => ({ formatMessage: jest.fn() }),
}));

describe('CollapseHeader component', () => {
  const mockUseIntlHelpers = useIntlHelpers as jest.Mock;

  beforeEach(() => {
    mockUseIntlHelpers.mockReturnValue({
      isFormattedMessageId: jest.fn().mockReturnValue(false),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('# component should renders NONE_VALUE when title is not provided', () => {
    const { getByTestId } = render(<CollapseHeader />);

    expect(getByTestId(TITLE_TEST_ID)).toHaveTextContent(NONE_VALUE);
  });

  test('# component should be rendered on the screen with default props and copy copyData on button click', async () => {
    const titleText = 'Test Title';
    const copyData = 'Data to copy';
    const { getByTestId, getByRole } = render(<CollapseHeader title={titleText} copyData={copyData} />);

    expect(getByTestId(TITLE_TEST_ID)).toHaveTextContent(titleText);

    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(),
      },
    });

    fireEvent.click(getByRole('button'));

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(copyData);
    });
  });
});
