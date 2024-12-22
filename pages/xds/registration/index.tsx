import { styled } from '@mui/material';

import { withAuth } from '@/hocs';

import { SearchXdsNameBlock } from '@/components/molecules';
import { SearchXdsName } from '@/components/organisms/xds';
import { Layout, Page, XdsNameRegistrationLayout } from '@/components/templates';

const RegistrationPage = () => {
  return (
    <Page title="SUMMARY.XDS_NAMES">
      <Layout title="SUMMARY.XDS_NAMES">
        <XdsNameRegistrationLayout>
          <StyledSearchXdsNameBlock>
            <SearchXdsName />
          </StyledSearchXdsNameBlock>
        </XdsNameRegistrationLayout>
      </Layout>
    </Page>
  );
};

const StyledSearchXdsNameBlock = styled(SearchXdsNameBlock, { name: 'StyledSearchXdsNameBlock' })(({ theme }) => ({
  margin: '14.625rem 0 13rem',

  [theme.breakpoints.down('md')]: {
    margin: '2.938rem 0 2.5rem',
  },
}));

export default withAuth(RegistrationPage);
