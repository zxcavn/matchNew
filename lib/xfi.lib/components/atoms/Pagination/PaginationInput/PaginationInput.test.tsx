import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom';
import { renderWithProviders, waitFor } from '../../../../helpers/test';
import Pagination, { type Props, DEFAULT_TEST_ID, TEST_ID } from '../Pagination';
import {
  type PaginationInputProps,
  CHANGE_VALUE_DEBOUNCE_DELAY,
  INPUT_PAGINATION_CONTAINER_TEST_ID,
  INPUT_PAGINATION_TEST_ID,
  PaginationInput,
} from './PaginationInput';

describe('PaginationInput component', () => {
  const COMMON_PROPS_PAGINATION = {
    page: 1,
    onChange: jest.fn(),
  };
  const MOCK_PROPS_DEFAULT_PAGINATION: Props = {
    ...COMMON_PROPS_PAGINATION,
    variant: 'default',
    count: 20,
  };
  const MOCK_PROPS_SHORT_PAGINATION: Props = {
    ...COMMON_PROPS_PAGINATION,
    variant: 'short',
    hasNext: true,
  };
  const MOCK_PROPS_PAGINATION_INPUT: PaginationInputProps = {
    count: 20,
    onChange: jest.fn(),
  };

  test('# component should be rendered with default pagination', () => {
    const { getByTestId } = renderWithProviders(<Pagination {...MOCK_PROPS_DEFAULT_PAGINATION} />);

    expect(getByTestId(DEFAULT_TEST_ID)).toBeInTheDocument();
    expect(getByTestId(INPUT_PAGINATION_CONTAINER_TEST_ID)).toBeInTheDocument();
  });

  test('# component should not be rendered with short pagination', () => {
    const { getByTestId, queryByTestId } = renderWithProviders(<Pagination {...MOCK_PROPS_SHORT_PAGINATION} />);

    expect(getByTestId(TEST_ID)).toBeInTheDocument();
    expect(queryByTestId(INPUT_PAGINATION_CONTAINER_TEST_ID)).not.toBeInTheDocument();
  });

  test('# component should be changed while entering numbers', async () => {
    const NUMERIC_VALUE = '123';
    const { getByTestId } = renderWithProviders(<PaginationInput {...MOCK_PROPS_PAGINATION_INPUT} />);

    const numberInputDiv = getByTestId(INPUT_PAGINATION_TEST_ID);
    const numberInput = numberInputDiv?.querySelector('input');

    if (numberInput) {
      await userEvent.type(numberInput, NUMERIC_VALUE, { delay: 0 });
      expect(numberInput).toHaveAttribute('value', NUMERIC_VALUE);
    }
  });

  test('# component should not be changed while entering letters', async () => {
    const { getByTestId } = renderWithProviders(<PaginationInput {...MOCK_PROPS_PAGINATION_INPUT} />);

    const numberInputDiv = getByTestId(INPUT_PAGINATION_TEST_ID);
    const numberInput = numberInputDiv?.querySelector('input');

    if (numberInput) {
      await userEvent.type(numberInput, 'abc', { delay: 0 });
      expect(numberInput).toHaveAttribute('value', '');
    }
  });

  test('# component should call onChange with the correct number when Enter is pressed', async () => {
    const onChange = jest.fn();

    const { getByTestId } = renderWithProviders(
      <PaginationInput {...MOCK_PROPS_PAGINATION_INPUT} onChange={onChange} />
    );

    const numberInputDiv = getByTestId(INPUT_PAGINATION_TEST_ID);
    const numberInput = numberInputDiv?.querySelector('input');

    if (numberInput) {
      await userEvent.type(numberInput, '5{enter}');
      await waitFor(() => expect(onChange).toHaveBeenCalledWith(5));
    }
  });

  test(`# component should call onChange with the correct number after ${CHANGE_VALUE_DEBOUNCE_DELAY}ms from input change`, async () => {
    const onChange = jest.fn();
    const { getByTestId } = renderWithProviders(
      <PaginationInput {...MOCK_PROPS_PAGINATION_INPUT} onChange={onChange} />
    );

    const numberInputDiv = getByTestId(INPUT_PAGINATION_TEST_ID);
    const numberInput = numberInputDiv?.querySelector('input');

    if (numberInput) {
      await userEvent.type(numberInput, '5');
      await waitFor(
        () => {
          expect(onChange).toHaveBeenCalledWith(5);
        },
        { timeout: CHANGE_VALUE_DEBOUNCE_DELAY + 100 }
      ); // Увеличиваем таймаут для ожидания debounce
    }
  });

  test('# component should set isError to true when user enters 0', async () => {
    const { getByTestId } = renderWithProviders(<PaginationInput {...MOCK_PROPS_PAGINATION_INPUT} />);

    const numberInputDiv = getByTestId(INPUT_PAGINATION_TEST_ID);
    const numberInput = numberInputDiv?.querySelector('input');

    if (numberInput) {
      await userEvent.type(numberInput, '0');
      await waitFor(() => {
        expect(numberInput).toHaveAttribute('value', '0');
        expect(numberInputDiv).toHaveClass('isError');
      });
    }
  });

  test('# component should not call onChange when Enter is pressed with 0', async () => {
    const onChange = jest.fn();

    const { getByTestId } = renderWithProviders(<PaginationInput count={20} onChange={onChange} />);

    const numberInputDiv = getByTestId(INPUT_PAGINATION_TEST_ID);
    const numberInput = numberInputDiv?.querySelector('input');

    if (numberInput) {
      await userEvent.type(numberInput, '0');
      fireEvent.keyDown(numberInput, { key: 'Enter', code: 'Enter', keyCode: 13, charCode: 13 });
      await waitFor(() => expect(onChange).not.toHaveBeenCalled());
    }
  });

  test('# component should not contain a decimal number', async () => {
    const onChange = jest.fn();

    const inputValue = '1.1';
    const expectedInputValue = 11;

    const { getByTestId } = renderWithProviders(
      <PaginationInput {...MOCK_PROPS_PAGINATION_INPUT} onChange={onChange} />
    );

    const numberInputDiv = getByTestId(INPUT_PAGINATION_TEST_ID);
    const numberInput = numberInputDiv?.querySelector('input');

    if (numberInput) {
      inputValue.split('').forEach(async letter => {
        await userEvent.type(numberInput, letter);
      });

      await waitFor(() => expect(onChange).toHaveBeenCalledWith(expectedInputValue));
    }
  });

  test('# component should not call onChange when Enter is pressed with a number that is greater than pages quantity', async () => {
    const onChange = jest.fn();

    const { getByTestId } = renderWithProviders(
      <PaginationInput {...MOCK_PROPS_PAGINATION_INPUT} onChange={onChange} />
    );

    const numberInputDiv = getByTestId(INPUT_PAGINATION_TEST_ID);
    const numberInput = numberInputDiv?.querySelector('input');

    if (numberInput) {
      await userEvent.type(numberInput, `${MOCK_PROPS_PAGINATION_INPUT.count + 1}`);
      fireEvent.keyDown(numberInput, { key: 'Enter', code: 'Enter', keyCode: 13, charCode: 13 });
      await waitFor(() => expect(onChange).not.toHaveBeenCalled());
    }
  });
});
