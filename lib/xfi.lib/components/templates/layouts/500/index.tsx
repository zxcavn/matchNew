import { Stack, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';

import type { ThemeIcon } from '../../../../icons/types';
import { TechnicalPagesHeader } from '../../../atoms';
import Background from './../../../../images/something-technically-wrong-bg.webp';
import BackgroundImageDark from './../../../../images/something-technically-wrong-image-dark.webp';
import BackgroundImageLight from './../../../../images/something-technically-wrong-image-light.webp';
import { AppThemeVariant } from './../../../../theme';
import { SomethingTechnicallyWrongWrapper } from './styles';

type Props = {
  className?: string;
  logoIcon: ThemeIcon;
  logoViewBox: string;
  homeUrl: string;
  languageSelector?: ReactNode;
  shouldShowToggle?: boolean;
};

const SomethingTechnicallyWrongPage = ({
  className,
  logoIcon,
  logoViewBox,
  homeUrl,
  languageSelector,
  shouldShowToggle = false,
}: Props) => {
  const isDarkMode = useTheme().palette.mode === AppThemeVariant.dark;

  return (
    <SomethingTechnicallyWrongWrapper className={className}>
      <TechnicalPagesHeader
        logoIcon={logoIcon}
        logoViewBox={logoViewBox}
        homeUrl={homeUrl}
        languageSelector={languageSelector}
        shouldShowToggle={shouldShowToggle}
      />
      <div className="main">
        <Stack className="contentBlock">
          <Stack className="centered" gap={{ md: '4rem', xs: '3.5rem' }}>
            <Typography className="mainHeader">
              <FormattedMessage id="LIB.ERROR_PAGE.SOMETHING_IS_TECHNICALLY_WRONG" />
            </Typography>
            <Typography className="mainDescription">
              <FormattedMessage id="LIB.ERROR_PAGE.THANKS_FOR_NOTICING" />
            </Typography>
          </Stack>
        </Stack>
      </div>
      <div className="backgroundWrapper">
        {isDarkMode && <Image className="background" src={Background} alt="background" />}
        <Image
          className="backgroundIcon"
          src={isDarkMode ? BackgroundImageDark : BackgroundImageLight}
          alt="background icon"
        />
      </div>
    </SomethingTechnicallyWrongWrapper>
  );
};

export default SomethingTechnicallyWrongPage;
