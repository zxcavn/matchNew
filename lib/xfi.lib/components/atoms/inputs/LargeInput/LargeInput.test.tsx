import { fireEvent } from '@testing-library/react';
import { useState } from 'react';

import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../../helpers/test';
import LargeInput, { TEST_ID, TRIGGER_TEST_ID } from './LargeInput';

describe('LargeInput component', () => {
  const VALUE_TEXT = 'value-text';
  const PLACEHOLDER_TEXT = 'placeholder-text';
  const LABEL_TEXT = 'label-text';
  const CAPTION_TEXT = 'caption-text';
  const DROPDOWN_TEXT_1 = 'dropdown-text-1';
  const DROPDOWN_TEXT_2 = 'dropdown-text-2';

  test('# renders input with value', () => {
    const { getByTestId } = renderWithProviders(<LargeInput type="default" value="test" />);
    const input = getByTestId(TEST_ID);

    expect(input).toBeInTheDocument();
    expect(input).not.toHaveValue();
  });

  test('# renders input with custom placeholder', () => {
    const { getByPlaceholderText } = renderWithProviders(
      <LargeInput type="default" value="test" placeholder={{ type: 'text', text: PLACEHOLDER_TEXT }} />
    );
    const placeholderText = getByPlaceholderText(PLACEHOLDER_TEXT);

    expect(placeholderText).toBeInTheDocument();
  });

  test('# renders label if provided', () => {
    const { getByText } = renderWithProviders(
      <LargeInput type="default" value="test" label={{ type: 'text', text: LABEL_TEXT }} />
    );
    const label = getByText(LABEL_TEXT);

    expect(label).toBeInTheDocument();
  });

  test('# calls onChange callback with input', () => {
    const handleChange = jest.fn();
    const { getByRole } = renderWithProviders(
      <LargeInput type="default" onChange={handleChange} label={{ type: 'text', text: LABEL_TEXT }} />
    );

    const input = getByRole('textbox');

    fireEvent.change(input, { target: { value: VALUE_TEXT } });

    expect(input).toHaveValue(VALUE_TEXT);
    expect(handleChange).toHaveBeenCalled();
  });

  test('# does not call onChange callback with isDisabled prop', () => {
    const handleChange = jest.fn();
    const { getByRole } = renderWithProviders(
      <LargeInput
        type="default"
        value="test"
        isDisabled
        onChange={handleChange}
        label={{ type: 'text', text: LABEL_TEXT }}
      />
    );

    const input = getByRole('textbox');

    fireEvent.change(input, { target: { value: VALUE_TEXT } });

    expect(input).toBeDisabled();
  });

  test('# renders caption if provided', () => {
    const { getByText } = renderWithProviders(
      <LargeInput type="default" value="test" caption={{ type: 'text', text: CAPTION_TEXT }} />
    );
    const caption = getByText(CAPTION_TEXT);

    expect(caption).toBeInTheDocument();
  });

  test('# renders input with dropdown', () => {
    const handleChange = jest.fn();
    const { getByText } = renderWithProviders(
      <LargeInput
        type="dropdown"
        dropdownConfig={[{ label: DROPDOWN_TEXT_1, value: DROPDOWN_TEXT_1 }]}
        onDropdownChange={handleChange}
      />
    );
    const dropdownCurrentText = getByText(DROPDOWN_TEXT_1);

    expect(dropdownCurrentText).toBeInTheDocument();
  });

  test('# opens dropdown on trigger click', () => {
    const handleChange = jest.fn();
    const { getByTestId, getByText } = renderWithProviders(
      <LargeInput
        type="dropdown"
        dropdownConfig={[
          { label: DROPDOWN_TEXT_1, value: DROPDOWN_TEXT_1 },
          { label: DROPDOWN_TEXT_2, value: DROPDOWN_TEXT_2 },
        ]}
        onDropdownChange={handleChange}
      />
    );
    const dropdownTrigger = getByTestId(TRIGGER_TEST_ID);

    fireEvent.click(dropdownTrigger);

    const dropdownOption = getByText(DROPDOWN_TEXT_2);

    expect(dropdownOption).toBeInTheDocument();
  });

  test('# changes dropdown option', () => {
    const RenderLargeInput = () => {
      const [dropdownValue, setDropdownValue] = useState(DROPDOWN_TEXT_1);

      return (
        <LargeInput
          type="dropdown"
          dropdownValue={dropdownValue}
          dropdownConfig={[
            { label: DROPDOWN_TEXT_1, value: DROPDOWN_TEXT_1 },
            { label: DROPDOWN_TEXT_2, value: DROPDOWN_TEXT_2 },
          ]}
          onDropdownChange={setDropdownValue}
        />
      );
    };

    const { getByTestId, getByText, queryByText } = renderWithProviders(<RenderLargeInput />);

    const dropdownTrigger = getByTestId(TRIGGER_TEST_ID);

    expect(dropdownTrigger).toHaveTextContent(DROPDOWN_TEXT_1);

    fireEvent.click(dropdownTrigger);

    const dropdownOption2 = getByText(DROPDOWN_TEXT_2);

    fireEvent.click(dropdownOption2);

    expect(dropdownTrigger).toHaveTextContent(DROPDOWN_TEXT_2);

    const dropdownOption1 = queryByText(DROPDOWN_TEXT_1);

    expect(dropdownOption1).not.toBeVisible();
  });
});
