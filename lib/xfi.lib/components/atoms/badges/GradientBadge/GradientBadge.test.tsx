import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../../helpers/test';
import Badge from './GradientBadge';

const TEST_ID = 'gradient-badge-test-id';

describe('GradientBadge component', () => {
  const BADGE_TEXT = 'badge text';

  test('# component should be rendered on the screen', () => {
    const { getByTestId } = renderWithProviders(<Badge data-testid={TEST_ID}>{BADGE_TEXT}</Badge>);
    const badgeElement = getByTestId(TEST_ID);

    expect(badgeElement).toBeInTheDocument();
    expect(badgeElement).toHaveTextContent(BADGE_TEXT);
  });
});
