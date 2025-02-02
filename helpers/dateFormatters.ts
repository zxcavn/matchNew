import { format, formatDuration, type Duration } from 'date-fns';

import type { AppLocale } from '@/i18n';
import { DATE_LOCALES } from '@/shared/constants/locales';

export const formatDurationCount = (count: number, duration: keyof Duration, appLocale: AppLocale): string => {
  return formatDuration(
    { [duration]: count },
    {
      format: [duration],
      locale: DATE_LOCALES[appLocale] || DATE_LOCALES.en,
    }
  );
};

export const formatDate = (
  date: ConstructorParameters<typeof Date>[number],
  formatString: string,
  appLocale: AppLocale
): string => {
  return format(new Date(date), formatString, { locale: DATE_LOCALES[appLocale] || DATE_LOCALES.en });
};
