import { Icon } from '@/lib/xfi.lib/components/atoms';
import { DiamondIcon, RefreshIcon } from '@/lib/xfi.lib/icons';

import { OutlineBadge } from '../OutlineBadge';

enum MissionType {
  DAILY = 'DAILY',
  UNIQUE = 'UNIQUE',
  ALWAYS = 'ALWAYS',
}

type Props = {
  missionType: MissionType;
};

const MissionTypeBadge = ({ missionType }: Props) => {
  const { icon, text } = CONFIG[missionType];

  return <OutlineBadge text={text} icon={<Icon src={icon} viewBox="0 0 20 20" sx={{ fontSize: '1rem' }} />} />;
};

const CONFIG = {
  [MissionType.ALWAYS]: {
    icon: DiamondIcon,
    text: 'SUMMARY.ALWAYS',
  },
  [MissionType.DAILY]: {
    icon: RefreshIcon,
    text: 'SUMMARY.DAILY',
  },
  [MissionType.UNIQUE]: {
    icon: DiamondIcon,
    text: 'SUMMARY.UNIQUE',
  },
};

export default MissionTypeBadge;
