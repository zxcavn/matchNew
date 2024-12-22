import { fireEvent, screen } from '@testing-library/react';

import { INPUT_TEST_ID } from '@/lib/xfi.lib/components/atoms/inputs/Select/Select';
import { CURRENCIES } from '@/lib/xfi.lib/constants';
import { renderWithProviders } from '@/lib/xfi.lib/helpers/test';
import { CosmosCurrency } from '@/shared/types';

import '@testing-library/jest-dom';
import CoinSelect, { Props, TEST_ID } from './CoinSelect';

const COIN_SELECT_PROPS: Props = {
  value: CosmosCurrency.XFI,
  options: [CosmosCurrency.XFI, CosmosCurrency.MPX],
  className: 'custom-class',
};

describe('CoinSelect component', () => {
  test('# component should render with correct value', () => {
    renderWithProviders(<CoinSelect {...COIN_SELECT_PROPS} />);

    const coinSelect = screen.getByTestId(TEST_ID);

    expect(coinSelect).toBeInTheDocument();

    const selectedOption = screen.getByText(CURRENCIES.xfi.text);

    expect(selectedOption).toBeInTheDocument();
  });

  test('# component should render with all options', () => {
    const { getByTestId } = renderWithProviders(<CoinSelect {...COIN_SELECT_PROPS} />);
    const input = getByTestId(INPUT_TEST_ID);

    fireEvent.click(input);
    const optionXFI = screen.getAllByText(CURRENCIES.xfi.text);
    const optionMPX = screen.getByText(CURRENCIES.mpx.text);

    expect(optionXFI).toHaveLength(2);
    expect(optionMPX).toBeInTheDocument();
  });

  test('# component should trigger onChange event', async () => {
    const handleChange = jest.fn();

    const { getByTestId } = renderWithProviders(<CoinSelect {...COIN_SELECT_PROPS} onChange={handleChange} />);

    const input = getByTestId(INPUT_TEST_ID);

    fireEvent.click(input);

    const optionMPX = screen.getByText(CURRENCIES.mpx.text);

    fireEvent.click(optionMPX);
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
  });

  test('# component should render with custom className', () => {
    renderWithProviders(<CoinSelect {...COIN_SELECT_PROPS} className={COIN_SELECT_PROPS.className} />);
    const coinSelect = screen.getByTestId(TEST_ID);

    expect(coinSelect).toHaveClass(COIN_SELECT_PROPS.className as string);
  });
});
