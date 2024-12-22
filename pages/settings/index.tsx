import { withAuth } from '@/hocs';

import { SettingsWidget } from '@/components/organisms';
import { Layout, Page } from '@/components/templates';

const Settings = () => {
  return (
    <Page title="SUMMARY.SETTINGS">
      <Layout title={'SUMMARY.SETTINGS'}>
        <SettingsWidget />
      </Layout>
    </Page>
  );
};

export default withAuth(Settings);
