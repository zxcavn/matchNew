import { Theme, useTheme } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { MissionValidatorType, OldMissionValidatorType } from '@/crud/xfiPad';
import { Badge } from '@/lib/xfi.lib/components/atoms';

export type Props = {
  type?: MissionValidatorType | OldMissionValidatorType;
  name?: string;
};

const EventBadge = ({ type, ...props }: Props) => {
  const theme = useTheme();

  const { color, backgroundColor, text } = generateBadgeContent(theme, type);

  return (
    <Badge color={color} backgroundColor={backgroundColor} {...props}>
      {<FormattedMessage id={text} />}
    </Badge>
  );
};

type BadgeConfig = {
  color: string;
  backgroundColor: string;
  text: string;
};

const generateBadgeContent = (theme: Theme, type?: MissionValidatorType | OldMissionValidatorType): BadgeConfig => {
  const defaultConfig: BadgeConfig = {
    color: 'inherit',
    backgroundColor: 'inherit',
    text: 'LIB.OPERATIONS.OTHER',
  };

  if (!type) return defaultConfig;

  const badgeVariants: Record<MissionValidatorType | OldMissionValidatorType, BadgeConfig> = {
    // MPX
    [MissionValidatorType.SEND_MPX_COSMOS]: {
      color: theme.palette.badges.send.color,
      backgroundColor: theme.palette.badges.send.background,
      text: 'MISSIONS.SEND_MPX_COSMOS.BADGE',
    },
    [MissionValidatorType.SEND_MPX_DIFFERENT_ADDRESS]: {
      color: theme.palette.badges.multisend.color,
      backgroundColor: theme.palette.badges.multisend.background,
      text: 'MISSIONS.SEND_MPX_DIFFERENT_ADDRESS.BADGE',
    },
    // XFI
    [MissionValidatorType.SEND_XFI_COSMOS]: {
      color: theme.palette.badges.send.color,
      backgroundColor: theme.palette.badges.send.background,
      text: 'MISSIONS.SEND_XFI_COSMOS.BADGE',
    },
    [MissionValidatorType.SEND_XFI_EVM]: {
      color: theme.palette.badges.evm.color,
      backgroundColor: theme.palette.badges.evm.background,
      text: 'MISSIONS.SEND_XFI_EVM.BADGE',
    },
    [MissionValidatorType.SEND_XFI_DIFFERENT_ADDRESS]: {
      color: theme.palette.badges.multisend.color,
      backgroundColor: theme.palette.badges.multisend.background,
      text: 'MISSIONS.SEND_XFI_DIFFERENT_ADDRESS.BADGE',
    },
    // Staking
    [MissionValidatorType.DELEGATE_MPX_TO_VALIDATOR]: {
      color: theme.palette.badges.bond.color,
      backgroundColor: theme.palette.badges.bond.background,
      text: 'LIB.OPERATIONS.BOND',
    },
    [MissionValidatorType.CLAIM_FAUCET_XFI_REWARDS]: {
      color: theme.palette.badges.claim.color,
      backgroundColor: theme.palette.badges.claim.background,
      text: 'LIB.OPERATIONS.CLAIM',
    },
    // Others
    [MissionValidatorType.SEND_EVM_FOUNDATION_XFT_TOKEN]: {
      color: theme.palette.badges.send.color,
      backgroundColor: theme.palette.badges.send.background,
      text: 'MISSIONS.SEND_EVM_FOUNDATION_XFT_TOKEN.BADGE',
    },
    [MissionValidatorType.SEND_MPX_AND_XFI_DIFFERENT_ADDRESS]: {
      color: theme.palette.badges.multisend.color,
      backgroundColor: theme.palette.badges.multisend.background,
      text: 'MISSIONS.SEND_MPX_AND_XFI_DIFFERENT_ADDRESS.BADGE',
    },
    // Social networks
    [MissionValidatorType.SUBSCRIBE_TO_TELEGRAM_CHANNEL]: {
      color: theme.palette.badges.createValidator.color,
      backgroundColor: theme.palette.badges.createValidator.background,
      text: 'MISSIONS.SUBSCRIBE_SOCIAL_NETWORK.BADGE',
    },
    [MissionValidatorType.JOIN_DISCORD_SERVER]: {
      color: theme.palette.badges.createValidator.color,
      backgroundColor: theme.palette.badges.createValidator.background,
      text: 'MISSIONS.SUBSCRIBE_SOCIAL_NETWORK.BADGE',
    },

    // Old missions for archive tab
    [OldMissionValidatorType.SEND_MPX_OR_XFI_COSMOS]: {
      color: theme.palette.badges.send.color,
      backgroundColor: theme.palette.badges.send.background,
      text: 'LIB.OPERATIONS.SEND',
    },
    [OldMissionValidatorType.SEND_MPX_OR_XFI_DIFFERENT_ADDRESS]: {
      color: theme.palette.badges.multisend.color,
      backgroundColor: theme.palette.badges.multisend.background,
      text: 'SUMMARY.TASK.MULTISEND_1',
    },
    [OldMissionValidatorType.SEND_XFI_AND_MPX]: {
      color: theme.palette.badges.multisend.color,
      backgroundColor: theme.palette.badges.multisend.background,
      text: 'SUMMARY.TASK.MULTISEND_2',
    },
  };

  return badgeVariants[type] || defaultConfig;
};

export default EventBadge;
