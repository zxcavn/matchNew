import { MxNumberFormatter, NumberFormatter } from '@xfi/formatters';

import { CosmosCurrency } from '@/shared/types';
import type { GovParams, Proposal } from '@/store/gov';
import type { Statistic } from '@/store/stat';

export type ProposalStat = ReturnType<typeof getProposalStat>;

export const getProposalStat = ({
  proposal,
  govParams,
  stakedCoins,
}: {
  proposal?: Proposal;
  govParams?: GovParams;
  stakedCoins: Statistic['stakedCoins'];
}) => {
  const quorumGov = NumberFormatter.formatToDisplay(String(Number(govParams?.tallyParams?.quorum || 0) * 100), {
    minFractionalLength: 2,
  });
  const vetoThresholdGov = NumberFormatter.formatToDisplay(
    String(Number(govParams?.tallyParams?.vetoThreshold || 0) * 100),
    {
      minFractionalLength: 2,
    }
  );
  const thresholdGov = NumberFormatter.formatToDisplay(String(Number(govParams?.tallyParams?.threshold || 0) * 100), {
    minFractionalLength: 2,
  });

  const allTokens = Object.values(proposal?.finalTallyResult || {}).reduce(
    (prev, curr) => prev + MxNumberFormatter.toBigInt(curr),
    0n
  );

  const yesVote =
    proposal?.finalTallyResult.yes && allTokens
      ? (MxNumberFormatter.toBigInt(proposal?.finalTallyResult.yes) * 100_000n) / allTokens
      : 0n;
  const noVote =
    proposal?.finalTallyResult.no && allTokens
      ? (MxNumberFormatter.toBigInt(proposal?.finalTallyResult.no) * 100_000n) / allTokens
      : 0n;
  const noWithVetoVote =
    proposal?.finalTallyResult.noWithVeto && allTokens
      ? (MxNumberFormatter.toBigInt(proposal?.finalTallyResult.noWithVeto) * 100_000n) / allTokens
      : 0n;
  const abstainVote =
    proposal?.finalTallyResult.abstain && allTokens
      ? (MxNumberFormatter.toBigInt(proposal?.finalTallyResult.abstain) * 100_000n) / allTokens
      : 0n;

  const yesPercentage = Number(yesVote) / 1_000;
  const noPercentage = Number(noVote) / 1_000;
  const noWithVetoPercentage = Number(noWithVetoVote) / 1_000;
  const abstainPercentage = Number(abstainVote) / 1_000;

  const mpxInStake = stakedCoins.find(stakedCoin => stakedCoin.denom === CosmosCurrency.MPX)?.amount;
  const quorum = mpxInStake ? (allTokens * 100_000n) / MxNumberFormatter.toBigInt(mpxInStake) : 0;

  const quorumPercentage = Number(quorum) / 1_000;
  const vetoThresholdPercentage = noWithVetoPercentage;
  const thresholdPercentage = yesPercentage;

  const isQuorumReached = quorumPercentage >= Number(govParams?.tallyParams?.quorum || 0) * 100;
  const isVetoThresholdReached = vetoThresholdPercentage <= Number(govParams?.tallyParams?.vetoThreshold || 0) * 100;
  const isThresholdReached = thresholdPercentage >= Number(govParams?.tallyParams?.threshold || 0) * 100;

  return {
    yesPercentage,
    noPercentage,
    noWithVetoPercentage,
    abstainPercentage,
    quorumGov,
    quorumPercentage,
    vetoThresholdGov,
    vetoThresholdPercentage,
    thresholdGov,
    thresholdPercentage,
    isQuorumReached,
    isVetoThresholdReached,
    isThresholdReached,
  };
};
