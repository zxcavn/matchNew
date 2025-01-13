import { cleanup, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../../helpers/test';
import Checkbox, { ACTION_TEST_ID, TEST_ID } from './Checkbox';

describe('Checkbox input component', () => {
  const LABEL_TEXT = 'label-text';
  const CAPTION_TEXT = 'caption-text';

  beforeEach(cleanup);

  test('# component should be rendered on the screen', () => {
    const { getByRole, getByTestId } = renderWithProviders(<Checkbox />);

    expect(getByTestId(TEST_ID)).toBeInTheDocument();
    expect(getByRole('checkbox')).not.toBeChecked();
  });

  test('# renders checkbox with custom label and default checked state', () => {
    const { getByRole, getByText } = renderWithProviders(
      <Checkbox label={{ type: 'text', text: LABEL_TEXT }} value={true} />
    );
    const label = getByText(LABEL_TEXT);

    expect(label).toBeInTheDocument();
    expect(getByRole('checkbox')).toBeChecked();
  });

  test('# calls onChange callback when checkbox is clicked', () => {
    let value = false;
    const handleChange = jest.fn(() => {
      value = true;
    });

    const { getByTestId, getByRole, rerender } = renderWithProviders(
      <Checkbox value={value} onChange={handleChange} />
    );

    fireEvent.click(getByTestId(ACTION_TEST_ID));
    expect(handleChange).toHaveBeenCalled();
    rerender(<Checkbox value={value} onChange={handleChange} />);
    expect(getByRole('checkbox')).toBeChecked();
  });

  test('# calls onChange callback when isDisabled prop passed', () => {
    const handleChange = jest.fn();

    const { getByTestId } = renderWithProviders(<Checkbox isDisabled onChange={handleChange} />);

    fireEvent.click(getByTestId(ACTION_TEST_ID));
    expect(handleChange).not.toHaveBeenCalled();
  });

  test('# renders error message when isError prop is true', () => {
    const { getByText } = renderWithProviders(<Checkbox isError caption={{ type: 'text', text: CAPTION_TEXT }} />);
    const errorMessage = getByText(CAPTION_TEXT);

    expect(errorMessage).toBeInTheDocument();
  });
});
