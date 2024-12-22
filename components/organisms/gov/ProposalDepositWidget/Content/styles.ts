import { Stack, styled } from '@mui/material';

export const StyledContent = styled(Stack, { name: 'StyledContent' })(({ theme }) => ({
  gap: '1.5rem',
  height: '100%',

  '& .progressWrapper': {
    padding: '1.25rem',
    gap: '1.25rem',
    justifyContent: 'space-between',
    borderRadius: '1rem',
    background: theme.palette.neutrals.bg,

    [theme.breakpoints.down('md')]: {
      padding: 0,
      background: 'transparent',
    },
  },

  '& .rowsWrapper': {
    height: 'calc(100vh - 28.4375rem)',
    minHeight: '6.25rem',
    maxHeight: '25.25rem',

    [theme.breakpoints.down('sm')]: {
      height: '100%',
    },
  },

  '.virtuosoContainer': {
    height: '100%',

    '&::-webkit-scrollbar-thumb': {
      width: '0.3125rem',
      backgroundColor: theme.palette.neutrals.dark,
      borderRadius: '1.25rem',
    },
  },

  '& .button': {
    marginTop: '1rem',

    [theme.breakpoints.down('sm')]: {
      marginTop: 'auto',
    },
  },
}));

export const StyledDepositsContainer = styled(Stack, { name: 'StyledDepositsContainer' })(() => ({
  gap: '1rem',
  marginRight: '0.5rem',
}));
