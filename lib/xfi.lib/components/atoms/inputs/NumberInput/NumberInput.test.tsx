import { cleanup, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../../helpers/test';
import NumberInput, { TEST_ID } from './NumberInput';

describe('NumberInput component', () => {
  const VALUE_TEXT = 'value-text';
  const NUMERIC_VALUE_TEXT = '123';
  const INVALID_VALUE_TEXT = 'abc';
  const PLACEHOLDER_TEXT = 'placeholder-text';
  const COMMA_INVALID_TEXT = '31,22';
  const DOT_INVALID_TEXT = '.22';
  const DOT_VALID_TEXT = '22.22';

  beforeEach(cleanup);

  test('# component should be rendered on the screen with value', () => {
    const { getByRole, getByTestId } = renderWithProviders(<NumberInput value={NUMERIC_VALUE_TEXT} />);

    expect(getByTestId(TEST_ID)).toBeInTheDocument();
    expect(getByRole('textbox')).toHaveValue(NUMERIC_VALUE_TEXT);
  });

  test('# component should be rendered on the screen without value', () => {
    const { getByRole, getByTestId } = renderWithProviders(<NumberInput value={VALUE_TEXT} />);

    expect(getByTestId(TEST_ID)).toBeInTheDocument();
    expect(getByRole('textbox')).not.toHaveValue(VALUE_TEXT);
  });

  test('# calls onChange callback with valid numeric input', () => {
    const handleChange = jest.fn();
    const { getByPlaceholderText } = renderWithProviders(
      <NumberInput onChange={handleChange} placeholder={{ type: 'text', text: PLACEHOLDER_TEXT }} />
    );
    const input = getByPlaceholderText(PLACEHOLDER_TEXT);

    fireEvent.change(input, { target: { value: NUMERIC_VALUE_TEXT } });
    fireEvent.change(input, { target: { value: DOT_VALID_TEXT } });

    expect(handleChange).toHaveBeenCalledTimes(2);
  });

  test('# does not call onChange callback with invalid input', () => {
    const handleChange = jest.fn();
    const { getByPlaceholderText } = renderWithProviders(
      <NumberInput onChange={handleChange} placeholder={{ type: 'text', text: PLACEHOLDER_TEXT }} />
    );
    const input = getByPlaceholderText(PLACEHOLDER_TEXT);

    fireEvent.change(input, { target: { value: INVALID_VALUE_TEXT } });
    fireEvent.change(input, { target: { value: COMMA_INVALID_TEXT } });
    fireEvent.change(input, { target: { value: DOT_INVALID_TEXT } });

    expect(handleChange).not.toHaveBeenCalled();
  });
});
