import { Page } from '@/components/templates';
import * as Sentry from '@sentry/nextjs';
import type { NextPageContext } from 'next';
import { AppProps } from 'next/app';
import { useIntl } from 'react-intl';

type Props = {
  statusCode: number;
};

function Error({ pageProps: { statusCode } }: AppProps<Props>) {
  const { formatMessage } = useIntl();

  return (
    <>
      {statusCode === 404 ? (
        <Page title={formatMessage({ id: 'LIB.ERROR_PAGE.PAGE_NOT_FOUND' })}>
        </Page>
      ) : (
        <Page title={formatMessage({ id: 'LIB.ERROR_PAGE.SOMETHING_IS_TECHNICALLY_WRONG' })}>
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
