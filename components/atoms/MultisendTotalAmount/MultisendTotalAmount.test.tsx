import { screen } from '@testing-library/react';
import { MxNumberFormatter } from '@xfi/formatters';

import { renderWithProviders } from '@/lib/xfi.lib/helpers/test';
import { CosmosCurrency } from '@/shared/types';

import '@testing-library/jest-dom';
import MultisendTotalAmount, {
  COIN_DENOMINATION_TEST_ID,
  COIN_ITEM_TEST_ID,
  Props,
  TEST_ID,
} from './MultisendTotalAmount';

const COINS_MOCK: Props['coins'] = [
  { denom: CosmosCurrency.XFI, amount: '100' },
  { denom: CosmosCurrency.MPX, amount: '200' },
];

describe('MultisendTotalAmount component', () => {
  test('# component should render with correct number of coins', () => {
    renderWithProviders(<MultisendTotalAmount coins={COINS_MOCK} />);

    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
    const coinElements = screen.getAllByTestId(COIN_ITEM_TEST_ID);

    expect(coinElements).toHaveLength(2);
  });

  test('# component should render with correct amount and denomination', () => {
    renderWithProviders(<MultisendTotalAmount coins={COINS_MOCK} />);
    const amountElements = screen.getAllByText(/0.0000000000000001|0.0000000000000002/);
    const denominationElements = screen.getAllByTestId(COIN_DENOMINATION_TEST_ID);

    expect(amountElements[0]).toHaveTextContent(MxNumberFormatter.formatUnitsToDisplay(COINS_MOCK[0].amount));
    expect(amountElements[1]).toHaveTextContent(MxNumberFormatter.formatUnitsToDisplay(COINS_MOCK[1].amount));
    expect(denominationElements[0]).toHaveTextContent(CosmosCurrency.XFI);
    expect(denominationElements[1]).toHaveTextContent(CosmosCurrency.MPX);
  });
});
