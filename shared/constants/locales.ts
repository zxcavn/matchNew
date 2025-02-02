import type { Locale } from 'date-fns';
import en from 'date-fns/locale/en-US';
import es from 'date-fns/locale/es';
import id from 'date-fns/locale/id';
import vi from 'date-fns/locale/vi';

import { OptionType } from '@/components/atoms';
import { AppLocale } from '@/lib/i18n';

export const LANGUAGES: OptionType<AppLocale>[] = [
  {
    value: 'en',
    label: {
      type: 'text',
      text: 'English',
    },
  },
  {
    value: 'vi',
    label: {
      type: 'text',
      text: 'Tiếng Việt',
    },
  },
  {
    value: 'id',
    label: {
      type: 'text',
      text: 'Indonesia',
    },
  },
  {
    value: 'es',
    label: {
      type: 'text',
      text: 'Español',
    },
  },
];

export const DATE_LOCALES: Record<AppLocale, Locale> = {
  es,
  vi,
  id,
  en,
};
