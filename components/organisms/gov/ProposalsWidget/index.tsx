import { Stack, Typography } from '@mui/material';
import { redirect } from '@xfi/helpers';
import { usePageParam } from '@xfi/hooks';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import urlJoin from 'url-join';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { Button } from '@/lib/xfi.lib/components/atoms';
import { MultiColumnsList, TableBlock } from '@/lib/xfi.lib/components/molecules';
import { useMediaQuery } from '@/lib/xfi.lib/theme';
import { PAGES } from '@/shared/constants';
import { getProposalsAsync, govSelector, Proposal } from '@/store/gov';

import { DESKTOP_COLUMNS, MOBILE_COLUMNS } from './constants';

const ProposalsWidget = () => {
  const dispatch = useAppDispatch();
  const page = usePageParam();
  const { query, replace } = useRouter();
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));

  const {
    proposals: { data: proposals, isLoading, pages },
    govParams: { data: govParams },
  } = useAppSelector(govSelector);

  useEffect(() => {
    dispatch(getProposalsAsync({ page }));
  }, [dispatch, page]);

  const desktopColumns = useMemo(() => DESKTOP_COLUMNS(govParams?.depositParams.minDeposit.amount || '0'), [govParams]);

  const onChangePage = (page: number) => {
    replace({
      query: { ...query, page },
    });
  };

  const onCreateProposalClick = () => redirect(PAGES.proposals.create.pathname);

  const onClickProposal = (row: Proposal) => redirect(urlJoin(PAGES.proposals.pathname, row.proposalId));

  const renderCreateButton = () => (
    <Button variant="primary" isFullWidth={isMobile} onClick={onCreateProposalClick}>
      <FormattedMessage id="PROPOSALS.CREATE_PROPOSAL" />
    </Button>
  );

  return (
    <TableBlock
      title={
        <Stack direction={isMobile ? 'column' : 'row'} gap={'1rem'} justifyContent={'space-between'}>
          <Typography variant="h4">
            <FormattedMessage id="PROPOSALS.ALL_PROPOSALS" />
          </Typography>
          {Boolean(proposals.length > 0) && renderCreateButton()}
        </Stack>
      }
      notFound={{
        text: 'PROPOSALS.PRESENT_YOUR_PROPOSAL',
        extraSlot: renderCreateButton(),
      }}
      isLoading={isLoading}
      hasData={Boolean(proposals.length > 0)}
    >
      <MultiColumnsList<Proposal>
        rows={proposals}
        columns={desktopColumns}
        mobileColumns={MOBILE_COLUMNS}
        pagination={{ variant: 'default', page, count: pages, onChange: onChangePage }}
        onRowClick={onClickProposal}
      />
    </TableBlock>
  );
};

export default ProposalsWidget;
