import { Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import { ProposalStatus } from '@/crud/cosmos';
import { useAppSelector } from '@/hooks';
import { govSelector } from '@/store/gov';
import { statSelector } from '@/store/stat';

import { getVotesStat } from './constants';
import { getProposalStat } from './helpers';
import { StyledProposalStatisticsWidget } from './styles';
import ThresholdStatBlock from './ThresholdStatBlock';
import VoteStatBlock from './VoteStatBlock';

const ProposalStatisticsWidget = () => {
  const {
    proposal: { data: proposal },
    govParams: { data: govParams },
  } = useAppSelector(govSelector);
  const {
    data: { stakedCoins },
  } = useAppSelector(statSelector);

  const proposalStat = useMemo(
    () => getProposalStat({ proposal, govParams, stakedCoins }),
    [proposal, govParams, stakedCoins]
  );

  const { isQuorumReached, isThresholdReached, isVetoThresholdReached } = proposalStat;

  const willProposalPass = isQuorumReached && isThresholdReached && isVetoThresholdReached;

  const votesStat = useMemo(() => getVotesStat({ proposal, proposalStat }), [proposal, proposalStat]);

  const isVotingPeriod = proposal?.status === ProposalStatus.VOTING_PERIOD;

  const maxVoteOption = useMemo(() => {
    if (!votesStat) {
      return null;
    }

    const allValuesAreZero = votesStat.every(({ percent }) => percent === 0);

    if (allValuesAreZero) {
      return null;
    }

    return votesStat.reduce((prev, curr) => (curr.percent > prev.percent ? curr : prev)).title;
  }, [votesStat]);

  const thresholdBlocks = useMemo(() => {
    const blocks = [];

    if (!isQuorumReached) {
      blocks.push({
        title: 'PROPOSALS.QUORUM_NOT_REACHED',
        currentPercent: proposalStat.quorumPercentage,
        thresholdPercent: proposalStat.quorumGov,
      });
    }

    if (!isVetoThresholdReached) {
      blocks.push({
        title: 'PROPOSALS.VETO_THRESHOLD_NOT_REACHED',
        currentPercent: proposalStat.vetoThresholdPercentage,
        thresholdPercent: proposalStat.vetoThresholdGov,
      });
    }

    if (!isThresholdReached) {
      blocks.push({
        title: 'PROPOSALS.THRESHOLD_NOT_REACHED',
        currentPercent: proposalStat.thresholdPercentage,
        thresholdPercent: proposalStat.thresholdGov,
      });
    }

    return blocks;
  }, [isQuorumReached, isVetoThresholdReached, isThresholdReached, proposalStat]);

  return (
    <StyledProposalStatisticsWidget>
      <Stack className="statBlocksWrapper">
        {isVotingPeriod && (
          <Stack className="statBlock">
            <Typography variant="body2" color="neutrals.secondaryText">
              <FormattedMessage id={'PROPOSALS.EXPECTED_ROPOSAL_RESULT'} />
            </Typography>
            <Typography
              variant="subtitle2"
              textAlign={{ lg: 'right' }}
              sx={{
                color: willProposalPass ? 'alerts.success' : 'alerts.error',
              }}
            >
              <FormattedMessage id={willProposalPass ? 'PROPOSALS.WILL_BE_PASSED' : 'PROPOSALS.WILL_BE_REJECTED'} />
            </Typography>
          </Stack>
        )}
        <Stack className="statBlock">
          <Typography variant="body2" color="neutrals.secondaryText">
            <FormattedMessage id={'PROPOSALS.TURNOUT'} /> / <FormattedMessage id={'PROPOSALS.QUORUM'} />
          </Typography>
          <Typography variant="subtitle2" textAlign={{ lg: 'right' }}>
            {proposalStat.quorumPercentage}% / {proposalStat.quorumGov}%
          </Typography>
        </Stack>
      </Stack>
      {thresholdBlocks.length > 0 && (
        <Stack
          className="thresholdBlocksWrapper"
          justifyContent={thresholdBlocks.length > 1 ? 'space-between' : 'center'}
        >
          {thresholdBlocks.map((item, index) => (
            <>
              {index !== 0 && <div className="thresholdsDivider" />}
              <ThresholdStatBlock
                key={index}
                title={item.title}
                currentPercent={item.currentPercent}
                thresholdPercent={item.thresholdPercent}
              />
            </>
          ))}
        </Stack>
      )}
      <Stack className="votesWrapper">
        {votesStat.map(item => (
          <VoteStatBlock key={item.title} data={item} isMaxVote={maxVoteOption === item.title} />
        ))}
      </Stack>
    </StyledProposalStatisticsWidget>
  );
};

export default ProposalStatisticsWidget;
