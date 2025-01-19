import { Page } from '@/components/templates';
import { Loader } from '@/lib/xfi.lib/components/atoms';
import { LocalStorageService } from '@/services';
import { PAGES } from '@/shared/constants';
import { redirectWithCompletion } from '@xfi/helpers';
import { useEffectOnce } from '@xfi/hooks';
import { useRouter } from 'next/router';
import { PropsWithChildren, useState } from 'react';


const InitAppWrapper = ({ children }: PropsWithChildren) => {
  const { asPath } = useRouter();
  const [loading, setLoading] = useState(true);

  const hideLoader = () => setLoading(false);

  const onSuccess = async () => {
    if (asPath === PAGES.home.pathname) {
      await redirectWithCompletion(PAGES.cosmosWallet);
    }

    hideLoader();
  };

  const onError = async (error: unknown) => {
    console.error(error);

    if (asPath !== PAGES.home.pathname) {
      await redirectWithCompletion(PAGES.home).catch(console.error);
    }

    hideLoader();
  };


  useEffectOnce(() => {
    const mnemonic = LocalStorageService.getMnemonic();
    const lastConnectionType = LocalStorageService;

    onError('Unauthorized');
  });

  return <Page>{loading ? <Loader variant="page" /> : children}</Page>;
};

export default InitAppWrapper;
