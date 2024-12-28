import { MxNumberFormatter, NumberFormatter } from '@xfi/formatters';
import { ReactElement } from 'react';

import { NumberWithSuffix } from '@/lib/xfi.lib/components/atoms';
import { CURRENCIES } from '@/lib/xfi.lib/constants';
import type { CosmosCurrency } from '@/shared/types';
import type { GovParams } from '@/store/gov';

import { formatTime } from './helpers';

export const getGovFormattedParams = (data?: GovParams): { name: string; value?: string | ReactElement }[] => {
  const maxDepositSec = data?.depositParams.maxDepositPeriod ? parseInt(data.depositParams.maxDepositPeriod, 10) : 0;
  const votingPeriodSec = data?.votingParams?.votingPeriod ? parseInt(data?.votingParams?.votingPeriod, 10) : 0;

  return [
    {
      name: 'PROPOSALS.MIN_DEPOSIT',
      value: data?.depositParams?.minDeposit.amount ? (
        <>
          <NumberWithSuffix value={MxNumberFormatter.formatUnits(data?.depositParams?.minDeposit.amount)} />{' '}
          {CURRENCIES[data?.depositParams?.minDeposit.denom as CosmosCurrency].text}
        </>
      ) : (
        '0'
      ),
    },
    {
      name: 'PROPOSALS.MAX_DEPOSIT_PERIOD',
      value: formatTime(maxDepositSec),
    },
    {
      name: 'PROPOSALS.VOTING_PERIOD',
      value: formatTime(votingPeriodSec),
    },
    {
      name: 'PROPOSALS.QUORUM',
      value: `${NumberFormatter.formatToDisplay(String(Number(data?.tallyParams?.quorum) * 100), {
        minFractionalLength: 2,
      })}%`,
    },
    {
      name: 'PROPOSALS.THRESHOLD',
      value: `${NumberFormatter.formatToDisplay(String(Number(data?.tallyParams?.threshold) * 100), {
        minFractionalLength: 2,
      })}%`,
    },
    {
      name: 'PROPOSALS.VETO_THRESHOLD',
      value: `${NumberFormatter.formatToDisplay(String(Number(data?.tallyParams?.vetoThreshold) * 100), {
        minFractionalLength: 2,
      })}%`,
    },
  ];
};
