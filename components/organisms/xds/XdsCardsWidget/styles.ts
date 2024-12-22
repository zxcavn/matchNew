import { Stack, styled } from '@mui/material';

export const StyledXdsCardsWidget = styled(Stack, { name: 'StyledXdsCardsWidget' })(({ theme }) => ({
  padding: '0 1.5rem',

  [theme.breakpoints.down('md')]: {
    padding: '0',
  },

  '.gridWrapper': {
    display: 'grid',
    gap: '1.5rem',
    gridTemplateColumns: '1fr 1fr 1fr',

    [theme.breakpoints.down(1600)]: {
      gridTemplateColumns: '1fr 1fr',
    },

    [theme.breakpoints.down(1024)]: {
      gridTemplateColumns: '1fr',
    },
  },

  '.pagination': {
    marginTop: '2.5rem',

    [theme.breakpoints.down('md')]: {
      marginTop: '1.5rem',
    },
  },
}));
