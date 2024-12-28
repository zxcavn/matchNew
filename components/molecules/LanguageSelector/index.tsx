import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';

import { useAppDispatch } from '@/hooks';
import { setLanguage } from '@/lib/i18n';
import { LanguageDropdown, SelectProps } from '@/lib/xfi.lib/components/atoms';
import { LANGUAGES } from '@/shared/constants/locales';

const LanguageSelector = () => {
  const { locale } = useIntl();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onLanguageChange: SelectProps['onChange'] = e => {
    if (Array.isArray(e.target.value)) {
      return;
    }

    const newLang = e.target.value;

    dispatch(setLanguage(e.target.value));
    router.push(router.pathname, router.asPath, { locale: newLang });
  };

  return <LanguageDropdown languages={LANGUAGES} onLanguageChange={onLanguageChange} locale={locale} />;
};

export default LanguageSelector;
