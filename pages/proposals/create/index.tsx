import { withAuth } from '@/hocs';

import { CreateProposalWidget } from '@/components/organisms';
import { Layout, Page } from '@/components/templates';

const TITLE = 'SUMMARY.GOV';

const CreateProposalPage = () => {
  return (
    <Page title={TITLE}>
      <Layout title={TITLE}>
        <CreateProposalWidget />
      </Layout>
    </Page>
  );
};

export default withAuth(CreateProposalPage);
