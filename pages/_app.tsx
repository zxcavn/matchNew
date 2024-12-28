import * as Sentry from '@sentry/nextjs';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';

import { padXfiFoundationAxiosInstance, setupAxios } from '@/crud/xfiPad';
import { EvmRpcProvider, InitAppWrapper, InitialDataWrapper, WalletConnectionProvider } from '@/hocs';
import InitAppPasswordWrapper from '@/hocs/InitAppPasswordWrapper';
import I18nProvider from '@/lib/i18n/I18nProvider';
import { ThemeProvider } from '@/lib/xfi.lib/theme';
import { isUnauthorizedPage } from '@/shared/constants/pages';
import { store } from '@/store';

import 'styles/index.scss';

const NoticeWidget = dynamic(() => import('@/components/organisms/NoticeWidget'), { ssr: false });
const SocketSubscriptionProvider = dynamic(
  () => import('@/hocs/SocketSubscriptionProvider/SocketSubscriptionProvider'),
  { ssr: false }
);

Sentry.addEventProcessor(event => {
  const wallet = store.getState().wallet.wallet;

  const evmAddress = wallet.new.evmAddress;
  const oldCosmosAddress = wallet.old.address;
  const newCosmosAddress = wallet.new.address;

  if (!event.tags) {
    event.tags = {};
  }

  evmAddress && (event.tags['evmAddress'] = evmAddress);
  oldCosmosAddress && (event.tags['oldCosmosAddress'] = oldCosmosAddress);
  newCosmosAddress && (event.tags['newCosmosAddress'] = newCosmosAddress);

  return event;
});

setupAxios(padXfiFoundationAxiosInstance, store);

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
                <InitialDataWrapper>
                  <InitAppPasswordWrapper>
                    {isUnauthorized ? (
                      <Component {...props} />
                    ) : (
                      <SocketSubscriptionProvider>
                        <Component {...props} />
                      </SocketSubscriptionProvider>
                    )}
                  </InitAppPasswordWrapper>
                  <NoticeWidget />
                </InitialDataWrapper>
              </InitAppWrapper>
            </WalletConnectionProvider>
          </EvmRpcProvider>
        </I18nProvider>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
