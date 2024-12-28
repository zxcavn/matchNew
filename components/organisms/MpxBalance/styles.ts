import { Box, styled } from '@mui/material';

import { Block as UIBlock } from '@/lib/xfi.lib/components/atoms';

export const StyledBlock = styled(UIBlock, { name: 'StyledBlock' })(({ theme }) => ({
  borderColor: theme.palette.neutrals.border,

  '&': {
    gap: '1.5rem',
    padding: '1.5rem 0',
    background: 'transparent',
  },

  '& .stakedMpxBlock': {
    margin: '1.5rem 1.5rem 0',
    paddingLeft: '1rem',

    [theme.breakpoints.down('md')]: {
      margin: 0,
    },
  },

  '& .frozenBalance': {
    marginTop: '3rem',
  },
}));

const BALANCE_DARK_BACKGROUND = '#10141F80';

export const StyledMpxBalanceContainer = styled(Box, { name: 'StyledMpxBalanceContainer' })(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '1.5rem',
  padding: '0 1.5rem',

  '& .balanceWrapper': {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    width: 'fit-content',
    minWidth: '22.8125rem',
    padding: '1rem',
    borderRadius: '1rem',
    backgroundColor: theme.palette.mode === 'dark' ? BALANCE_DARK_BACKGROUND : theme.palette.common.white,

    [theme.breakpoints.down('md')]: {
      width: '100%',
      minWidth: 'initial',
    },
  },

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '0 1rem',
  },
}));
