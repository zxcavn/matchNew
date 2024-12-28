import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../../helpers/test';
import NotFound, { type Props, TEST_ID } from './NotFound';

const EXTRA_SLOT_TEST_ID = 'extra-slot';

const NOT_FOUND_PROPS: Props = {
  config: {
    text: 'CUSTOM_NOT_FOUND_TEXT',
    extraSlot: <div data-testid={EXTRA_SLOT_TEST_ID}>Extra Content</div>,
  },
};

describe('NotFound component', () => {
  test('# should render default not found message when notFoundText prop is not provided', () => {
    const { getByText } = renderWithProviders(<NotFound />);

    expect(getByText('Not found')).toBeInTheDocument();
  });

  test('# should render custom not found message and extraSlot when config is provided', () => {
    const { getByTestId, getByText } = renderWithProviders(<NotFound {...NOT_FOUND_PROPS} />);

    expect(getByTestId(TEST_ID)).toBeInTheDocument();
    expect(getByText(NOT_FOUND_PROPS.config?.text as string)).toBeInTheDocument();
    expect(getByTestId(EXTRA_SLOT_TEST_ID)).toBeInTheDocument();
  });
});
