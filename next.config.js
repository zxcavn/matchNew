/* eslint-disable @typescript-eslint/no-var-requires */
const { withSentryConfig } = require('@sentry/nextjs');
const withBundleAnalyzer = process.env.ANALYZE === 'true' ? require('@next/bundle-analyzer')() : config => config;

const Package = require('./package.json');

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,

  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ['en', 'vi', 'id', 'es'],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'en', //TODO: change it before release or applying change lang component
    localeDetection: false,

    // This is a list of locale domains and the default locale they
    // should handle (these are only required when setting up domain routing)
    // Note: subdomains must be included in the domain value to be matched e.g. "fr.example.com".
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  rewrites: () => {
    return [
      {
        source: `${process.env.NEXT_PUBLIC_COSMOS_RPC_PROXY_URL}/:path*`,
        destination: `${process.env.NEXT_PUBLIC_COSMOS_RPC_URL}/:path*`,
      },
      {
        source: `${process.env.NEXT_PUBLIC_COSMOS_REST_PROXY_URL}/:path*`,
        destination: `${process.env.NEXT_PUBLIC_COSMOS_REST_URL}/:path*`,
      },
      {
        source: `${process.env.NEXT_PUBLIC_EVM_RPC_PROXY_URL}/:path*`,
        destination: `${process.env.NEXT_PUBLIC_EVM_RPC_URL}/:path*`,
      },
    ];
  },
  redirects: async () => {
    if (process.env.NEXT_PUBLIC_APP_ENV === 'production') {
      return ['/earn-xft', '/xds', '/resources', '/hash-check', '/ecosystem', '/proposals'].map(source => ({
        source: `${source}/:path*`,
        destination: '/cosmos-wallet',
        permanent: false,
      }));
    }

    return [];
  },
};

// Injected content via Sentry wizard below
let config = withSentryConfig(
  nextConfig,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: 'xfi',
    project: 'xficonsole-front',
    authToken: process.env.SENTRY_AUTH_TOKEN,
    release: `${process.env.NEXT_PUBLIC_APP_ENV}-${Package.version}`,
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    // tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors.
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  }
);

config = withBundleAnalyzer(config);

module.exports = config;
