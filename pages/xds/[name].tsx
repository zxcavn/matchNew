import { Stack } from '@mui/material';
import { useEffect } from 'react';

import { normalizeName } from '@/helpers';
import { withAuth } from '@/hocs';
import { useXdsNamePageParam } from '@/hooks/xds';
import useNameWrapper from '@/hooks/xds/useNameWrapper';
import usePublicResolver from '@/hooks/xds/usePublicResolver';
import { BackButton } from '@/lib/xfi.lib/components/atoms';
import { IS_DEVELOPMENT, PAGES } from '@/shared/constants';

import { XdsNameWidget } from '@/components/organisms/xds';
import { Layout, Page } from '@/components/templates';

const XdsNameDetailsPage = () => {
  useDebugXdsName();

  return (
    <Page title="SUMMARY.XDS_NAME">
      <Layout title="SUMMARY.XDS_NAME">
        <Stack gap={{ xs: '1.5rem', md: '2rem' }} padding={{ xs: '0', md: '0 1.5rem' }}>
          <BackButton href={PAGES.xds.pathname} backText={'XDS.BACK_TO_ALL_NAMES'} />
          <XdsNameWidget />
        </Stack>
      </Layout>
    </Page>
  );
};

// TODO: Delete after testing
const useDebugXdsName = () => {
  const { name: nameParam } = useXdsNamePageParam();
  const nameWrapper = useNameWrapper();
  const publicResolver = usePublicResolver();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const name = normalizeName(nameParam);

        if (!name) return;

        const [ownerAddress] = await nameWrapper.getData(name.label);
        const xdsRecord = await publicResolver.addr(name.label);

        console.warn('DEBUG xds name:', { name: name.name, ownerAddress, xdsRecord });
      } catch {
        return;
      }
    };

    if (IS_DEVELOPMENT) {
      fetchData();
    }
  }, []);
};

export default withAuth(XdsNameDetailsPage);
