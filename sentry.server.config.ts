// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

import Package from './package.json';
import { APP_ENV, DOMAIN, SENTRY_DNS_URL } from './shared/constants';

Sentry.init({
  dsn: SENTRY_DNS_URL,
  environment: APP_ENV,
  enabled: !DOMAIN.includes('localhost'),
  release: `${APP_ENV}-${Package.version}`,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: process.env.NODE_ENV === 'development',
});
