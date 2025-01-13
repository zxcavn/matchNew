import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../../helpers/test';
import { DATETIME_PROPS } from '../__mocks__';
import DateTime, { type Props } from './DateTime';

const dt = new Date(DATETIME_PROPS.date);
const dtDateOnly = new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000);

const IGNORE_TIMEZONE_DATETIME_PROPS = { ...DATETIME_PROPS, date: String(dtDateOnly) };

describe('DateTime component', () => {
  test('# should render formatted date and time', () => {
    const { getByText } = renderWithProviders(<DateTime {...IGNORE_TIMEZONE_DATETIME_PROPS} />);

    expect(getByText('February 16, 2024')).toBeInTheDocument();
    expect(getByText('12:34:56')).toBeInTheDocument();
  });

  test('# should render with custom date and time formats', () => {
    const customFormatProps: Props = {
      ...IGNORE_TIMEZONE_DATETIME_PROPS,
      dateFormat: 'dd/MM/yyyy',
      timeFormat: 'hh:mm a',
    };
    const { getByText } = renderWithProviders(<DateTime {...customFormatProps} />);

    expect(getByText('16/02/2024')).toBeInTheDocument();

    expect(getByText('12:34 PM')).toBeInTheDocument();
  });

  test('# should render with default time format if not provided', () => {
    const noTimeFormatProps: Props = {
      ...IGNORE_TIMEZONE_DATETIME_PROPS,
      timeFormat: undefined,
    };
    const { getByText } = renderWithProviders(<DateTime {...noTimeFormatProps} />);

    expect(getByText('February 16, 2024')).toBeInTheDocument();
    expect(getByText('12:34:56')).toBeInTheDocument();
  });

  test('# should render with default date format if not provided', () => {
    const noDateFormatProps: Props = {
      ...IGNORE_TIMEZONE_DATETIME_PROPS,
      dateFormat: undefined,
    };
    const { getByText } = renderWithProviders(<DateTime {...noDateFormatProps} />);

    expect(getByText('February 16, 2024')).toBeInTheDocument();
  });
});
