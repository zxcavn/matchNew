import { withAuth } from '@/hocs';

import { HashCheckWidget } from '@/components/organisms';
import { Layout, Page } from '@/components/templates';

const HashCheckPage = () => {
  return (
    <Page title="SUMMARY.ADDITIONAL_MPX">
      <Layout title="SUMMARY.ADDITIONAL_MPX">
        <HashCheckWidget />
      </Layout>
    </Page>
  );
};

export default withAuth(HashCheckPage);
