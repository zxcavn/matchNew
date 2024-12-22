import { renderWithProviders } from '@/lib/xfi.lib/helpers/test';

import '@testing-library/jest-dom';
import ModalErrorMessage, {
  ADDITIONAL_MESSAGE_TEXT_TEST_ID,
  MESSAGE_TEXT_TEST_ID,
  MODAL_ERROR_MESSAGE_TEST_ID,
} from './ModalErrorMessage';

describe('ModalErrorMessage component', () => {
  const MESSAGE = 'message';
  const ADDITIONAL_MESSAGE = 'additional message';

  test('# should be rendered the message correctly', () => {
    const { getByTestId, queryByTestId } = renderWithProviders(<ModalErrorMessage message={MESSAGE} />);

    expect(getByTestId(MODAL_ERROR_MESSAGE_TEST_ID)).toBeInTheDocument();
    expect(getByTestId(MESSAGE_TEXT_TEST_ID)).toHaveTextContent(MESSAGE);
    expect(queryByTestId(ADDITIONAL_MESSAGE_TEXT_TEST_ID)).not.toBeInTheDocument();
  });

  test('# should be rendered the additional message when provided', () => {
    const { getByTestId } = renderWithProviders(
      <ModalErrorMessage message={MESSAGE} additional={ADDITIONAL_MESSAGE} />
    );

    expect(getByTestId(MESSAGE_TEXT_TEST_ID)).toHaveTextContent(MESSAGE);
    expect(getByTestId(ADDITIONAL_MESSAGE_TEXT_TEST_ID)).toHaveTextContent(ADDITIONAL_MESSAGE);
  });
});
