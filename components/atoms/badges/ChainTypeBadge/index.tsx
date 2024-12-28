import { Icon } from '@/lib/xfi.lib/components/atoms';
import { CosmosSmallIcon, EvmSmallIcon } from '@/lib/xfi.lib/icons';
import { ChainType } from '@/shared/types';

import { OutlineBadge } from '../OutlineBadge';

type Props = {
  chainType: ChainType;
};

const ChainTypeBadge = ({ chainType }: Props) => {
  const { icon, text } = CONFIG[chainType];

  return <OutlineBadge text={text} icon={<Icon src={icon} viewBox="0 0 20 20" sx={{ fontSize: '1rem' }} />} />;
};

const CONFIG = {
  [ChainType.COSMOS]: {
    icon: CosmosSmallIcon,
    text: 'Cosmos',
  },
  [ChainType.EVM]: {
    icon: EvmSmallIcon,
    text: 'EVM',
  },
};

export default ChainTypeBadge;
