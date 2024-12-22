import { styled } from '@mui/material';

import { Block } from '@/lib/xfi.lib/components/atoms';

export const StyledProposalResultsWidget = styled(Block, { name: 'StyledProposalResultsWidget' })(({ theme }) => ({
  '& .option': {
    padding: '0.75rem',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '2.6875rem',
    borderRadius: '1rem',
    background: theme.palette.neutrals.toast,
  },
}));
