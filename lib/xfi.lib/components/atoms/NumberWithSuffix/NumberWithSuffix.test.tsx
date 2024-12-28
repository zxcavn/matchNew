import { cleanup } from '@testing-library/react';

import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../helpers/test';
import { AUTOCOMPLETE_NONE_VALUE } from '../inputs';
import NumberWithSuffix from './NumberWithSuffix';

const TEST_NUMBER = 200;
const TEST_NUMBER_AS_STRING = '200';
const TEST_STRING = 'test';

describe('NumberWithSuffix component', () => {
  afterEach(cleanup);

  test('# renders NumberWithSuffix component with number as string', () => {
    const { getByText } = renderWithProviders(<NumberWithSuffix value={TEST_NUMBER_AS_STRING} />);

    // Check if number as string is rendered
    expect(getByText(TEST_NUMBER_AS_STRING)).toBeInTheDocument();
  });

  test('# renders NumberWithSuffix component with number', () => {
    const { getByText } = renderWithProviders(<NumberWithSuffix value={TEST_NUMBER} />);

    // Check if number is rendered
    expect(getByText(TEST_NUMBER)).toBeInTheDocument();
  });

  test('# renders NumberWithSuffix component with string', () => {
    const { getByText, queryByText } = renderWithProviders(<NumberWithSuffix value={TEST_STRING} />);

    // Check if invalid string is not rendered
    expect(getByText(AUTOCOMPLETE_NONE_VALUE)).toBeInTheDocument();
    expect(queryByText(TEST_STRING)).not.toBeInTheDocument();
  });
});
