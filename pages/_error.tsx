import * as Sentry from '@sentry/nextjs';
import type { NextPageContext } from 'next';
import { AppProps } from 'next/app';
import { useIntl } from 'react-intl';

import { useWalletConnection } from '@/hocs';
import { NotFoundPage, SomethingTechnicallyWrongPage } from '@/lib/xfi.lib/components/templates/layouts';
import { LogoIcon } from '@/public/icons';
import { PAGES } from '@/shared/constants';

import { Page } from '@/components/templates';

type Props = {
  statusCode: number;
};

function Error({ pageProps: { statusCode } }: AppProps<Props>) {
  const { formatMessage } = useIntl();
  const { isConnected } = useWalletConnection();
  const homeUrl = isConnected ? PAGES.cosmosWallet.pathname : PAGES.home.pathname;

  return (
    <>
      {statusCode === 404 ? (
        <Page title={formatMessage({ id: 'LIB.ERROR_PAGE.PAGE_NOT_FOUND' })}>
          <NotFoundPage homeUrl={homeUrl} logoIcon={LogoIcon} logoViewBox={'0 0 157 44'} shouldShowToggle />
        </Page>
      ) : (
        <Page title={formatMessage({ id: 'LIB.ERROR_PAGE.SOMETHING_IS_TECHNICALLY_WRONG' })}>
          <SomethingTechnicallyWrongPage
            homeUrl={homeUrl}
            logoIcon={LogoIcon}
            logoViewBox={'0 0 157 44'}
            shouldShowToggle
          />
        </Page>
      )}
    </>
  );
}

const getInitialProps = async (contextData: NextPageContext) => {
  const { res, err } = contextData;

  const statusCode = (res ? res.statusCode : err ? err.statusCode : 404) || 500;

  return { statusCode };
};

Error.getInitialProps = Sentry.wrapErrorGetInitialPropsWithSentry(getInitialProps);

export default Error;
