import { cleanup, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../../helpers/test';
import Autocomplete, { type AutocompleteOptionType, TEST_ID } from './Autocomplete';

const LABEL_TEXT_1 = 'label-text-1';
const LABEL_TEXT_2 = 'label-text-2';
const PLACEHOLDER_TEXT = 'placeholder-text';
const CAPTION_TEXT = 'caption-text';
const SELECT_LABEL_TEXT = 'select-label-text';
const OPTION_1_TEXT = 'option-1-text';
const OPTION_2_TEXT = 'option-2-text';

const MOCK_OPTIONS: AutocompleteOptionType[] = [
  { value: OPTION_1_TEXT, label: { type: 'text', text: LABEL_TEXT_1 } },
  { value: OPTION_2_TEXT, label: { type: 'text', text: LABEL_TEXT_2 } },
];

describe('Autocomplete component', () => {
  afterEach(cleanup);

  test('# renders autocomplete component with various props', () => {
    const handleChange = jest.fn();
    const { getByTestId, getByText, getByPlaceholderText, queryAllByTestId } = renderWithProviders(
      <Autocomplete
        label={{ type: 'text', text: SELECT_LABEL_TEXT }}
        placeholder={{ type: 'text', text: PLACEHOLDER_TEXT }}
        caption={{ type: 'text', text: CAPTION_TEXT }}
        options={MOCK_OPTIONS}
        value={OPTION_1_TEXT}
        onChange={handleChange}
        isDisabled
      />
    );

    // Check if component is rendered
    expect(getByTestId(TEST_ID)).toBeInTheDocument();

    // Check if label is rendered
    expect(getByText(SELECT_LABEL_TEXT)).toBeInTheDocument();

    // Check if placeholder is rendered
    expect(getByPlaceholderText(PLACEHOLDER_TEXT)).toBeInTheDocument();

    // Check if caption is rendered
    expect(getByText(CAPTION_TEXT)).toBeInTheDocument();

    // Check if options are rendered when input is clicked
    fireEvent.click(getByTestId(TEST_ID));
    expect(queryAllByTestId(TEST_ID).length).toEqual(1);
  });
});
