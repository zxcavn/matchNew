import { Typography } from '@mui/material';
import { MxNumberFormatter } from '@xfi/formatters';
import { ReactElement } from 'react';

import { NumberWithSuffix } from '@/lib/xfi.lib/components/atoms';
import { CURRENCIES } from '@/lib/xfi.lib/constants';
import { NONE_VALUE } from '@/shared/constants';
import { CosmosCurrency } from '@/shared/types';
import { Proposal } from '@/store/gov';

import { StyledDateTime } from './styles';

export const getVotingParams = (
  data?: Proposal
): {
  title: string;
  value: ReactElement;
}[] => {
  return [
    {
      title: 'PROPOSALS.VOTING_START',
      value: (
        <>
          {data?.votingStartTime ? (
            <StyledDateTime date={data?.votingStartTime} dateFormat="MMMM d, yyyy" timeFormat="h:mm a" />
          ) : (
            NONE_VALUE
          )}
        </>
      ),
    },
    {
      title: 'PROPOSALS.VOTING_END',
      value: (
        <>
          {data?.votingEndTime ? (
            <StyledDateTime date={data?.votingEndTime} dateFormat="MMMM d, yyyy" timeFormat="h:mm a" />
          ) : (
            NONE_VALUE
          )}
        </>
      ),
    },
  ];
};

export const getOtherParams = (
  data?: Proposal
): {
  title: string;
  value: ReactElement;
}[] => {
  return [
    {
      title: 'PROPOSALS.DEPOSIT_END',
      value: (
        <>
          {data?.depositEndTime ? (
            <StyledDateTime date={data?.depositEndTime} dateFormat="MMMM d, yyyy" timeFormat="h:mm a" />
          ) : (
            NONE_VALUE
          )}
        </>
      ),
    },
    {
      title: 'PROPOSALS.TOTAL_DEPOSIT',
      value: (
        <>
          {data?.totalDeposit ? (
            <Typography variant="subtitle2">
              <NumberWithSuffix
                value={MxNumberFormatter.formatUnits(data.totalDeposit.amount)}
                maxFractionDigits={CURRENCIES.mpx.formatDecimals}
              />{' '}
              {CURRENCIES[data.totalDeposit.denom as CosmosCurrency].text}
            </Typography>
          ) : (
            NONE_VALUE
          )}
        </>
      ),
    },
    {
      title: 'PROPOSALS.SUBMIT_TIME',
      value: (
        <>
          {data?.submitTime ? (
            <StyledDateTime date={data?.submitTime} dateFormat="MMMM d, yyyy" timeFormat="h:mm a" />
          ) : (
            NONE_VALUE
          )}
        </>
      ),
    },
  ];
};
