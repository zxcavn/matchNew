import { Box } from '@mui/material';
import Link from 'next/link';
import type { ReactNode } from 'react';

import type { ThemeIcon } from '../../../icons/types';
import { Icon } from '../Icon';
import { ThemeToggle } from '../ThemeToggle';
import { StyledTechnicalPagesHeader } from './styles';

export type Props = {
  logoIcon: ThemeIcon;
  logoViewBox: string;
  homeUrl: string;
  languageSelector?: ReactNode;
  shouldShowToggle?: boolean;
};

/**
 * `TechnicalPagesHeader` is a header component designed for technical pages(e.g. 404, 505).
 * It displays a logo, an optional theme toggle, and an optional language selector.
 *
 * @param {ThemeIcon} logoIcon - The icon for the logo displayed in the header.
 * @param {string} logoViewBox - The viewBox attribute for the SVG logo.
 * @param {string} homeUrl - The URL that the logo links to.
 * @param {ReactNode} [languageSelector] - An optional component for selecting the language.
 * @param {boolean} [shouldShowToggle] - Determines whether to show the theme toggle.
 *
 * @returns {JSX.Element} The rendered `TechnicalPagesHeader` component.
 */
const TechnicalPagesHeader = ({ logoIcon, logoViewBox, homeUrl, languageSelector, shouldShowToggle }: Props) => (
  <StyledTechnicalPagesHeader>
    <Box className="headerContent">
      <Link href={homeUrl}>
        <Icon
          src={logoIcon}
          viewBox={logoViewBox}
          sx={{
            height: { md: '3.4375rem', xs: '2.0625rem' },
            width: 'auto',
          }}
        />
      </Link>
      <Box display={'flex'} alignItems={'center'} gap={{ xs: '1rem', sm: '1.5rem' }}>
        {shouldShowToggle && <ThemeToggle />}
        {languageSelector && languageSelector}
      </Box>
    </Box>
  </StyledTechnicalPagesHeader>
);

export default TechnicalPagesHeader;
