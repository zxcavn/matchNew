import I18nProvider from '@/lib/i18n/I18nProvider';
import { ThemeProvider } from '@/lib/xfi.lib/theme';
import { isUnauthorizedPage } from '@/shared/constants/pages';
import { store } from '@/store';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';

import 'styles/index.scss';

const App = ({ Component, ...props }: AppProps) => {
  const { pathname } = useRouter();
  const isUnauthorized = isUnauthorizedPage(pathname);

  return (
    <ThemeProvider>
      <Provider store={store}>
        <I18nProvider>
                    {isUnauthorized ? (
                      <Component {...props} />
                    ) : (
                        <Component {...props} />
                    )}
        </I18nProvider>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
