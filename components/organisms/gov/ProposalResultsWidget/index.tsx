import { Stack, Typography } from '@mui/material';
import { MxNumberFormatter } from '@xfi/formatters';
import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import { NumberWithSuffix } from '@/lib/xfi.lib/components/atoms';
import { CURRENCIES } from '@/lib/xfi.lib/constants';
import { theme } from '@/lib/xfi.lib/theme';
import { Proposal } from '@/store/gov';

import { StyledProposalResultsWidget } from './styles';

type Props = {
  finalTallyResult?: Proposal['finalTallyResult'];
};

export const VOTE_CONFIG: Record<keyof Proposal['finalTallyResult'], { label: string; color: string }> = {
  yes: {
    label: 'PROPOSALS.YES',
    color: theme.palette.alerts.success,
  },
  no: {
    label: 'PROPOSALS.NO',
    color: theme.palette.alerts.error,
  },
  abstain: {
    label: 'PROPOSALS.ABSTAIN',
    color: theme.palette.alerts.error,
  },
  noWithVeto: {
    label: 'PROPOSALS.NO_WITH_VETO',
    color: theme.palette.alerts.error,
  },
};

const ProposalResultsWidget = ({ finalTallyResult }: Props) => {
  const voteKeys = useMemo(() => Object.keys(VOTE_CONFIG) as (keyof Proposal['finalTallyResult'])[], []);

  const maxVoteOption = useMemo(() => {
    if (!finalTallyResult) {
      return null;
    }

    const formattedTallyValues = Object.entries(finalTallyResult).map(([key, value]) => ({
      key,
      value: MxNumberFormatter.toBigInt(value),
    }));

    const allValuesAreZero = formattedTallyValues.every(({ value }) => value === 0n);

    if (allValuesAreZero) {
      return null;
    }

    return formattedTallyValues.reduce((prev, curr) => (curr.value > prev.value ? curr : prev)).key;
  }, [finalTallyResult]);

  const getTextStyles = (vote: keyof Proposal['finalTallyResult']) =>
    vote === maxVoteOption
      ? {
          color: VOTE_CONFIG[vote].color,
        }
      : undefined;

  const getContainerStyles = (vote: keyof Proposal['finalTallyResult']) =>
    vote === maxVoteOption
      ? {
          border: '1px solid',
          borderColor: VOTE_CONFIG[vote].color,
        }
      : undefined;

  return (
    <StyledProposalResultsWidget variant="transparent" width={'100%'}>
      <Stack gap={'1.5rem'}>
        <Typography variant="h4">
          <FormattedMessage id={'PROPOSALS.PROPOSAL_VOTES'} />
        </Typography>
        <Stack gap={'0.75rem'}>
          {voteKeys.map(vote => (
            <Stack key={vote} className={'option'} sx={getContainerStyles(vote)}>
              <Typography variant="subtitle2" textTransform={'uppercase'} sx={getTextStyles(vote)}>
                <FormattedMessage id={VOTE_CONFIG[vote].label} />
              </Typography>
              <Typography variant="subtitle2" sx={getTextStyles(vote)}>
                {finalTallyResult ? (
                  <>
                    <NumberWithSuffix value={MxNumberFormatter.formatUnits(finalTallyResult[vote])} />{' '}
                    {CURRENCIES.mpx.text}
                  </>
                ) : (
                  0
                )}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </StyledProposalResultsWidget>
  );
};

export default ProposalResultsWidget;
