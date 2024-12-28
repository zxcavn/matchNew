import { Theme, useTheme } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { XdsNameAvailabilityStatus } from '@/hooks/xds';
import { Badge } from '@/lib/xfi.lib/components/atoms';

type Props = {
  status: XdsNameAvailabilityStatus;
};

const XdsNameStatusBadge = ({ status }: Props) => {
  const theme = useTheme();
  const { text, background, color } = getBadgeConfig(status, theme);

  return (
    <Badge sx={{ textTransform: 'lowercase' }} backgroundColor={background} color={color}>
      <FormattedMessage id={text} />
    </Badge>
  );
};

type BadgeConfig = {
  text: string;
  background: string;
  color: string;
};

const getBadgeConfig = (status: XdsNameAvailabilityStatus, theme: Theme): BadgeConfig => {
  return {
    [XdsNameAvailabilityStatus.INVALID]: {
      text: 'SUMMARY.INVALID',
      ...theme.palette.badges.fail,
    },
    [XdsNameAvailabilityStatus.AVAILABLE]: {
      text: 'SUMMARY.AVAILABLE',
      ...theme.palette.badges.sendIn,
    },
    [XdsNameAvailabilityStatus.UNAVAILABLE]: {
      text: 'SUMMARY.REGISTERED',
      ...theme.palette.badges.bond,
    },
  }[status];
};

export default XdsNameStatusBadge;
