import { Stack, styled } from '@mui/material';

export const StyledVoteBlock = styled(Stack, { name: 'StyledVoteBlock' })(({ theme }) => ({
  padding: '0.75rem',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  gap: '0.5rem',
  width: '100%',
  borderRadius: '1rem',
  background: theme.palette.neutrals.tableLine,

  '& .votePercent': {
    flexDirection: 'row',
    gap: '1.25rem',
    justifyContent: 'space-between',
    width: '100%',
    textTransform: 'uppercase',
  },
}));
