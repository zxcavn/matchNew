import { NONE_VALUE } from '../../../../constants';
import { GradientBadge } from '../GradientBadge';
import { CONTENT_TYPE_CONFIG } from './constants';
import type { ProposalBadgeType } from './types';

type Props = {
  className?: string;
  type: ProposalBadgeType;
};

const ProposalBadge = ({ className, type }: Props) => {
  return (
    <GradientBadge
      className={className}
      style={{ whiteSpace: 'nowrap' }}
      color={CONTENT_TYPE_CONFIG[type]?.color || 'lightBlue'}
    >
      {CONTENT_TYPE_CONFIG[type]?.title || NONE_VALUE}
    </GradientBadge>
  );
};

export default ProposalBadge;
