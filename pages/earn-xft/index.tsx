import { withAuth } from '@/hocs';

import EarnXftWidget from '@/components/organisms/EarnXftWidget';
import { Layout, Page } from '@/components/templates';

const EarnXftPage = () => {
  return (
    <Page title="SUMMARY.EARN_XFT">
      <Layout title="SUMMARY.EARN_XFT">
        <EarnXftWidget />
      </Layout>
    </Page>
  );
};

export default withAuth(EarnXftPage);
