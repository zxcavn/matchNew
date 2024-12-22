import { withAuth } from '@/hocs';

import { EcosystemWidget } from '@/components/organisms';
import { Layout, Page } from '@/components/templates';

const EcosystemPage = () => {
  return (
    <Page title="SUMMARY.ECOSYSTEM">
      <Layout title="SUMMARY.ECOSYSTEM">
        <EcosystemWidget />
      </Layout>
    </Page>
  );
};

export default withAuth(EcosystemPage);
