import { fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../../helpers/test';
import PasswordInput, { SHOW_PASS_TEST_ID, TEST_ID, TOOLTIP_TEST_ID } from './PasswordInput';

describe('PasswordInput component', () => {
  const VALUE_TEXT = 'value-text';
  const DEFAULT_VALUE_TEXT = 'default-value-text';
  const PLACEHOLDER_TEXT = 'placeholder-text';
  const LABEL_TEXT = 'label-text';
  const PREFIX_TEXT = 'prefix-text';
  const CAPTION_TEXT = 'caption-text';
  const PASSWORD_RULES = [
    {
      rule: /^.{12,}$/,
      message: 'password should be longer than 12 symbols',
    },
  ];

  test('# renders input with default props', () => {
    const { getByTestId } = renderWithProviders(<PasswordInput />);
    const input = getByTestId(TEST_ID);

    expect(input).toBeInTheDocument();
    expect(input).not.toHaveValue();
  });

  test('# renders input with custom placeholder', () => {
    const { getByPlaceholderText } = renderWithProviders(
      <PasswordInput placeholder={{ type: 'text', text: PLACEHOLDER_TEXT }} />
    );
    const placeholderText = getByPlaceholderText(PLACEHOLDER_TEXT);

    expect(placeholderText).toBeInTheDocument();
  });

  test('# renders label if provided', () => {
    const { getByText } = renderWithProviders(<PasswordInput label={{ type: 'text', text: LABEL_TEXT }} />);
    const label = getByText(LABEL_TEXT);

    expect(label).toBeInTheDocument();
  });

  test('# calls onChange callback with input', () => {
    const handleChange = jest.fn();
    const { getByDisplayValue } = renderWithProviders(
      <PasswordInput
        onChange={handleChange}
        label={{ type: 'text', text: LABEL_TEXT }}
        defaultValue={DEFAULT_VALUE_TEXT}
      />
    );

    const input = getByDisplayValue(DEFAULT_VALUE_TEXT);

    fireEvent.change(input, { target: { value: VALUE_TEXT } });

    expect(handleChange).toHaveBeenCalled();
    expect(input).toHaveValue(VALUE_TEXT);
  });

  test('# does not call onChange callback with isDisabled prop', () => {
    const handleChange = jest.fn();
    const { getByDisplayValue } = renderWithProviders(
      <PasswordInput isDisabled onChange={handleChange} label={{ type: 'text', text: LABEL_TEXT }} value={VALUE_TEXT} />
    );

    const input = getByDisplayValue(VALUE_TEXT);

    fireEvent.change(input, { target: { value: VALUE_TEXT } });

    expect(input).toBeDisabled();
  });

  test('# renders prefix if provided', () => {
    const { getByText } = renderWithProviders(<PasswordInput prefix={PREFIX_TEXT} />);
    const prefix = getByText(PREFIX_TEXT);

    expect(prefix).toBeInTheDocument();
  });

  test('# renders caption if provided', () => {
    const { getByText } = renderWithProviders(<PasswordInput caption={{ type: 'text', text: CAPTION_TEXT }} />);
    const caption = getByText(CAPTION_TEXT);

    expect(caption).toBeInTheDocument();
  });

  test('# renders rules tooltip if rules provided and exist', () => {
    const { getByTestId, getByDisplayValue } = renderWithProviders(
      <PasswordInput passwordRules={PASSWORD_RULES} value={VALUE_TEXT} isWithValidation />
    );
    const input = getByDisplayValue(VALUE_TEXT);

    fireEvent.focus(input);

    const tooltip = getByTestId(TOOLTIP_TEST_ID);

    expect(tooltip).toBeInTheDocument();
  });

  test('# change symbols visibility via click on eye icon', () => {
    const { getByTestId, getByRole } = renderWithProviders(
      <PasswordInput passwordRules={PASSWORD_RULES} value={VALUE_TEXT} />
    );
    const changePassVisibilityIcon = getByTestId(SHOW_PASS_TEST_ID);

    fireEvent.click(changePassVisibilityIcon);
    //inputs with type='password' do not have role at all. So, getting input by role 'textbox' proves type changing
    const input = getByRole('textbox');

    expect(input).toBeInTheDocument();
  });

  test('# not to show rules tooltip when password follows the provided rules', () => {
    const { queryByTestId, getByDisplayValue } = renderWithProviders(
      <PasswordInput passwordRules={PASSWORD_RULES} value={DEFAULT_VALUE_TEXT} />
    );
    const input = getByDisplayValue(DEFAULT_VALUE_TEXT);

    fireEvent.focus(input);
    const tooltip = queryByTestId(TOOLTIP_TEST_ID);

    expect(tooltip).not.toBeInTheDocument();
  });
});
