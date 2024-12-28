import { screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../../helpers/test';
import Badge, { TEST_ID } from './Badge';

describe('Badge component', () => {
  const BADGE_TEXT = 'badge text';
  const CUSTOM_COLOR = 'red';
  const CUSTOM_BACKGROUND_COLOR = 'blue';
  const CUSTOM_CLASS_NAME = 'custom-classname';

  test('# component should be rendered on the screen with default props', () => {
    renderWithProviders(<Badge>{BADGE_TEXT}</Badge>);
    const badgeElement = screen.getByTestId(TEST_ID);

    expect(badgeElement).toBeInTheDocument();
    expect(badgeElement).toHaveTextContent(BADGE_TEXT);
  });

  test('# component should be rendered on the screen with custom props', () => {
    renderWithProviders(
      <Badge color={CUSTOM_COLOR} backgroundColor={CUSTOM_BACKGROUND_COLOR} className={CUSTOM_CLASS_NAME}>
        {BADGE_TEXT}
      </Badge>
    );
    const badgeElement = screen.getByTestId(TEST_ID);

    expect(badgeElement).toBeInTheDocument();
    const badgeStyles = window.getComputedStyle(badgeElement);

    expect(badgeStyles.color).toBe(CUSTOM_COLOR);
    expect(badgeStyles.backgroundColor).toBe(CUSTOM_BACKGROUND_COLOR);

    expect(badgeElement).toHaveClass(CUSTOM_CLASS_NAME);
  });
});
