import { Stack, styled } from '@mui/material';

import { Block } from '@/lib/xfi.lib/components/atoms';

const MAX_WIDTH = '54.375rem';

export const StyledCreateProposalWidget = styled(Stack, { name: 'StyledCreateProposalWidget' })(({ theme }) => ({
  '& .formWrapper': {
    padding: '2rem',
    maxWidth: MAX_WIDTH,

    [theme.breakpoints.down('md')]: {
      padding: 0,
      border: 'none',
    },
  },

  '& .govParamsWrapper': {
    width: '100%',
    maxWidth: MAX_WIDTH,
  },
}));

export const StyledInfoBlock = styled(Block, { name: 'StyledInfoBlock' })(({ theme }) => ({
  background: theme.palette.neutrals.toast,
}));
