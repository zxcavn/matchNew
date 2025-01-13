import { cleanup, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../../helpers/test';
import RadioGroup, { TEST_ID } from './RadioGroup';

describe('RadioGroup component', () => {
  const VALUE_TEXT = 'value-text';
  const LABEL_TEXT_1 = 'label-text-1';
  const LABEL_TEXT_2 = 'label-text-2';
  const CAPTION_TEXT = 'caption-text';

  beforeEach(cleanup);

  test('# component should be rendered on the screen', () => {
    const { getByTestId } = renderWithProviders(<RadioGroup value={VALUE_TEXT} />);
    const radioGroup = getByTestId(TEST_ID);

    expect(radioGroup).toBeInTheDocument();
    expect(radioGroup).not.toHaveClass('isDisabled');
  });

  test('# renders radio group with label if provided', () => {
    const { getByText } = renderWithProviders(
      <RadioGroup label={{ type: 'text', text: LABEL_TEXT_1 }} options={[{ value: 'option' }]} />
    );
    const label = getByText(LABEL_TEXT_1);

    expect(label).toBeInTheDocument();
  });

  test('# renders radio group with options', () => {
    const { getByLabelText } = renderWithProviders(
      <RadioGroup
        options={[
          { value: 'option1', label: { type: 'text', text: LABEL_TEXT_1 } },
          { value: 'option2', label: { type: 'text', text: LABEL_TEXT_2 } },
        ]}
      />
    );
    const option1 = getByLabelText(LABEL_TEXT_1);
    const option2 = getByLabelText(LABEL_TEXT_2);

    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();
  });

  test('# calls onChange callback when radio button is clicked', () => {
    const handleChange = jest.fn();
    const { getByLabelText } = renderWithProviders(
      <RadioGroup
        value=""
        onChange={handleChange}
        options={[
          { value: 'option1', label: { type: 'text', text: LABEL_TEXT_1 } },
          { value: 'option2', label: { type: 'text', text: LABEL_TEXT_2 } },
        ]}
      />
    );
    const option1 = getByLabelText(LABEL_TEXT_1);

    fireEvent.click(option1);

    expect(handleChange).toHaveBeenCalled();
  });

  test('# renders only one selected radio button', () => {
    const { getByLabelText } = renderWithProviders(
      <RadioGroup
        value="option1"
        options={[
          { value: 'option1', label: { type: 'text', text: LABEL_TEXT_1 } },
          { value: 'option2', label: { type: 'text', text: LABEL_TEXT_2 } },
        ]}
      />
    );

    const option1 = getByLabelText(LABEL_TEXT_1);
    const option2 = getByLabelText(LABEL_TEXT_2);

    expect(option1).toBeChecked();
    expect(option2).not.toBeChecked();
  });

  test('# renders disabled radio group if isDisabled prop is true', () => {
    const { getByTestId } = renderWithProviders(<RadioGroup isDisabled options={[{ value: 'option' }]} />);

    expect(getByTestId(TEST_ID)).toHaveClass('isDisabled');
  });

  test('# renders caption if provided', () => {
    const { getByText } = renderWithProviders(
      <RadioGroup caption={{ type: 'text', text: CAPTION_TEXT }} options={[{ value: 'option' }]} />
    );
    const caption = getByText(CAPTION_TEXT);

    expect(caption).toBeInTheDocument();
  });
});
