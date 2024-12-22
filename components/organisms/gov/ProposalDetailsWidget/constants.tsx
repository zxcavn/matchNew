import { Stack } from '@mui/material';
import { MxNumberFormatter } from '@xfi/formatters';

import { Copy, Input, TruncatedInput } from '@/lib/xfi.lib/components/atoms';
import { CURRENCIES } from '@/lib/xfi.lib/constants';
import { NONE_VALUE } from '@/shared/constants';
import { ProposalMessageType } from '@/shared/types';
import { Proposal } from '@/store/gov';

import InfoBlock from './InfoBlock';

export const getProposalContent = ({ proposal }: { proposal: Proposal }) => {
  const proposalType = proposal?.content?.type;

  switch (proposalType) {
    case ProposalMessageType.COMMUNITY_POOL_SPEND: {
      const amounts = proposal?.content?.amount?.map(
        item => `${MxNumberFormatter.formatUnitsToDisplay(item.amount)} ${CURRENCIES[item.denom].text}`
      );

      return (
        <>
          <TruncatedInput
            isEditable={false}
            value={proposal?.content?.recipient || NONE_VALUE}
            label={{ type: 'intl', id: 'PROPOSALS.RECIPIENT_ADDRESS' }}
            suffix={
              <Stack direction="row" alignItems="center" gap="0.5rem">
                <Copy variant="button" value={proposal?.content?.recipient || ''} />
              </Stack>
            }
            paddingSumPx={80}
          />
          <Input
            isEditable={false}
            value={amounts?.join(', ') || NONE_VALUE}
            label={{ type: 'intl', id: 'PROPOSALS.AMOUNT' }}
          />
        </>
      );
    }

    case ProposalMessageType.SOFTWARE_UPGRADE: {
      return (
        <>
          <Input
            isEditable={false}
            value={proposal?.content?.plan?.name || NONE_VALUE}
            label={{ type: 'intl', id: 'SUMMARY.NAME' }}
          />
          <Input
            isEditable={false}
            value={proposal?.content?.plan?.height || NONE_VALUE}
            label={{ type: 'intl', id: 'PROPOSALS.HEIGHT' }}
          />
          <InfoBlock data={proposal?.content?.plan?.info} />
        </>
      );
    }
  }
};
