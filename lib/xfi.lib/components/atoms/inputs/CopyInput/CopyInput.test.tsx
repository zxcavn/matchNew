import { cleanup, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../../helpers/test';
import CopyInput, { TEST_ID } from './CopyInput';

describe('CopyInput component', () => {
  const VALUE_TEXT = 'value-text';
  const INVALID_VALUE_TEXT = 'invalid-value-text';

  beforeEach(cleanup);

  test('# component should be rendered on the screen with value', () => {
    const { getByRole, getByTestId } = renderWithProviders(<CopyInput value={VALUE_TEXT} />);

    expect(getByTestId(TEST_ID)).toBeInTheDocument();
    expect(getByRole('textbox')).toHaveValue(VALUE_TEXT);
  });

  test('# component onChange should be triggered', () => {
    const handleChange = jest.fn();
    const { getByRole, getByTestId } = renderWithProviders(<CopyInput onChange={handleChange} />);

    expect(getByTestId(TEST_ID)).toBeInTheDocument();
    fireEvent.change(getByRole('textbox'), { target: { value: VALUE_TEXT } });

    expect(handleChange).toHaveBeenCalled();
  });

  test('# component onChange should not be triggered when the value is invalid', () => {
    const handleChange = jest.fn();
    const { getByRole, getByTestId } = renderWithProviders(<CopyInput variant="number" onChange={handleChange} />);

    expect(getByTestId(TEST_ID)).toBeInTheDocument();
    fireEvent.change(getByRole('textbox'), { target: { value: INVALID_VALUE_TEXT } });

    expect(handleChange).not.toHaveBeenCalled();
  });
});
