import { Stack, styled } from '@mui/material';

export const StyledBlock = styled(Stack, { name: 'StyledBlock' })(({ theme }) => ({
  border: `1px solid ${theme.palette.neutrals.border}`,
  borderRadius: '1.5rem',
  padding: '1rem',
  gap: '1rem',
  width: '100%',

  [theme.breakpoints.down('md')]: {
    padding: '1rem',
  },
}));

export const StyledRow = styled(Stack, { name: 'StyledRow' })(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '0.5rem',
  justifyContent: 'space-between',
  width: '100%',

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
}));
