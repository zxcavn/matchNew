import { Stack, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { NONE_VALUE } from '../../../../constants';
import type { ProposalStatusType } from '../../../../types';
import { PROPOSAL_STATUS_CONFIG } from './constants';

type Props = {
  status: ProposalStatusType;
  isIconFirst?: boolean;
};

const ProposalStatusBadge = ({ status, isIconFirst = false }: Props) => {
  return (
    <Stack direction={'row'} gap={'0.25rem'} alignItems={'center'}>
      {isIconFirst && PROPOSAL_STATUS_CONFIG[status]?.icon}
      <Typography variant="subtitle2" color={PROPOSAL_STATUS_CONFIG[status]?.color}>
        {PROPOSAL_STATUS_CONFIG[status]?.title ? (
          <FormattedMessage id={PROPOSAL_STATUS_CONFIG[status].title} />
        ) : (
          NONE_VALUE
        )}
      </Typography>
      {!isIconFirst && PROPOSAL_STATUS_CONFIG[status]?.icon}
    </Stack>
  );
};

export default ProposalStatusBadge;
