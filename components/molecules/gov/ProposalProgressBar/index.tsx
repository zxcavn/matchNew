import { Typography } from '@mui/material';
import { MxNumberFormatter } from '@xfi/formatters';
import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import { ProposalStatus } from '@/crud/cosmos';
import { NumberWithSuffix, ProgressLine, SegmentedProgressLine } from '@/lib/xfi.lib/components/atoms';
import { CURRENCIES } from '@/lib/xfi.lib/constants';
import { Proposal } from '@/store/gov';

import { getSegments } from './constants';

type Props = {
  data: Proposal;
  minDepositAmount: string;
};

const ProposalProgressBar = ({ data, minDepositAmount }: Props) => {
  const segments = useMemo(() => getSegments(data), [data]);

  const totalDeposit = useMemo(
    () => MxNumberFormatter.formatUnits(data.totalDeposit.amount),
    [data.totalDeposit.amount]
  );

  const minDeposit = useMemo(() => MxNumberFormatter.formatUnits(minDepositAmount), [minDepositAmount]);

  const votesFor = useMemo(() => MxNumberFormatter.formatUnits(data.finalTallyResult.yes), [data.finalTallyResult.yes]);

  const votesAgainst = useMemo(
    () =>
      MxNumberFormatter.formatUnits(
        MxNumberFormatter.toBigInt(data.finalTallyResult.no) +
          MxNumberFormatter.toBigInt(data.finalTallyResult.noWithVeto)
      ),
    [data.finalTallyResult.no, data.finalTallyResult.noWithVeto]
  );

  const renderStat = () => {
    if (data?.status === ProposalStatus.DEPOSIT_PERIOD) {
      return (
        <Typography variant="subtitle2">
          <NumberWithSuffix value={totalDeposit} /> / <NumberWithSuffix value={minDeposit} /> {CURRENCIES.mpx.text}
        </Typography>
      );
    }

    if (data?.status === ProposalStatus.UNSPECIFIED)
      return (
        <Typography variant="subtitle2" color="neutrals.secondaryText">
          <FormattedMessage id={'LIB.PROPOSALS.STATUS.UNSPECIFIED'} />
        </Typography>
      );

    return (
      <Typography variant="subtitle2">
        <NumberWithSuffix value={votesFor} /> <FormattedMessage id={'PROPOSALS.FOR'} /> -{' '}
        <NumberWithSuffix value={votesAgainst} /> <FormattedMessage id={'PROPOSALS.AGAINST'} />
      </Typography>
    );
  };

  const renderProgress = () => {
    if (data?.status === ProposalStatus.DEPOSIT_PERIOD)
      return <ProgressLine variant="border" currentValue={Number(totalDeposit)} totalValue={Number(minDeposit)} />;

    if (data?.status === ProposalStatus.VOTING_PERIOD) return <SegmentedProgressLine segments={segments} />;

    return <SegmentedProgressLine segments={segments} />;
  };

  return (
    <>
      {renderStat()}
      {renderProgress()}
    </>
  );
};

export default ProposalProgressBar;
