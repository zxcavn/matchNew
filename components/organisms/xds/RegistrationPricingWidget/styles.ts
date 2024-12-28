import { styled } from '@mui/material';

import { Block } from '@/lib/xfi.lib/components/atoms';

export const StyledBlock = styled(Block, { name: 'StyledBlock' })(({ theme }) => ({
  border: 'none',
  padding: '2.5rem',

  '& .nameTitle': {
    overflowWrap: 'break-word',
    marginBottom: '2rem',
    textTransform: 'lowercase',
  },

  '& .startTimer': {
    alignSelf: 'center',
  },

  [theme.breakpoints.down('md')]: {
    padding: '1rem',

    '.commitWidget': {
      width: '100%',
    },
  },
}));
