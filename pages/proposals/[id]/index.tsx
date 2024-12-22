import { Stack, styled, Typography } from '@mui/material';
import { useQueryParam } from '@xfi/hooks';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import urlJoin from 'url-join';

import { ProposalStatus } from '@/crud/cosmos';
import { withAuth } from '@/hocs';
import { useAppDispatch, useAppSelector, useStatistics } from '@/hooks';
import { BackButton, Loader, Tabs } from '@/lib/xfi.lib/components/atoms';
import { useMediaQuery } from '@/lib/xfi.lib/theme';
import { PAGES } from '@/shared/constants';
import { getProposalDetailsAsync, govSelector } from '@/store/gov';

import {
  GovParamsWidget,
  ProposalDepositWidget,
  ProposalDetailsHeading,
  ProposalDetailsWidget,
  ProposalParamsWidget,
  ProposalResultsWidget,
  ProposalStatisticsWidget,
  ProposalVoteWidget,
} from '@/components/organisms';
import { Layout, Page } from '@/components/templates';

const TITLE = 'SUMMARY.GOV';

const ProposalDetailsPage = () => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('lg'));
  const proposalId = useQueryParam('id');
  const dispatch = useAppDispatch();
  const {
    proposals: { page: proposalsPage },
    proposal: { data: proposal, isLoading },
  } = useAppSelector(govSelector);
  const [tab, setTab] = useState<TabType>(PROPOSAL_TABS[0].value);

  const isShowStatistics = useMemo(
    () =>
      proposal?.status
        ? [
            ProposalStatus.PASSED,
            ProposalStatus.REJECTED,
            ProposalStatus.FAILED,
            ProposalStatus.VOTING_PERIOD,
          ].includes(proposal.status)
        : false,
    [proposal]
  );

  useStatistics();

  useEffect(() => {
    dispatch(getProposalDetailsAsync({ proposalId }));
  }, [proposalId]);

  const proposalStatusWidget = useMemo(() => {
    const isProposalFinished = !isLoading;

    if (isProposalFinished) {
      const isDepositPeriod = proposal?.status === ProposalStatus.DEPOSIT_PERIOD;
      const isVotingPeriod = proposal?.status === ProposalStatus.VOTING_PERIOD;

      if (isDepositPeriod) return <ProposalDepositWidget proposal={proposal} />;

      if (isVotingPeriod) return <ProposalVoteWidget proposal={proposal} />;

      return <ProposalResultsWidget finalTallyResult={proposal?.finalTallyResult} />;
    }
  }, [proposal, isLoading]);

  return (
    <Page title={TITLE}>
      <Layout title={TITLE}>
        <Stack mb={{ xs: '1.5rem', md: '2rem' }}>
          <BackButton
            backText="PROPOSALS.BACK_TO_ALL_PROPOSALS"
            href={
              proposalsPage !== 1
                ? urlJoin(PAGES.proposals.pathname, `?page=${proposalsPage}`)
                : PAGES.proposals.pathname
            }
          />
        </Stack>

        {isLoading ? (
          <Loader />
        ) : (
          <StyledContentWrapper>
            <Stack width={{ lg: '60%', md: '100%' }}>
              <ProposalDetailsHeading />
              {isMobile && (
                <Stack mb={'2rem'} width={'100%'}>
                  {proposalStatusWidget}
                </Stack>
              )}
              <Stack>
                <Stack mb={'1.5rem'} width={{ sm: '100%', md: '14.5rem' }}>
                  <ProposalTabs tab={tab} setTab={setTab} />
                </Stack>
                {tab === PROPOSAL_TABS[0].value && (
                  <Stack gap={'1.5rem'}>
                    {isShowStatistics && <ProposalStatisticsWidget />}
                    <ProposalDetailsWidget />
                  </Stack>
                )}
                {tab === PROPOSAL_TABS[1].value && (
                  <>
                    <Stack mb={'1.5rem'}>
                      <ProposalParamsWidget />
                    </Stack>
                    <Stack gap={'1rem'}>
                      <Typography variant="subtitle1">
                        <FormattedMessage id={'PROPOSALS.GOVERNANCE_PARAMETERS'} />
                      </Typography>
                      <GovParamsWidget />
                    </Stack>
                  </>
                )}
              </Stack>
            </Stack>
            {!isMobile && (
              <Stack maxWidth={'28.875rem'} width={'35%'}>
                {proposalStatusWidget}
              </Stack>
            )}
          </StyledContentWrapper>
        )}
      </Layout>
    </Page>
  );
};

type ProposalTabsProps = {
  tab: TabType;
  setTab: Dispatch<SetStateAction<TabType>>;
};

enum TabType {
  DETAILS = 'Details',
  PARAMETERS = 'Parameters',
}

type ProposalTabs = Array<{
  value: TabType;
  /** @type {FormattedMessageId} */
  label: string;
}>;

const PROPOSAL_TABS: ProposalTabs = [
  { value: TabType.DETAILS, label: 'SUMMARY.DETAILS' },
  { value: TabType.PARAMETERS, label: 'SUMMARY.PARAMETERS' },
];

const ProposalTabs = ({ tab, setTab }: ProposalTabsProps) => {
  return <Tabs tabs={PROPOSAL_TABS} value={tab} setTab={setTab} sx={{ width: '100%' }} />;
};

export default withAuth(ProposalDetailsPage);

export const StyledContentWrapper = styled(Stack, { name: 'StyledContentWrapper' })(({ theme }) => ({
  flexDirection: 'row',
  gap: '3rem',

  [theme.breakpoints.down('lg')]: {
    margin: '0 auto',
    flexDirection: 'column',
    maxWidth: '42.125rem',
  },
}));
