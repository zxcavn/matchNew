import { EvmRpcProvider, InitAppWrapper, WalletConnectionProvider } from '@/hocs';
import InitAppPasswordWrapper from '@/hocs/InitAppPasswordWrapper';
import I18nProvider from '@/lib/i18n/I18nProvider';
import { ThemeProvider } from '@/lib/xfi.lib/theme';
import { isUnauthorizedPage } from '@/shared/constants/pages';
import { store } from '@/store';
import * as Sentry from '@sentry/nextjs';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';

import 'styles/index.scss';

const SocketSubscriptionProvider = dynamic(
  () => import('@/hocs/SocketSubscriptionProvider/SocketSubscriptionProvider'),
  { ssr: false }
);

Sentry.addEventProcessor(event => {
  const wallet = store.getState();

  const evmAddress = wallet;
  const oldCosmosAddress = wallet;
  const newCosmosAddress = wallet;

  if (!event.tags) {
    event.tags = {};
  }

  evmAddress && (evmAddress);
  oldCosmosAddress && (oldCosmosAddress);
  newCosmosAddress && (newCosmosAddress);

  return event;
});


const App = ({ Component, ...props }: AppProps) => {
  const { pathname } = useRouter();
  const isUnauthorized = isUnauthorizedPage(pathname);

  return (
    <ThemeProvider>
      <Provider store={store}>
        <I18nProvider>
          <EvmRpcProvider>
            <WalletConnectionProvider>
              <InitAppWrapper>
                  <InitAppPasswordWrapper>
                    {isUnauthorized ? (
                      <Component {...props} />
                    ) : (
                      <SocketSubscriptionProvider>
                        <Component {...props} />
                      </SocketSubscriptionProvider>
                    )}
                  </InitAppPasswordWrapper>
              </InitAppWrapper>
            </WalletConnectionProvider>
          </EvmRpcProvider>
        </I18nProvider>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
