import { SxProps, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

type Props = {
  /** @type {FormattedMessageId} */
  text: string;
  className?: string;
  sx?: SxProps;
};

const Description = ({ text, className, sx = {} }: Props) => {
  return (
    <Typography className={className} sx={sx} variant="body1" color="neutrals.secondaryText">
      <FormattedMessage id={text} />
    </Typography>
  );
};

export default Description;
