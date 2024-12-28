import { fireEvent, within } from '@testing-library/react';
import { useState } from 'react';

import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../../helpers/test';
import Select, { type OptionType, INPUT_TEST_ID, OPTION_TEST_ID, TEST_ID } from './Select';

const LABEL_TEXT_1 = 'label-text-1';
const LABEL_TEXT_2 = 'label-text-2';
const PLACEHOLDER_TEXT = 'placeholder-text';
const CAPTION_TEXT = 'caption-text';
const SELECT_LABEL_TEXT = 'select-label-text';
const OPTION_1_TEXT = 'option-1-text';
const OPTION_2_TEXT = 'option-2-text';

const MOCK_OPTIONS: OptionType<string>[] = [
  { value: OPTION_1_TEXT, label: { type: 'text', text: LABEL_TEXT_1 } },
  { value: OPTION_2_TEXT, label: { type: 'text', text: LABEL_TEXT_2 } },
];

describe('Select component', () => {
  test('# renders correctly with default props', () => {
    const { getByTestId } = renderWithProviders(<Select options={MOCK_OPTIONS} value={[OPTION_1_TEXT]} />);

    expect(getByTestId(TEST_ID)).toBeInTheDocument();
  });

  test('# renders label, options, placeholder, and caption correctly', () => {
    const { getByText, getByPlaceholderText } = renderWithProviders(
      <Select
        label={{ type: 'text', text: SELECT_LABEL_TEXT }}
        options={MOCK_OPTIONS}
        value={[OPTION_1_TEXT]}
        placeholder={{ type: 'text', text: PLACEHOLDER_TEXT }}
        caption={{ type: 'text', text: CAPTION_TEXT }}
      />
    );

    expect(getByText(SELECT_LABEL_TEXT)).toBeInTheDocument();
    expect(getByText(LABEL_TEXT_1)).toBeInTheDocument();
    expect(getByPlaceholderText(PLACEHOLDER_TEXT)).toBeInTheDocument();
    expect(getByText(CAPTION_TEXT)).toBeInTheDocument();
  });

  test('# calls onChange callback when an option is selected', () => {
    const handleChange = jest.fn();

    const RenderSelect = () => {
      const [value, setValue] = useState<string | string[]>(OPTION_1_TEXT);

      return (
        <Select
          options={MOCK_OPTIONS}
          value={value}
          onChange={e => {
            handleChange(e);
            setValue(e.target.value);
          }}
        />
      );
    };

    const { getByTestId, getByRole } = renderWithProviders(<RenderSelect />);

    const input = getByTestId(INPUT_TEST_ID);

    fireEvent.click(input);

    const ul = getByRole('listbox');

    expect(ul).toBeInTheDocument();

    const option2 = within(ul).getByText(LABEL_TEXT_2);

    fireEvent.click(option2);

    expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ target: { value: OPTION_2_TEXT } }));
    expect(input).toHaveValue(OPTION_2_TEXT);
  });

  test('# renders disabled select if isDisabled prop is true', () => {
    const { getByTestId, queryAllByTestId } = renderWithProviders(
      <Select options={MOCK_OPTIONS} value={[OPTION_1_TEXT]} isDisabled />
    );

    const input = getByTestId(INPUT_TEST_ID);

    fireEvent.click(input);

    // Verify that no options are displayed
    const optionElements = queryAllByTestId(OPTION_TEST_ID);

    expect(optionElements.length).toEqual(0);
  });
});
