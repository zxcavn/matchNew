import { Stack, styled } from '@mui/material';

import { Block } from '@/lib/xfi.lib/components/atoms';

export const StyledNftInventoryList = styled(Block, { name: 'StyledNftInventoryList' })(({ theme }) => ({
  minHeight: '28rem',

  '& .blockChildren': {
    display: 'flex',
    flexDirection: 'column',
    gap: '2.5rem',
    height: '100%',
    flexGrow: 1,
  },

  '.cardsWrapper': {
    display: 'grid',
    justifyContent: 'space-between',
    gridTemplateColumns: `repeat(6,1fr)`,
    gridAutoRows: 'min-content',
    gap: '1.5rem',
    width: '100%',
    height: '100%',

    [theme.breakpoints.down(1500)]: {
      gridTemplateColumns: `repeat(4,1fr)`,
    },

    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: `repeat(3,1fr)`,
    },

    [theme.breakpoints.down(700)]: {
      gridTemplateColumns: `repeat(2,1fr)`,
    },

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
}));

export const StyledBlockTitle = styled(Stack, { name: 'StyledBlockTitle' })<{
  $hasData: boolean;
}>(({ theme, $hasData }) => ({
  marginBottom: '1.5rem',
  padding: $hasData ? '0 1.5rem' : 0,
  gap: '1rem',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',

  [theme.breakpoints.down('md')]: {
    marginBottom: '0.5rem',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
}));
