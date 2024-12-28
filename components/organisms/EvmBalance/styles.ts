import { Stack, styled } from '@mui/material';

import { Block } from '@/lib/xfi.lib/components/atoms';

export const StyledBlock = styled(Block, { name: 'StyledBlock' })(({ theme }) => ({
  background: 'none',
  borderColor: theme.palette.neutrals.border,
}));

export const StyledBalanceContainer = styled(Stack, { name: 'StyledBalanceContainer' })(({ theme }) => ({
  position: 'relative',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  gap: '1.5rem',

  '.shapeIconWrapper': {
    position: 'absolute',
    top: '-5.8rem',
    right: '3rem',
  },

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',

    '& .balance': {
      width: '100%',
      flexDirection: 'row',
    },
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
