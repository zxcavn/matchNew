import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../helpers/test';
import { FILLED_INPUTS_DATA, INPUT_TEST_IDS, INPUTS_DATA, NUMBER_TEST_ID, VALIDATION_RULES } from './__mocks__';
import FormBlock, { SUBMIT_BUTTON_TEST_ID, TEST_ID } from './FormBlock';

const initialValues = {
  textInput: '',
  checkbox: false,
  checkboxGroup: [],
  radioGroup: '',
  select: '',
  switch: false,
};

describe('FormBlock component', () => {
  test('# renders FormBlock component with all input fields types', () => {
    renderWithProviders(
      <FormBlock
        id="test-form"
        inputsData={INPUTS_DATA}
        initialValues={initialValues}
        validationRules={VALIDATION_RULES}
        withButton
      />
    );

    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();

    INPUT_TEST_IDS.forEach(testId => {
      const elements = screen.queryAllByTestId(testId);

      expect(elements.length).toBeGreaterThanOrEqual(1);
    });
  });

  test('# should render button when withButton prop is true', () => {
    const { getByTestId } = renderWithProviders(<FormBlock id="form" inputsData={INPUTS_DATA} withButton />);

    const submitButton = getByTestId(SUBMIT_BUTTON_TEST_ID);

    expect(submitButton).toBeInTheDocument();
  });

  test('# should not render button when withButton prop is false', () => {
    const { queryByTestId } = renderWithProviders(<FormBlock id="form" inputsData={INPUTS_DATA} />);

    const submitButton = queryByTestId(SUBMIT_BUTTON_TEST_ID);

    expect(submitButton).not.toBeInTheDocument();
  });

  test('# prevent submits form with invalid data when button is clicked', async () => {
    const onSubmit = jest.fn();

    renderWithProviders(
      <FormBlock
        id="test-form"
        inputsData={INPUTS_DATA}
        validationRules={VALIDATION_RULES}
        withButton
        onSubmit={onSubmit}
      />
    );

    const submitButton = screen.getByTestId(SUBMIT_BUTTON_TEST_ID);

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });

  test('# should be called with valid form data', async () => {
    const handleSubmit = jest.fn();

    renderWithProviders(<FormBlock id="form" inputsData={FILLED_INPUTS_DATA} onSubmit={handleSubmit} withButton />);

    const submitButton = screen.getByTestId(SUBMIT_BUTTON_TEST_ID);

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
    });
  });

  test('# should display error messages when submitting empty fields', async () => {
    const handleSubmit = jest.fn();

    const INITIAL_VALUES = {
      textInput: '',
      checkbox: undefined,
      checkboxGroup: undefined,
      radioGroup: '',
      select: '',
      switch: undefined,
      file: undefined,
    };

    const { getByTestId, findByText } = renderWithProviders(
      <FormBlock
        id="form"
        inputsData={INPUTS_DATA}
        initialValues={INITIAL_VALUES}
        validationRules={VALIDATION_RULES}
        onSubmit={handleSubmit}
        withButton
      />
    );

    const submitButton = getByTestId(SUBMIT_BUTTON_TEST_ID);

    fireEvent.click(submitButton);

    await waitFor(async () => {
      expect(handleSubmit).not.toHaveBeenCalled();
      expect(await findByText('Text field is required')).toBeInTheDocument();
      expect(await findByText('Number field is required')).toBeInTheDocument();
      expect(await findByText('Select field is required')).toBeInTheDocument();
      expect(await findByText('Checkbox field is required')).toBeInTheDocument();
      expect(await findByText('Checkbox group field is required')).toBeInTheDocument();
      expect(await findByText('Radio group selection is required')).toBeInTheDocument();
      expect(await findByText('Switch field is required')).toBeInTheDocument();
      expect(await findByText('File upload is required')).toBeInTheDocument();
    });
  });

  test('# should correctly show and hide validation errors', async () => {
    const { findByText, findAllByText, container } = renderWithProviders(
      <FormBlock id="test-form" inputsData={INPUTS_DATA} validationRules={VALIDATION_RULES} />
    );

    const textInput = container.querySelector('[type="text"]');
    const numberInput = container.querySelector(`[data-testid=${NUMBER_TEST_ID}] input`);

    // Check reaction focus/blur in text input
    if (textInput) {
      fireEvent.focus(textInput);
      fireEvent.blur(textInput);
      expect(await findByText('Text field is required')).toBeInTheDocument();
      expect(await findAllByText(/is required/)).toHaveLength(1);
    }

    // Check reaction focus/blur in number input
    if (numberInput) {
      fireEvent.focus(numberInput);
      fireEvent.blur(numberInput);
      expect(await findByText('Number field is required')).toBeInTheDocument();
      expect(await findAllByText(/is required/)).toHaveLength(2);

      // Check reaction when validation is passed
      await userEvent.type(numberInput, '123');
      expect(await findAllByText(/is required/)).toHaveLength(1);
    }
  });
});
