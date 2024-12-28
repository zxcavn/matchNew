import { Stack, styled } from '@mui/material';

export const StyledSearchTokensContainer = styled(Stack, { name: 'StyledTokensContainer' })(({ theme }) => ({
  '.virtuosoContainer': {
    '&::-webkit-scrollbar-thumb': {
      width: '0.3125rem',
      backgroundColor: theme.palette.neutrals.dark,
      borderRadius: '1.25rem',
    },
  },
}));

export const StyledTokensContainer = styled(Stack, { name: 'StyledTokensContainer' })(() => ({
  gap: '1rem',
  marginRight: '0.5rem',
}));

export const StyledTokenItem = styled(Stack, { name: 'StyledTokenItem' })(({ theme }) => ({
  flexDirection: 'row',
  gap: '0.5rem',
  padding: '0.5rem',
  borderRadius: '0.5rem',
  cursor: 'pointer',
  width: '100%',

  '&:hover': {
    border: `1px solid ${theme.palette.neutrals.border}`,
    padding: 'calc(0.5rem - 1px)',
  },

  '&.selected': {
    border: `1px solid ${theme.palette.primary.lighter}`,
    padding: 'calc(0.5rem - 1px)',
  },
}));
