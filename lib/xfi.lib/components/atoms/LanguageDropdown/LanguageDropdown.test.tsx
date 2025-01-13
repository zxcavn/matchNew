import { fireEvent, screen, within } from '@testing-library/react';
import { useState } from 'react';

import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../helpers/test';
import type { OptionType } from '../inputs/Select';
import LanguageDropdown, {
  DISABLED_SELECTOR_CLASS_NAME,
  SELECT_TEST_ID,
  SELECTED_TEST_ID,
  TEST_ID,
} from './LanguageDropdown';

const LANGUAGES: OptionType<string>[] = [
  { value: 'en', label: { type: 'text', text: 'English' } },
  { value: 'ru', label: { type: 'text', text: 'Russian' } },
];

const onChange = jest.fn();

describe('LanguageDropdown component', () => {
  test('# renders correctly with multiple languages', () => {
    const RenderLanguageDropdown = () => {
      const [value, setValue] = useState<string>(LANGUAGES[0].value);

      return (
        <LanguageDropdown
          languages={LANGUAGES}
          locale={value}
          onLanguageChange={e => {
            const value = e.target.value;

            onChange(e);
            setValue(Array.isArray(value) ? value[0] : value);
          }}
        />
      );
    };

    const { getByTestId } = renderWithProviders(<RenderLanguageDropdown />);

    const dropdown = getByTestId(TEST_ID);

    expect(dropdown).toBeInTheDocument();

    const selectInput = getByTestId(SELECT_TEST_ID);

    expect(selectInput).toBeInTheDocument();

    const selectedLanguage = getByTestId(SELECTED_TEST_ID);

    expect(selectedLanguage).toHaveTextContent(LANGUAGES[0].value);

    fireEvent.click(selectInput);

    const ul = screen.getByRole('listbox');

    expect(ul).toBeInTheDocument();

    const liElements = within(ul).getAllByRole('option');

    expect(liElements.length).toBe(LANGUAGES.length);

    const secondLanguage = LANGUAGES[1];

    if (secondLanguage.label?.type === 'text') {
      const option = within(ul).getByText(secondLanguage.label.text);

      fireEvent.click(option);

      expect(onChange).toHaveBeenCalled();
      expect(selectedLanguage).toHaveTextContent(secondLanguage.value);
    }
  });

  test('# renders with one language and prevent open list', () => {
    const { getByTestId } = renderWithProviders(
      <LanguageDropdown languages={[LANGUAGES[0]]} locale={LANGUAGES[0].value} onLanguageChange={onChange} />
    );

    const dropdown = getByTestId(TEST_ID);

    expect(dropdown).toHaveClass(DISABLED_SELECTOR_CLASS_NAME);

    const selectInput = getByTestId(SELECT_TEST_ID);

    expect(selectInput).toBeInTheDocument();

    fireEvent.click(selectInput);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});
