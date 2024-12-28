import { styled } from '@mui/material';

import { Block } from '@/lib/xfi.lib/components/atoms';

export const StyledProposalVoteWidget = styled(Block, { name: 'StyledProposalVoteWidget' })(({ theme }) => ({
  width: '100%',

  [theme.breakpoints.down('md')]: {
    padding: '1rem',
  },
}));
