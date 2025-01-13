import { cleanup } from '@testing-library/react';

import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../../helpers/test';
import { InputText } from '../types';
import CheckboxGroup, { TEST_ID } from './CheckboxGroup';

const NAME_TEXT_1 = 'name-text-1';
const NAME_TEXT_2 = 'name-text-2';
const LABEL_TEXT = 'label-text';
const OPTION_LABEL_TEXT_1 = 'option-label-text-1';
const OPTION_LABEL_TEXT_2 = 'option-label-text-2';
const CAPTION_TEXT = 'caption-text';

const MOCK_OPTIONS: { label: InputText; name: string }[] = [
  { label: { type: 'text', text: OPTION_LABEL_TEXT_1 }, name: NAME_TEXT_1 },
  { label: { type: 'text', text: OPTION_LABEL_TEXT_2 }, name: NAME_TEXT_2 },
];

describe('CheckboxGroup input component', () => {
  beforeEach(cleanup);

  test('# renders checkboxGroup with label and options with checked option', () => {
    const { getByText, getByLabelText, getByTestId } = renderWithProviders(
      <CheckboxGroup options={MOCK_OPTIONS} label={{ type: 'text', text: LABEL_TEXT }} value={[NAME_TEXT_2]} />
    );

    expect(getByTestId(TEST_ID)).toBeInTheDocument();

    const label = getByText(LABEL_TEXT);

    expect(label).toBeInTheDocument();

    expect(getByLabelText(OPTION_LABEL_TEXT_1)).toBeInTheDocument();
    expect(getByLabelText(OPTION_LABEL_TEXT_2)).toBeInTheDocument();

    expect(getByLabelText(OPTION_LABEL_TEXT_2)).toBeChecked();
    expect(getByLabelText(OPTION_LABEL_TEXT_1)).not.toBeChecked();
  });

  test('# renders error message when isError prop is true', () => {
    const { getByText } = renderWithProviders(
      <CheckboxGroup
        options={MOCK_OPTIONS}
        isError
        caption={{ type: 'text', text: CAPTION_TEXT }}
        value={[NAME_TEXT_1]}
      />
    );
    const errorMessage = getByText(CAPTION_TEXT);

    expect(errorMessage).toBeInTheDocument();
  });
});
