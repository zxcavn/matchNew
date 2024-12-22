import { withAuth } from '@/hocs';

import { ProposalsWidget } from '@/components/organisms';
import { Layout, Page } from '@/components/templates';

const TITLE = 'SUMMARY.GOV';

const ProposalsPage = () => {
  return (
    <Page title={TITLE}>
      <Layout title={TITLE}>
        <ProposalsWidget />
      </Layout>
    </Page>
  );
};

export default withAuth(ProposalsPage);
