import { fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../helpers/test';
import Tabs, { type Props, TAB_TEST_ID, TEST_ID } from './Tabs';

jest.mock('react-intl', () => ({
  ...jest.requireActual('react-intl'),
  useIntl: () => ({ formatMessage: jest.fn() }),
}));

describe('Tabs component', () => {
  const TABS_PROPS: Props<number> = {
    tabs: [
      { label: 'Tab 1', value: 1 },
      { label: 'Tab 2', value: 2 },
      { label: 'Tab 3', value: 3, disabled: true },
    ],
    setTab: jest.fn(),
    value: 1,
  };

  test('# renders tabs correctly', () => {
    const { getByTestId } = renderWithProviders(<Tabs {...TABS_PROPS} />);

    expect(getByTestId(TEST_ID)).toBeDefined();

    expect(getByTestId(TAB_TEST_ID + '-1')).toBeDefined();
    expect(getByTestId(TAB_TEST_ID + '-2')).toBeDefined();
    expect(getByTestId(TAB_TEST_ID + '-3')).toBeDefined();
  });

  test('# calls setTab handler with correct tab value when tab clicked', () => {
    const { getByTestId } = renderWithProviders(<Tabs {...TABS_PROPS} />);
    const tab2 = getByTestId(TAB_TEST_ID + '-2');

    fireEvent.click(tab2);
    expect(TABS_PROPS.setTab).toHaveBeenCalledWith(2);
  });

  test('# tabs should be disabled when the `disabled` prop is set', () => {
    const { getByTestId } = renderWithProviders(<Tabs {...TABS_PROPS} />);

    expect(getByTestId(`${TAB_TEST_ID}-3`)).toBeDisabled();
  });
});
