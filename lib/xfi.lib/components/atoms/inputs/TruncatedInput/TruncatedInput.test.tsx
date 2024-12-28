import { fireEvent } from '@testing-library/react';
import { useTruncatedElement } from '@xfi/hooks';

import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../../helpers/test';
import TruncatedInput from './TruncatedInput';

const TEST_ID = 'truncated-input-test-id';
const MOCK_TRUNCATED_VALUE = 'truncated...value';

jest.mock('@xfi/hooks', () => ({
  useTruncatedElement: jest.fn(),
}));

const useTruncatedElementMock = useTruncatedElement as jest.Mock;

useTruncatedElementMock.mockReturnValue({ truncatedValue: MOCK_TRUNCATED_VALUE });

const getRenderedElements = (renderResult: ReturnType<typeof renderWithProviders>) => {
  const { getByTestId } = renderResult;
  const containerElement = getByTestId(TEST_ID);
  const inputElement = containerElement.querySelector('input')!;

  return {
    containerElement,
    inputElement,
  };
};

describe('TruncatedInput component', () => {
  test('# component should be in the document', () => {
    const result = renderWithProviders(<TruncatedInput data-testid={TEST_ID} value="value" />);
    const { containerElement, inputElement } = getRenderedElements(result);

    expect(containerElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
  });

  test('# the component should have full value if there is a focus', () => {
    const EXPECTED_VALUE = 'value';
    const result = renderWithProviders(<TruncatedInput data-testid={TEST_ID} value={EXPECTED_VALUE} />);
    const { inputElement } = getRenderedElements(result);

    fireEvent.focus(inputElement);
    expect(inputElement).toHaveAttribute('value', EXPECTED_VALUE);
  });

  test('# the component should have truncated value if there is no focus', () => {
    const result = renderWithProviders(<TruncatedInput data-testid={TEST_ID} value="value" />);
    const { inputElement } = getRenderedElements(result);

    expect(inputElement).toHaveAttribute('value', MOCK_TRUNCATED_VALUE);
  });
});
