import { Box, styled } from '@mui/material';

import { Block } from '@/lib/xfi.lib/components/atoms';

export const StyledCosmosBalancesWidget = styled(Block, { name: 'StyledCosmosBalancesWidget' })(({ theme }) => ({
  background: 'none',
  borderColor: theme.palette.neutrals.border,

  [theme.breakpoints.down('md')]: {
    padding: '1rem 1.5rem',
    minHeight: 'auto',
  },

  '.shapeIconWrapper': {
    position: 'absolute',
    top: '-2rem',
    right: '5rem',
  },

  '& .stakedMpxBlock': {
    marginTop: '1rem',
    paddingBottom: '1.6563rem',
    borderBottom: '1px solid',
    borderColor: theme.palette.neutrals.border,

    [theme.breakpoints.down('md')]: {
      marginTop: '1.5rem',
    },
  },
}));

export const StyledDescriptionContainer = styled(Box, { name: 'StyledDescriptionContainer' })(({ theme }) => ({
  display: 'flex',
  gap: '0.75rem',
  maxWidth: '38.5rem',

  [theme.breakpoints.down('md')]: {
    gap: '0.5rem',
  },
}));
