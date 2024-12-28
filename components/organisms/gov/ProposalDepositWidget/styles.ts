import { styled } from '@mui/material';

import { Block } from '@/lib/xfi.lib/components/atoms';

export const StyledProposalDepositWidget = styled(Block, { name: 'StyledProposalDepositWidget' })(({ theme }) => ({
  width: '100%',

  [theme.breakpoints.down('md')]: {
    padding: '1rem',
  },
}));
