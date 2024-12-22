import { Stack } from '@mui/material';

import { withAuth } from '@/hocs';
import { DOCUMENT_LINKS, SOCIAL_LINKS } from '@/shared/constants';

import { ResourcesGetMpxXfi, ResourcesImageLinks, ResourcesTitle } from '@/components/molecules';
import { Layout, Page } from '@/components/templates';

const ResourcePage = () => {
  const SECTIONS_GAP = { xs: '1.5rem', md: '4rem' };

  return (
    <Page title="SUMMARY.RESOURCES">
      <Layout title="SUMMARY.RESOURCES">
        <Stack gap={SECTIONS_GAP}>
          <Stack component={'section'} gap={SECTIONS_GAP}>
            <ResourcesTitle position={'.01'} title={'RESOURCES.INFORMATION.TITLE'} />
            <ResourcesImageLinks startImage={DOCUMENT_LINKS[0]} links={DOCUMENT_LINKS} isMirrored />
          </Stack>
          <ResourcesGetMpxXfi />
          <Stack component={'section'} gap={SECTIONS_GAP}>
            <ResourcesTitle position={'.04'} title={'RESOURCES.SOCIAL_MEDIA.TITLE'} />
            <ResourcesImageLinks startImage={SOCIAL_LINKS[0]} links={SOCIAL_LINKS} />
          </Stack>
        </Stack>
      </Layout>
    </Page>
  );
};

export default withAuth(ResourcePage);
