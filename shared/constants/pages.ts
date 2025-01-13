import urlJoin from 'url-join';

const PAGES = {
  home: { pathname: '/' },
  cosmosWallet: {
    pathname: '/cosmos-wallet',
  },
  evmWallet: {
    pathname: '/evm-wallet',
  },
  proposals: {
    pathname: '/proposals',
    create: { pathname: '/proposals/create' },
  },
  create: { pathname: '/create' },
  signIn: { pathname: '/sign-in' },
  oldBalance: { pathname: '/old' },
  validators: { pathname: '/validators' },
  settings: { pathname: '/settings' },
  hashCheck: { pathname: '/hash-check' },
  earnXft: { pathname: '/earn-xft' },
  resources: { pathname: '/resources' },
  ecosystem: { pathname: '/ecosystem' },
  xds: {
    pathname: '/xds',
    nameDetails: function (name: string) {
      return { pathname: urlJoin(this.pathname, encodeURIComponent(name)) };
    },
    registration: {
      pathname: '/xds/registration',
      name: function (name: string) {
        return { pathname: urlJoin(this.pathname, encodeURIComponent(name)) };
      },
    },
  },
} as const;

export const isUnauthorizedPage = (pathname: string) => {
  return (<string[]>[PAGES.home.pathname, PAGES.create.pathname, PAGES.signIn.pathname]).includes(pathname);
};

export default PAGES;
