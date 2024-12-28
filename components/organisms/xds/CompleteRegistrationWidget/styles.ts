import { Box, styled } from '@mui/material';

import { Block } from '@/lib/xfi.lib/components/atoms';

export const StyledBlock = styled(Block, { name: 'StyledBlock' })(({ theme }) => ({
  border: 'none',
  padding: '2.5rem 1rem',
  width: '100%',
  position: 'relative',
  zIndex: 1,

  '& .blockContent': {
    position: 'relative',
    maxWidth: '36.25rem',
    width: '100%',
    margin: '0 auto',

    [theme.breakpoints.down('md')]: {
      maxWidth: '100%',
    },
  },

  '& .title': {
    marginBottom: '1.5rem',
    textAlign: 'center',

    [theme.breakpoints.down('md')]: {
      marginBottom: '1rem',
    },
  },

  '& .subtitle': {
    marginBottom: '2.5rem',
    textAlign: 'center',
    overflowWrap: 'break-word',

    [theme.breakpoints.down('md')]: {
      marginBottom: '2rem',
    },
  },

  '& .description': {
    marginBottom: '2.5rem',

    [theme.breakpoints.down('md')]: {
      marginBottom: '2rem',
    },
  },

  '& .buttonContainer': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    marginTop: '2.5rem',

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column-reverse',
      gap: '1rem',
      marginTop: '2rem',
    },
  },

  '& .fireworkAnimation': {
    position: 'absolute',
    left: '50%',
    top: '12%',
    transform: 'scale(2)',
  },

  [theme.breakpoints.down('md')]: {
    padding: '1rem',
  },
}));

export const StyledContainer = styled(Box, { name: 'StyledContainer' })(() => ({
  position: 'relative',
  zIndex: 1,
}));
