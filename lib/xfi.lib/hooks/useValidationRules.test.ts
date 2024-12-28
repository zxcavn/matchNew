import { renderHook } from '@testing-library/react';
import { useIntl } from 'react-intl';

import useValidationRules, { type ValidationData } from './useValidationRules';

jest.mock('react-intl', () => ({
  useIntl: jest.fn(),
}));

describe('useValidationRules', () => {
  beforeEach(() => {
    (useIntl as jest.Mock).mockReturnValue({
      formatMessage: jest.fn((message: { id: string }) => {
        return `Formatted Message: ${message.id}`;
      }),
    });
  });

  afterAll(() => jest.clearAllMocks());

  test('# should return validation rules object with default data', () => {
    const { result } = renderHook(() => useValidationRules());

    expect(result.current.email).toBeDefined();
    expect(result.current.required).toBeDefined();
    expect(result.current.min).toBeDefined();
    expect(result.current.max).toBeDefined();
    expect(result.current.notEmptyArray).toBeDefined();
    expect(result.current.notEmptyValue).toBeDefined();
    expect(result.current.validNumber).toBeDefined();
  });

  const setup = (data: ValidationData = {}) => renderHook(() => useValidationRules(data));

  test('# email validation rule', async () => {
    const { result } = setup();
    const emailRule = result.current.email;

    expect(await emailRule.isValid('test@example.com')).toEqual(true);
    expect(await emailRule.isValid('invalidemail')).toEqual(false);
  });

  test('# required validation rule', async () => {
    const { result } = setup();
    const requiredRule = result.current.required;

    expect(await requiredRule.isValid('value')).toEqual(true);
    expect(await requiredRule.isValid('')).toEqual(false);
  });

  test('# min validation rule', async () => {
    const { result } = setup({ min: 5 });
    const minRule = result.current.min;

    expect(await minRule.isValid(6)).toEqual(true);
    expect(await minRule.isValid(4)).toEqual(false);
  });

  test('# max validation rule', async () => {
    const { result } = setup({ max: 10 });
    const maxRule = result.current.max;

    expect(await maxRule.isValid(9)).toEqual(true);
    expect(await maxRule.isValid(11)).toEqual(false);
  });

  test('# notEmptyArray validation rule', async () => {
    const { result } = setup();
    const notEmptyArrayRule = result.current.notEmptyArray;

    expect(await notEmptyArrayRule.isValid([1, 2, 3])).toEqual(true);
    expect(await notEmptyArrayRule.isValid([])).toEqual(false);
  });

  test('# notEmptyValue validation rule', async () => {
    const { result } = setup();
    const { formatMessage } = useIntl();
    const notEmptyValueRule = result.current.notEmptyValue;

    expect(await notEmptyValueRule.isValid('value')).toEqual(true);
    expect(await notEmptyValueRule.isValid(formatMessage({ id: 'LIB.SUMMARY.NOT_CHOSEN' }))).toEqual(false);
  });

  test('# validNumber validation rule', async () => {
    const { result } = setup();
    const validNumberRule = result.current.validNumber;

    expect(await validNumberRule.isValid('123')).toEqual(true);
    expect(await validNumberRule.isValid('abc')).toEqual(false);
    expect(await validNumberRule.isValid('')).toEqual(false);
  });

  // TODO: rewrite of fix test
  xtest('# should format error messages using intl', () => {
    const formatMessageMock = (useIntl as jest.Mock).mock.results[0].value.formatMessage;

    renderHook(() => useValidationRules());

    expect(formatMessageMock).toHaveBeenCalledTimes(8);
    expect(formatMessageMock).toHaveBeenNthCalledWith(1, { id: 'LIB.ERRORS.REQUIRED_FIELD' });
    expect(formatMessageMock).toHaveBeenNthCalledWith(2, { id: 'LIB.ERRORS.INCORRECT_EMAIL' });
    expect([{ id: 'LIB.ERRORS.REQUIRED_FIELD' }, { id: 'LIB.SUMMARY.NOT_CHOSEN' }]).toContainEqual(
      formatMessageMock.mock.calls[2][0]
    );
    expect(formatMessageMock).toHaveBeenNthCalledWith(4, { id: 'LIB.ERRORS.MIN_VALUE' });
  });
});
