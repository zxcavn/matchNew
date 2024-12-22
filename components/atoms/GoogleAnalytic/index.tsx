import { APP_ENV } from '@/shared/constants';

const GTM_ID_CONFIG: Record<string, string> = {
  staging: 'G-LJ7WYGWW5G',
  production: 'G-N2569P1T6R',
};

const GoogleAnalytic = () => {
  const id = GTM_ID_CONFIG[APP_ENV] || '';

  if (id) {
    return (
      <>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${id}`} />

        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}');
        `,
          }}
        />
      </>
    );
  }

  return null;
};

export default GoogleAnalytic;
