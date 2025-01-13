import { fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom';
import renderWithProviders from '../../../helpers/test/renderWithProviders';
import enMessages from '../../../i18n/messages/en.json';
import BackButton, { type Props, TEST_ID } from './BackButton';

const MOCK_PROPS: Props = {
  backText: 'LIB.SUMMARY.OPEN_LINK',
  children: <span>Children</span>,
  className: 'custom-class',
};
// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter');

describe('BackButton component', () => {
  test('# component should be rendered with back button text', () => {
    const { getByTestId } = renderWithProviders(<BackButton {...MOCK_PROPS} />);

    expect(getByTestId(TEST_ID)).toBeInTheDocument();

    expect(getByTestId(TEST_ID)).toHaveTextContent(enMessages['LIB.SUMMARY.OPEN_LINK']);
  });

  test('# should navigate back when clicked without href prop', () => {
    const mockBack = jest.fn();
    const mockRouter = { back: mockBack };

    useRouter.mockReturnValue(mockRouter);

    const { getByTestId } = renderWithProviders(<BackButton {...MOCK_PROPS} />);

    fireEvent.click(getByTestId(TEST_ID));
    expect(mockBack).toHaveBeenCalled();
  });

  test('# should navigate to specified href when clicked with href prop', () => {
    const mockPush = jest.fn();
    const mockRouter = { push: mockPush };

    useRouter.mockReturnValue(mockRouter);

    const href = '/some-page';
    const props = {
      ...MOCK_PROPS,
      href,
    };
    const { getByTestId } = renderWithProviders(<BackButton {...props} />);

    fireEvent.click(getByTestId(TEST_ID));
    expect(mockPush).toHaveBeenCalledWith(href);
  });
});
