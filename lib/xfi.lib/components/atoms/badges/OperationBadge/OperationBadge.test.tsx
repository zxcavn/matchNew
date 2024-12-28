import { fireEvent, screen, within } from '@testing-library/react';

import '@testing-library/jest-dom';
import type { TxOperationType } from '../../../../helpers';
import { renderWithProviders } from '../../../../helpers/test';
import enMessages from '../../../../i18n/messages/en.json';
import OperationBadge, { TEST_ID } from './OperationBadge';

const operationBadgeVariants: TxOperationType[] = [
  'send',
  'sendIn',
  'sendOut',
  'bond',
  'unbond',
  'claim',
  'receive',
  'rebond',
  'fail',
  'multisend',
  'other',
  'evm',
  'contractCall',
  'createValidator',
  'unjail',
];

describe('OperationBadge component', () => {
  test('# component should be rendered on the screen with default props', () => {
    renderWithProviders(<OperationBadge />);
    const badgeElement = screen.getByTestId(TEST_ID);
    const expectedText = enMessages['LIB.OPERATIONS.OTHER'];

    expect(badgeElement).toBeInTheDocument();
    expect(badgeElement).toHaveTextContent(expectedText);
  });

  test('# component mush have any correct type', () => {
    let screen: ReturnType<typeof renderWithProviders>;
    const toUpperSnakeCase = (str: string) => str.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase();

    operationBadgeVariants.forEach(type => {
      if (screen) {
        screen.rerender(<OperationBadge type={type} />);
      } else {
        screen = renderWithProviders(<OperationBadge type={type} />);
      }

      const badgeElement = screen.getByTestId(TEST_ID);
      const expectedText = (enMessages as { [key: string]: string })[`LIB.OPERATIONS.${toUpperSnakeCase(type)}`];

      expect(badgeElement).toHaveTextContent(expectedText);
    });
  });

  test('# component render name from props', () => {
    const TEST_NAME = 'transfer to';
    const { getByTestId } = renderWithProviders(<OperationBadge name={TEST_NAME} />);

    const badgeElement = getByTestId(TEST_ID);

    expect(badgeElement).toBeInTheDocument();
    expect(within(badgeElement).getByText(TEST_NAME)).toBeInTheDocument();
  });

  test('# renders with fail type and tooltipTitle', () => {
    const type = 'fail';
    const tooltipTitle = '500';
    const { getByTestId, queryByText } = renderWithProviders(
      <OperationBadge type={type} tooltipTitle={tooltipTitle} />
    );

    expect(getByTestId(TEST_ID)).toBeInTheDocument();
    expect(queryByText(`${enMessages['LIB.ERROR_CODE']}: ${tooltipTitle}`)).not.toBeInTheDocument();

    fireEvent.mouseEnter(getByTestId(TEST_ID));
    expect(queryByText(`${enMessages['LIB.ERROR_CODE']}: ${tooltipTitle}`)).toBeInTheDocument();

    fireEvent.mouseLeave(getByTestId(TEST_ID));
    expect(within(getByTestId(TEST_ID)).queryByText(`${enMessages['LIB.ERROR_CODE']}: ${tooltipTitle}`)).toBeNull();
  });
});
