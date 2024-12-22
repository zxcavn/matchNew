import { Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { StyledThresholdStatBlock } from './styles';

type Props = {
  title: string;
  currentPercent: number;
  thresholdPercent: string;
};

const ThresholdStatBlock = ({ title, currentPercent, thresholdPercent }: Props) => {
  return (
    <StyledThresholdStatBlock>
      <Typography variant="body2">
        <FormattedMessage id={title} />
      </Typography>
      <Typography variant="body2">
        {currentPercent}% / {thresholdPercent}%
      </Typography>
    </StyledThresholdStatBlock>
  );
};

export default ThresholdStatBlock;
