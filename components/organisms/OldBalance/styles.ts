import { Stack, styled } from '@mui/material';

import { Block as UIBlock } from '@/lib/xfi.lib/components/atoms';

export const StyledOldBalance = styled(UIBlock, { name: 'StyledOldBalance' })(({ theme }) => ({
  position: 'relative',
  background: 'none',
  borderColor: theme.palette.neutrals.border,

  '.shapeIconWrapper': {
    position: 'absolute',
    top: '-2rem',
    right: '5rem',
  },
}));

export const StyledContentContainer = styled(Stack, { name: 'StyledContentContainer' })(({ theme }) => ({
  gap: '2rem',
  width: '100%',

  '& .walletAddress': {
    maxWidth: '34.75rem',

    [theme.breakpoints.down('md')]: {
      maxWidth: '100%',
      flexDirection: 'row',

      '& button': {
        alignSelf: 'end',
      },
    },
  },

  [theme.breakpoints.down('md')]: {
    gap: '1.5rem',
  },
}));
