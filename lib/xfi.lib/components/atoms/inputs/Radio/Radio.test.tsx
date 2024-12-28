import { cleanup, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../../helpers/test';
import Radio, { TEST_ID } from './Radio';

describe('Radio input component', () => {
  const VALUE_TEXT = 'value-text';
  const LABEL_TEXT = 'label-text';

  beforeEach(cleanup);

  test('# renders radio button with default props', () => {
    const { getByRole } = renderWithProviders(<Radio />);
    const radioButton = getByRole('radio');

    expect(radioButton).toBeInTheDocument();
    expect(radioButton).toHaveAttribute('type', 'radio');
    expect(radioButton).not.toBeChecked();
    expect(radioButton).not.toBeDisabled();
  });

  test('# renders radio button with label if provided', () => {
    const { getByText } = renderWithProviders(<Radio value={VALUE_TEXT} label={{ type: 'text', text: LABEL_TEXT }} />);
    const label = getByText(LABEL_TEXT);

    expect(label).toBeInTheDocument();
  });

  test('# calls onChange callback when radio button is clicked', () => {
    const handleChange = jest.fn();

    const { getByTestId } = renderWithProviders(<Radio value={VALUE_TEXT} onChange={handleChange} />);

    fireEvent.click(getByTestId(TEST_ID));

    expect(handleChange).toHaveBeenCalled();
  });

  test('# renders disabled radio button if isDisabled prop is true', () => {
    const handleChange = jest.fn();
    const { getByTestId } = renderWithProviders(<Radio onChange={handleChange} value={VALUE_TEXT} isDisabled />);
    const radioButton = getByTestId(TEST_ID);

    fireEvent.click(radioButton);

    expect(handleChange).not.toHaveBeenCalled();
  });
});
