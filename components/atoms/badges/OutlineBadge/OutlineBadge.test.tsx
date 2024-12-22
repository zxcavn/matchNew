import { screen } from '@testing-library/react';

import { renderWithProviders } from '@/lib/xfi.lib/helpers/test';

import '@testing-library/jest-dom';
import OutlineBadge, { Props, TEST_ID } from './OutlineBadge';

const OUTLINE_BADGE_PROPS: Props = {
  text: 'test',
  icon: <div data-testid="test-icon" />,
};

describe('OutlineBadge component', () => {
  test('# should render with text correctly', () => {
    renderWithProviders(<OutlineBadge text={OUTLINE_BADGE_PROPS.text} />);

    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  test('# should display icon if provided', () => {
    renderWithProviders(<OutlineBadge {...OUTLINE_BADGE_PROPS} />);

    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  test('# should not display icon if not provided', () => {
    renderWithProviders(<OutlineBadge text="test" />);

    expect(screen.queryByTestId('test-icon')).toBeNull();
  });
});
