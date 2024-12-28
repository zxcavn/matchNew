import { Stack, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { CURRENCIES } from '@/lib/xfi.lib/constants';

import type { VoteStat } from '../constants';
import { StyledVoteBlock } from './styles';

type Props = {
  data: VoteStat;
  isMaxVote: boolean;
};

const VoteStatBlock = ({ data, isMaxVote }: Props) => {
  const getTextStyles = isMaxVote ? { color: data.color } : undefined;

  const getContainerStyles = isMaxVote
    ? {
        border: '1px solid',
        borderColor: data.color,
      }
    : undefined;

  return (
    <StyledVoteBlock sx={getContainerStyles}>
      <Stack className="votePercent">
        <Typography variant="subtitle2" sx={getTextStyles}>
          <FormattedMessage id={data.title} />
        </Typography>
        <Typography variant="subtitle2" sx={getTextStyles}>
          {data.percent}%
        </Typography>
      </Stack>
      <Typography variant="caption" color="neutrals.secondaryText">
        {data.tokens} {CURRENCIES.mpx.text}
      </Typography>
    </StyledVoteBlock>
  );
};

export default VoteStatBlock;
