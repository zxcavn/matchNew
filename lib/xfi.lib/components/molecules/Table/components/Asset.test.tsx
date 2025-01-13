import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../../helpers/test';
import { ASSET_TEST_PROPS } from '../__mocks__';
import Asset, { TEST_ID } from './Asset';

describe('Asset component', () => {
  test('# should render with provided props', () => {
    const { getByTestId, getByText } = renderWithProviders(<Asset {...ASSET_TEST_PROPS} />);

    expect(getByTestId(TEST_ID)).toBeInTheDocument();
    expect(getByText(ASSET_TEST_PROPS.value)).toBeInTheDocument();
    expect(getByText(ASSET_TEST_PROPS.text)).toBeInTheDocument();
    expect(getByTestId(TEST_ID)).toHaveClass(ASSET_TEST_PROPS.className);
  });

  test('# should render custom className if provided', () => {
    const { getByTestId } = renderWithProviders(
      <Asset value={ASSET_TEST_PROPS.value} text={ASSET_TEST_PROPS.text} className={ASSET_TEST_PROPS.className} />
    );

    expect(getByTestId(TEST_ID)).toHaveClass(ASSET_TEST_PROPS.className);
  });

  test('# should render different value and text props', () => {
    const DIFFERENT_PROPS = {
      text: 'EUR',
      value: '€200',
    };
    const { getByText } = renderWithProviders(<Asset value={DIFFERENT_PROPS.value} text={DIFFERENT_PROPS.text} />);

    expect(getByText(DIFFERENT_PROPS.value)).toBeInTheDocument();
    expect(getByText(DIFFERENT_PROPS.text)).toBeInTheDocument();
  });
});
