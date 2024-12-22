import { Stack } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { Virtuoso } from 'react-virtuoso';

import { Button, Loader } from '@/lib/xfi.lib/components/atoms';
import { GovParams, Proposal, ProposalDeposit } from '@/store/gov';

import { ProposalProgressBar } from '@/components/molecules';

import DataRow from '../DataRow';
import { StyledContent, StyledDepositsContainer } from './styles';

type Props = {
  proposal?: Proposal;
  govParams?: GovParams;
  deposits: ProposalDeposit[];
  showData?: boolean;
  isLoadingContent?: boolean;
  isLoadingDepositBtn?: boolean;
  onEndReached: () => void;
  onOpenDepositForm: () => void;
};

const Content = ({
  proposal,
  govParams,
  deposits,
  showData = true,
  isLoadingContent,
  isLoadingDepositBtn,
  onEndReached,
  onOpenDepositForm,
}: Props) => (
  <StyledContent>
    {isLoadingContent && <Loader />}
    {proposal && (
      <Stack className="progressWrapper">
        <ProposalProgressBar data={proposal} minDepositAmount={govParams?.depositParams.minDeposit.amount || '0'} />
      </Stack>
    )}
    {showData && (
      <Stack className="rowsWrapper">
        <Virtuoso
          className={'virtuosoContainer'}
          data={deposits}
          components={{
            List: StyledDepositsContainer,
          }}
          totalCount={deposits.length}
          firstItemIndex={0}
          initialTopMostItemIndex={0}
          endReached={onEndReached}
          itemContent={(_, item) => <DataRow key={item.depositor} item={item} />}
        />
      </Stack>
    )}
    <Button
      className="button"
      size="large"
      isFullWidth={true}
      isLoading={isLoadingDepositBtn}
      onClick={onOpenDepositForm}
    >
      <FormattedMessage id={'PROPOSALS.DEPOSIT'} />
    </Button>
  </StyledContent>
);

export default Content;
