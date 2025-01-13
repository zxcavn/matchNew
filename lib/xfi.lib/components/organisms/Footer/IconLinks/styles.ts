import { styled } from '@mui/material';

export const StyledLinks = styled('div', { name: 'StyledLinks' })(() => ({
  display: 'flex',
  gap: '1rem',

  '& .link': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '1.25rem',
    height: '1.25rem',
    cursor: 'pointer',
  },
}));
