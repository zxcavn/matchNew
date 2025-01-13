import { SvgIcon, SvgIconProps } from '@mui/material';
import { fireEvent, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../helpers/test';
import type { ThemeIcon } from '../../../icons/types';
import TechnicalPagesHeader from './TechnicalPagesHeader';

const MockIcon: ThemeIcon = {
  light: (props: SvgIconProps) => (
    <SvgIcon data-testid="mock-icon-light" {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  ),
  dark: (props: SvgIconProps) => (
    <SvgIcon data-testid="mock-icon-dark" {...props}>
      <path d="M12 2L2 12h3v8h5v-6h4v6h5v-8h3L12 2z" />
    </SvgIcon>
  ),
};

describe('TechnicalPagesHeader component', () => {
  const LANGUAGE_SELECTOR_TEST_ID = 'language-selector-test-id';

  const languageSelector = <div data-testid={LANGUAGE_SELECTOR_TEST_ID}>Language Selector</div>;

  test('# component should be rendered on the screen with default props', () => {
    renderWithProviders(<TechnicalPagesHeader logoIcon={MockIcon} logoViewBox="0 0 24 24" homeUrl="/home" />);

    expect(screen.getByTestId('mock-icon-dark')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/home');
  });

  test('# component should render languageSelector if provided', () => {
    renderWithProviders(
      <TechnicalPagesHeader
        logoIcon={MockIcon}
        logoViewBox="0 0 24 24"
        homeUrl="/home"
        languageSelector={languageSelector}
      />
    );

    expect(screen.getByTestId(LANGUAGE_SELECTOR_TEST_ID)).toBeInTheDocument();
  });

  test('# component should not render languageSelector if not provided', () => {
    renderWithProviders(<TechnicalPagesHeader logoIcon={MockIcon} logoViewBox="0 0 24 24" homeUrl="/home" />);

    expect(screen.queryByTestId(LANGUAGE_SELECTOR_TEST_ID)).not.toBeInTheDocument();
  });

  test('# component should render ThemeToggle if shouldShowToggle is true', () => {
    renderWithProviders(
      <TechnicalPagesHeader logoIcon={MockIcon} logoViewBox="0 0 24 24" homeUrl="/home" shouldShowToggle={true} />
    );

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  test('# component should not render ThemeToggle if shouldShowToggle is false', () => {
    renderWithProviders(
      <TechnicalPagesHeader logoIcon={MockIcon} logoViewBox="0 0 24 24" homeUrl="/home" shouldShowToggle={false} />
    );

    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
  });

  test('# component should navigate to the homeUrl when logo is clicked', () => {
    const { getByRole } = renderWithProviders(
      <TechnicalPagesHeader logoIcon={MockIcon} logoViewBox="0 0 24 24" homeUrl="/home" />
    );

    const logoLink = getByRole('link');

    fireEvent.click(logoLink);

    expect(logoLink).toHaveAttribute('href', '/home');
  });
});
