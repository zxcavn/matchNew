import { MxNumberFormatter } from '@xfi/formatters';

import { theme } from '@/lib/xfi.lib/theme';
import { Proposal } from '@/store/gov';

const LIGHT_GRAY_COLOR = '#E0E0E0';

export const getSegments = (
  data: Proposal
): {
  background: string;
  value: number;
  name: string;
}[] => [
  {
    background: theme.palette.alerts.success,
    value: Number(MxNumberFormatter.formatUnits(data.finalTallyResult.yes)),
    name: 'PROPOSALS.YES',
  },
  {
    background: theme.palette.alerts.error,
    value: Number(MxNumberFormatter.formatUnits(data.finalTallyResult.no)),
    name: 'PROPOSALS.NO',
  },
  {
    background: LIGHT_GRAY_COLOR,
    value: Number(MxNumberFormatter.formatUnits(data.finalTallyResult.noWithVeto)),
    name: 'PROPOSALS.VETO',
  },
  {
    background: theme.palette.neutrals.secondaryText,
    value: Number(MxNumberFormatter.formatUnits(data.finalTallyResult.abstain)),
    name: 'PROPOSALS.ABSTAIN',
  },
];
