import { fireEvent, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../../helpers/test';
import Input, { TEST_ID } from './Input';

describe('Input component', () => {
  const VALUE_TEXT = 'value-text';
  const PLACEHOLDER_TEXT = 'placeholder-text';
  const LABEL_TEXT = 'label-text';
  const PREFIX_TEXT = 'prefix-text';
  const SUFFIX_TEXT = 'suffix-text';
  const CAPTION_TEXT = 'caption-text';

  test('# renders input with default props', () => {
    const { getByTestId } = renderWithProviders(<Input />);
    const input = getByTestId(TEST_ID);

    expect(input).toBeInTheDocument();
    expect(input).not.toHaveAttribute('maxLength');
    expect(input).not.toHaveValue();
  });

  test('# renders input with custom placeholder', () => {
    const { getByPlaceholderText } = renderWithProviders(
      <Input placeholder={{ type: 'text', text: PLACEHOLDER_TEXT }} />
    );
    const placeholderText = getByPlaceholderText(PLACEHOLDER_TEXT);

    expect(placeholderText).toBeInTheDocument();
  });

  test('# renders multiline input', () => {
    renderWithProviders(<Input multiline resizable rows={5} minRows={5} maxRows={10} />);

    const textarea = screen.getByRole('textbox');

    expect(textarea.tagName).toBe('TEXTAREA');
    expect(textarea).toHaveAttribute('rows');
  });

  test('# renders label if provided', () => {
    const { getByText } = renderWithProviders(<Input label={{ type: 'text', text: LABEL_TEXT }} />);
    const label = getByText(LABEL_TEXT);

    expect(label).toBeInTheDocument();
  });

  test('# calls onChange callback with input', () => {
    const handleChange = jest.fn();
    const { getByRole } = renderWithProviders(
      <Input onChange={handleChange} label={{ type: 'text', text: LABEL_TEXT }} />
    );

    const input = getByRole('textbox');

    fireEvent.change(input, { target: { value: VALUE_TEXT } });

    expect(input).toHaveValue(VALUE_TEXT);
    expect(handleChange).toHaveBeenCalled();
  });

  test('# does not call onChange callback with isDisabled prop', () => {
    const handleChange = jest.fn();
    const { getByRole } = renderWithProviders(
      <Input isDisabled onChange={handleChange} label={{ type: 'text', text: LABEL_TEXT }} />
    );

    const input = getByRole('textbox');

    fireEvent.change(input, { target: { value: VALUE_TEXT } });

    expect(input).toBeDisabled();
  });

  test('# renders prefix if provided', () => {
    const { getByText } = renderWithProviders(<Input prefix={PREFIX_TEXT} />);
    const prefix = getByText(PREFIX_TEXT);

    expect(prefix).toBeInTheDocument();
  });

  test('# renders suffix if provided', () => {
    const { getByText } = renderWithProviders(<Input suffix={SUFFIX_TEXT} />);
    const suffix = getByText(SUFFIX_TEXT);

    expect(suffix).toBeInTheDocument();
  });

  test('# renders caption if provided', () => {
    const { getByText } = renderWithProviders(<Input caption={{ type: 'text', text: CAPTION_TEXT }} />);
    const caption = getByText(CAPTION_TEXT);

    expect(caption).toBeInTheDocument();
  });
});
