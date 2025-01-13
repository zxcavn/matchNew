import { fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../helpers/test';
import waitFor from '../../../helpers/test/waitFor';
import Tooltip, { type Props, TEST_ID } from './Tooltip';

// Mocking the useIntl hook
jest.mock('react-intl', () => ({
  ...jest.requireActual('react-intl'),
  useIntl: () => ({ formatMessage: jest.fn() }),
}));

describe('Tooltip component', () => {
  const PROPS: Props = {
    title: 'Tooltip content',
    children: <p>Hover me</p>,
  };

  it('# component should be rendered and content should be displayed on hover', async () => {
    const { getByTestId, getByText, queryByText } = renderWithProviders(<Tooltip {...PROPS}>{PROPS.children}</Tooltip>);
    const tooltip = getByTestId(TEST_ID);

    expect(tooltip).toBeInTheDocument();

    fireEvent.mouseEnter(tooltip);

    await waitFor(() => {
      expect(getByText(PROPS.title as string)).toBeInTheDocument();
    });

    fireEvent.mouseLeave(tooltip);

    await waitFor(() => {
      expect(queryByText(PROPS.title as string)).not.toBeInTheDocument();
    });
  });
});
