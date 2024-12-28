import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../../helpers/test';
import { TEXT_PROPS } from '../__mocks__';
import Text, { TEST_ID } from './Text';

describe('Text component', () => {
  test('# should render Text component with default value', () => {
    const { getByTestId } = renderWithProviders(<Text {...TEXT_PROPS} />);

    expect(getByTestId(TEST_ID)).toBeInTheDocument();

    expect(getByTestId(TEST_ID)).toHaveTextContent(TEXT_PROPS.value as string);
  });

  test('# should render Text component with formatted value', () => {
    const initialTextValue = TEXT_PROPS.value as string;
    const { getByTestId } = renderWithProviders(
      <Text value={initialTextValue} format={value => value.toUpperCase()} />
    );

    expect(getByTestId(TEST_ID)).toBeInTheDocument();

    expect(getByTestId(TEST_ID)).toHaveTextContent(initialTextValue.toUpperCase());
  });
});
