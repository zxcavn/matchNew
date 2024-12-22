import { VoteOption } from 'cosmjs-types/cosmos/gov/v1beta1/gov';

import { Props as RadioProps } from '@/lib/xfi.lib/components/atoms/inputs/Radio/Radio';

export const RADIO_GROUP_OPTIONS: RadioProps[] = [
  {
    value: String(VoteOption.VOTE_OPTION_YES),
    labelPlacement: 'end',
    label: {
      type: 'intl',
      id: 'PROPOSALS.VOTE.YES',
    },
  },
  {
    value: String(VoteOption.VOTE_OPTION_NO),
    labelPlacement: 'end',
    label: {
      type: 'intl',
      id: 'PROPOSALS.VOTE.NO',
    },
  },
  {
    value: String(VoteOption.VOTE_OPTION_ABSTAIN),
    labelPlacement: 'end',
    label: {
      type: 'intl',
      id: 'PROPOSALS.VOTE.ABSTAIN',
    },
  },
  {
    value: String(VoteOption.VOTE_OPTION_NO_WITH_VETO),
    labelPlacement: 'end',
    label: {
      type: 'intl',
      id: 'PROPOSALS.VOTE.NO_WITH_VETO',
    },
  },
];
