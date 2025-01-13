import { useMemo } from 'react';

import { ProposalStatusType } from '../../../../types';
import { StyledDateTime } from './styles';

type Props = {
  status: ProposalStatusType;
  depositEndTime: string;
  votingEndTime?: string;
};

const ProposalEndTime = ({ status, depositEndTime, votingEndTime }: Props) => {
  const getDateTime = useMemo(() => {
    if (status === ProposalStatusType.DEPOSIT_PERIOD) return depositEndTime;

    return votingEndTime;
  }, [status, depositEndTime, votingEndTime]);

  if (getDateTime) return <StyledDateTime date={getDateTime} dateFormat="MMMM d, yyyy" timeFormat="h:mm a" />;
};

export default ProposalEndTime;
