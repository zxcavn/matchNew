import { withAuth } from '@/hocs';

import { XdsCardsWidget } from '@/components/organisms';
import { Layout, Page } from '@/components/templates';

const XdsPage = () => {
  return (
    <Page title="SUMMARY.XDS_NAMES">
      <Layout title="SUMMARY.XDS_NAMES">
        <XdsCardsWidget />
      </Layout>
    </Page>
  );
};

export default withAuth(XdsPage);
