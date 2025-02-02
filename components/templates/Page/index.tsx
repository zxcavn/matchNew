import NextHead from 'next/head';
import { PropsWithChildren } from 'react';
import { useIntl } from 'react-intl';
import urlJoin from 'url-join';

import { DEFAULT_LOCALE } from '@/lib/i18n';
import { DOMAIN } from '@/shared/constants';
import { theme } from '@/theme';

type Props = {
  title?: string;
} & PropsWithChildren;

// todo add default title
const Page = ({ children, title = '' }: Props) => {
  const { locale = DEFAULT_LOCALE, formatMessage } = useIntl();

  const metaTitle = formatMessage({ id: 'META.TITLE' });
  const metaDescription = formatMessage({ id: 'META.DESCRIPTION' });

  return (
    <>
      <NextHead>
        <title>XFI Console {title && `| ${formatMessage({ id: title })}`}</title>

        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"
        />
        <meta name="keywords" content="XFI console, CrossFi blockchain" />

        <meta property="title" content={metaTitle} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:site_name" content={metaTitle} />
        <meta property="og:url" content={urlJoin(DOMAIN, locale)} />
        <meta property="description" content={metaDescription} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content="/images/meta_console.png" />
        <meta property="og:image:type" content="image/png" />

        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content={theme.palette.primary.main} />
      </NextHead>
      <noscript>no script</noscript>
      {children}
    </>
  );
};

export default Page;
