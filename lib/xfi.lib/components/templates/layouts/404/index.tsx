import { Stack, Typography } from '@mui/material';
import { redirect } from '@xfi/helpers';
import { type ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';

import type { ThemeIcon } from './../../../../icons/types';
import { useMediaQuery } from './../../../../theme';
import { BackgroundAnimation, Button, TechnicalPagesHeader } from './../../../atoms';
import { NotFoundWrapper } from './styles';

type NotFoundPageProps = {
  className?: string;
  homeUrl: string;
  logoIcon: ThemeIcon;
  logoViewBox: string;
  languageSelector?: ReactNode;
  shouldShowToggle?: boolean;
};

const NotFoundPage = ({
  className,
  logoIcon,
  logoViewBox,
  homeUrl,
  languageSelector,
  shouldShowToggle = false,
}: NotFoundPageProps) => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));

  return (
    <NotFoundWrapper className={className}>
      <TechnicalPagesHeader
        logoIcon={logoIcon}
        logoViewBox={logoViewBox}
        homeUrl={homeUrl}
        languageSelector={languageSelector}
        shouldShowToggle={shouldShowToggle}
      />
      <div className="main">
        <Stack className="contentBlock">
          <Stack className="centered">
            <Typography className="mainHeader">404</Typography>
            <Typography className="mainDescription">
              <FormattedMessage id="LIB.ERROR_PAGE.PAGE_NOT_FOUND" />
            </Typography>
          </Stack>
          <Stack gap={'3rem'} className="centered">
            <Typography variant={'body1'}>
              <FormattedMessage id="LIB.ERROR_PAGE.WE_CANT_FIND_THE_PAGE" />
            </Typography>
            <Button isFullWidth={isMobile} onClick={() => redirect(homeUrl)} size={'large'}>
              <Typography variant="buttonText1">
                <FormattedMessage id="LIB.SUMMARY.TO_THE_MAIN_PAGE" />
              </Typography>
            </Button>
          </Stack>
        </Stack>
      </div>
      <BackgroundAnimation className="backgroundAnimation" />
    </NotFoundWrapper>
  );
};

export default NotFoundPage;
