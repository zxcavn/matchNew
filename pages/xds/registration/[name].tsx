import { styled } from '@mui/material';
import { compose } from 'redux';

import withAuth from '@/hocs/withAuth';
import { withInitRegistration, withRegistrationAvailableName } from '@/hocs/xds';
import { useAppSelector } from '@/hooks';
import { useXdsNamePageParam } from '@/hooks/xds';
import type { PropsWithLoading } from '@/shared/types';
import {
  isShowCompleteRegistrationStepSelector,
  isShowPricingStepSelector,
  isShowSearchNameSelector,
  isShowTimerStepSelector,
} from '@/store/xds';

import { SearchXdsNameBlock } from '@/components/molecules';
import {
  CompleteRegistrationWidget,
  RegistrationPricingWidget,
  RegistrationTimerWidget,
  SearchXdsName,
} from '@/components/organisms/xds';
import { Layout, Page, XdsNameRegistrationLayout } from '@/components/templates';

const NameRegistrationPage = ({ isLoading }: PropsWithLoading) => {
  const { name } = useXdsNamePageParam();
  const isShowSearchName = useAppSelector(isShowSearchNameSelector);
  const isShowPricingWidget = useAppSelector(isShowPricingStepSelector);
  const isShowTimerWidget = useAppSelector(isShowTimerStepSelector);
  const isShowCompleteRegistrationWidget = useAppSelector(isShowCompleteRegistrationStepSelector);

  return (
    <Page title="SUMMARY.XDS_NAMES">
      <Layout title="SUMMARY.XDS_NAMES">
        <XdsNameRegistrationLayout isLoading={isLoading}>
          {isShowSearchName && (
            <StyledSearchXdsNameBlock>
              <SearchXdsName initialValue={name} />
            </StyledSearchXdsNameBlock>
          )}
          {isShowPricingWidget && <RegistrationPricingWidget />}
          {isShowTimerWidget && <StyledRegistrationTimerWidget />}
          {isShowCompleteRegistrationWidget && <StyledCompleteRegistrationWidget />}
        </XdsNameRegistrationLayout>
      </Layout>
    </Page>
  );
};

const StyledSearchXdsNameBlock = styled(SearchXdsNameBlock, { name: 'StyledSearchXdsNameBlock' })(({ theme }) => ({
  margin: '14.625rem 0 5.313rem',

  [theme.breakpoints.down('md')]: {
    margin: '2.938rem 0 2.5rem',
  },
}));

const StyledRegistrationTimerWidget = styled(RegistrationTimerWidget, { name: 'StyledRegistrationTimerWidget' })(
  ({ theme }) => ({
    marginTop: '3.5rem',

    [theme.breakpoints.down('md')]: {
      marginTop: '1.5rem',
    },
  })
);

const StyledCompleteRegistrationWidget = styled(CompleteRegistrationWidget, {
  name: 'StyledCompleteRegistrationWidget',
})(({ theme }) => ({
  marginTop: '3.5rem',

  [theme.breakpoints.down('md')]: {
    marginTop: '1.5rem',
  },
}));

export default compose(withAuth, withRegistrationAvailableName, withInitRegistration)(NameRegistrationPage);
