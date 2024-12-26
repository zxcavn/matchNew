import { Stack, Typography } from '@mui/material';
import { MxNumberFormatter } from '@xfi/formatters';
import urlJoin from 'url-join';

import { MissionHistoryType, MissionValidatorType } from '@/crud/xfiPad';
import { ColumnTypesEnum, HashLink, MobileTableConfig, TableColumns } from '@/lib/xfi.lib/components/molecules';
import { XFI_SCAN_URL } from '@/shared/constants';


const isSocialNetworkMission = (validator: MissionValidatorType) =>
  [MissionValidatorType.SUBSCRIBE_TO_TELEGRAM_CHANNEL, MissionValidatorType.JOIN_DISCORD_SERVER].includes(validator);

export const MOBILE_CONFIG: MobileTableConfig<MissionHistoryType> = {
  headerId: 'hash',
  unexpandedIds: ['createdAt', 'validator', 'reward'],
  renderTitle: ({ hash, validator }) => {
    return (
      <HashLink
        target="_blank"
        hash={hash}
        href={!isSocialNetworkMission(validator) ? urlJoin(XFI_SCAN_URL, 'tx', hash) : undefined}
      />
    );
  },
};

export const TABLE_COLUMNS: TableColumns<MissionHistoryType> = [
  {
    type: ColumnTypesEnum.hashLink,
    id: 'hash',
    label: {
      text: 'SUMMARY.HASH',
    },
    extra: ({ hash, validator }) => ({
      hash,
      href: !isSocialNetworkMission(validator) ? urlJoin(XFI_SCAN_URL, 'tx', hash) : undefined,
      target: '_blank',
    }),
  },
  {
    type: ColumnTypesEnum.date,
    id: 'createdAt',
    label: {
      text: 'SUMMARY.DATE',
    },
    extra: ({ createdAt }) => ({ date: createdAt }),
  },
  {
    type: ColumnTypesEnum.jsx,
    id: 'reward',
    label: {
      text: 'SUMMARY.REWARD',
      align: 'right',
    },

    render: ({ reward }) => {
      return (
        <Stack flexDirection={'row'} gap={'0.25rem'}>
          <Typography color={'background.light'} variant="subtitle1">
            {MxNumberFormatter.formatToDisplay(String(reward.amount))}
          </Typography>
          <Typography color={'neutrals.secondaryText'} textTransform={'uppercase'}>
            {reward.currency}
          </Typography>
        </Stack>
      );
    },
  },
];
