// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

import Package from './package.json';
import { APP_ENV, DOMAIN, SENTRY_DNS_URL } from './shared/constants';

const isInjectedCodeError = (event: Sentry.Event): boolean => {
  const frames = event?.exception?.values?.[0]?.stacktrace?.frames;

  /**
   * Impossible to identify location of the error without stacktrace frames.
   */
  if (!frames || !frames.length) {
    return false;
  }

  /**
   * Injected anonymous functions.
   */
  const firstFrame = frames[0];

  if (firstFrame?.filename?.includes('<anonymous>')) {
    return true;
  }

  /**
   * Errors that occur outside the application.
   * Check for a `_next/static` folder in the path.
   */
  const lastFrame = frames.at(-1);
  const staticDirPath = '_next/static';

  if (!(lastFrame?.abs_path?.includes(staticDirPath) || lastFrame?.filename?.includes(staticDirPath))) {
    return true;
  }

  return false;
};

Sentry.init({
  ignoreErrors: [/Failed to fetch/i, /The operation was aborted/i, /WebAssembly/i],
  beforeSend: event => (isInjectedCodeError(event) ? null : event),
  dsn: SENTRY_DNS_URL,
  environment: APP_ENV,
  enabled: !DOMAIN.includes('localhost'),
  release: `${APP_ENV}-${Package.version}`,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
