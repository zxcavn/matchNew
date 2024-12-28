import { Stack, styled } from '@mui/material';

export const StyledContainer = styled(Stack, { name: 'StyledContainer' })(() => ({
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1.5rem',
  height: '100%',
  width: '100%',

  '& .fireworkAnimation': {
    position: 'absolute',
    left: '50%',
    top: '12%',
    transform: 'scale(2)',
  },
}));
