import urlJoin from 'url-join';

import { CROSS_FI_FOUNDATION_URL, CROSS_FINANCE_URL, XFI_SCAN_URL } from '@/shared/constants/variables';

const AVAILABLE_LOCALES = {
  [CROSS_FI_FOUNDATION_URL]: ['en'],
  [CROSS_FINANCE_URL]: [],
  [XFI_SCAN_URL]: ['en'],
  default: [],
};

const addLocale = (link: string, locale: string) => {
  const availableLocales = AVAILABLE_LOCALES[link] || AVAILABLE_LOCALES.default;

  return urlJoin(link, availableLocales.includes(locale) ? locale : '');
};

export default addLocale;
