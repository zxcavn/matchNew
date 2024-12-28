import { MissionGroup } from '@/crud/xfiPad';
import { OptionType } from '@/lib/xfi.lib/components/atoms';
import { CURRENCIES } from '@/lib/xfi.lib/constants';
import { ALL_VALUE } from '@/shared/constants';

export const GROUP_OPTIONS: OptionType<string>[] = [
  {
    value: ALL_VALUE,
    label: { type: 'intl', id: 'SUMMARY.ALL' },
  },
  {
    value: MissionGroup.MPX,
    label: { type: 'text', text: CURRENCIES.mpx.text },
  },
  {
    value: MissionGroup.XFI,
    label: { type: 'text', text: CURRENCIES.xfi.text },
  },
  {
    value: MissionGroup.OTHERS,
    label: { type: 'intl', id: 'MISSION_GROUP.OTHERS.NAME' },
  },
  {
    value: MissionGroup.STAKING,
    label: { type: 'intl', id: 'MISSION_GROUP.STAKING.NAME' },
  },
  {
    value: MissionGroup.SOCIAL_NETWORK,
    label: { type: 'intl', id: 'MISSION_GROUP.SOCIAL_NETWORKS.NAME' },
  },
];

export const EARN_XFT_TABS = [
  { value: 'active', label: 'SUMMARY.ACTIVE' },
  { value: 'archived', label: 'SUMMARY.ARCHIVED' },
];
