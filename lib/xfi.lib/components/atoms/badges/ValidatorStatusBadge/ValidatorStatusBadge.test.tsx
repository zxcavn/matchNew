import { createTheme } from '@mui/material/styles';
import { cleanup } from '@testing-library/react';

import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../../helpers/test';
import enMessages from '../../../../i18n/messages/en.json';
import { darkTheme } from '../../../../theme/variants';
import ValidatorStatusBadge, { type ValidatorBadgeVariant, TEST_ID } from './ValidatorStatusBadge';

const theme = createTheme(darkTheme);
const validatorBadgeVariants: ValidatorBadgeVariant[] = ['active', 'ready', 'jailed'];

describe('ValidatorStatusBadge component', () => {
  test('# component should be rendered on the screen', () => {
    validatorBadgeVariants.forEach(type => {
      const { getByTestId } = renderWithProviders(<ValidatorStatusBadge status={type} />);

      const badgeElement = getByTestId(TEST_ID);
      const expectedText = (enMessages as { [key: string]: string })[`LIB.VALIDATOR_STATUS.${type.toUpperCase()}`];

      expect(badgeElement).toHaveTextContent(expectedText);

      expect(badgeElement).toBeInTheDocument();
      cleanup();
    });
  });

  test('# renders correctly with different status types', () => {
    validatorBadgeVariants.forEach(type => {
      const { getByTestId } = renderWithProviders(<ValidatorStatusBadge status={type} />);
      const badgeElement = getByTestId(TEST_ID);

      const expectedColor = theme.palette.badges[type.toLowerCase()].color;
      const expectedBackground = theme.palette.badges[type.toLowerCase()].background;

      expect(badgeElement).toHaveStyle(`color: ${expectedColor}`);
      expect(badgeElement).toHaveStyle(`background-color: ${expectedBackground}`);
      cleanup();
    });
  });
});
