import { type RenderOptions, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { PropsWithChildren, ReactElement } from 'react';
import { IntlProvider } from 'react-intl';

import { IntlHelpersProvider } from '../../i18n';
import enMessages from '../../i18n/messages/en.json';
import { ThemeProvider } from '../../theme';

const DEFAULT_LOCALE = 'en';

const Wrapper = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider>
      <IntlProvider messages={enMessages} defaultLocale={DEFAULT_LOCALE} locale={DEFAULT_LOCALE}>
        <IntlHelpersProvider messages={enMessages}>{children}</IntlHelpersProvider>
      </IntlProvider>
    </ThemeProvider>
  );
};

type ExtendedRenderOptions = Omit<RenderOptions, 'queries'>;

const renderWithProviders = (ui: ReactElement, renderOptions: ExtendedRenderOptions = {}) => {
  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};

export default renderWithProviders;
