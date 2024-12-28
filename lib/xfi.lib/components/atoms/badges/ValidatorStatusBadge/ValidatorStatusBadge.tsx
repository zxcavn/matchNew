import { Theme, useTheme } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { Badge } from '../Badge';

export type ValidatorBadgeVariant = 'active' | 'ready' | 'jailed';

export const TEST_ID = 'validator-status-badge-test-id';

export type Props = {
  status: ValidatorBadgeVariant;
};

const ValidatorStatusBadge = ({ status }: Props) => {
  const theme = useTheme();

  const badgeColors = generateBadgeColors(status, theme);

  return (
    <Badge data-testid={TEST_ID} {...badgeColors}>
      <FormattedMessage id={`LIB.VALIDATOR_STATUS.${status.toUpperCase()}`} />
    </Badge>
  );
};

const generateBadgeColors = (type: ValidatorBadgeVariant, theme: Theme) => {
  const badgeColors: Record<ValidatorBadgeVariant, { color: string; backgroundColor: string }> = {
    active: {
      color: theme.palette.badges.active.color,
      backgroundColor: theme.palette.badges.active.background,
    },
    ready: {
      color: theme.palette.badges.ready.color,
      backgroundColor: theme.palette.badges.ready.background,
    },
    jailed: {
      color: theme.palette.badges.jailed.color,
      backgroundColor: theme.palette.badges.jailed.background,
    },
  };

  return badgeColors[type] || { color: 'inherit', backgroundColor: 'inherit' };
};

export default ValidatorStatusBadge;
