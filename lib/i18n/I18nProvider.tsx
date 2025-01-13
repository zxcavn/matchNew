import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';
import { IntlProvider } from 'react-intl';

import { IntlHelpersProvider } from '@/lib/xfi.lib/i18n';
import libEnMessages from '@/lib/xfi.lib/i18n/messages/en.json';
import libEsMessages from '@/lib/xfi.lib/i18n/messages/es.json';
import libIdMessages from '@/lib/xfi.lib/i18n/messages/id.json';
import libViMessages from '@/lib/xfi.lib/i18n/messages/vi.json';

import { DEFAULT_LOCALE } from './i18n';
import enMessages from './messages/en.json';
import esMessages from './messages/es.json';
import idMessages from './messages/id.json';
import viMessages from './messages/vi.json';

const allMessages: { [key: string]: Record<string, string> } = {
  en: { ...enMessages, ...libEnMessages },
  vi: { ...viMessages, ...libViMessages },
  id: { ...idMessages, ...libIdMessages },
  es: { ...esMessages, ...libEsMessages },
};

const I18nProvider = ({ children }: PropsWithChildren) => {
  const { locale } = useRouter();

  const messages = allMessages[locale || DEFAULT_LOCALE];

  return (
    <IntlProvider defaultLocale={DEFAULT_LOCALE} locale={locale || DEFAULT_LOCALE} messages={messages}>
      <IntlHelpersProvider messages={allMessages.en}>{children}</IntlHelpersProvider>
    </IntlProvider>
  );
};

export default I18nProvider;
