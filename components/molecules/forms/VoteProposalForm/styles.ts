import { Box, styled } from '@mui/material';

export const StyledInputRow = styled(Box, { name: 'StyledInputRow' })(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'auto 7rem',
  alignItems: 'center',
  gap: '1rem',

  [theme.breakpoints.down('md')]: {
    gap: '0.5rem',
  },
}));

export const StyledButtonsContainer = styled(Box, { name: 'StyledButtonsContainer' })(({ theme }) => ({
  marginTop: '0.5rem',
  display: 'flex',
  justifyContent: 'end',
  gap: '1rem',

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column-reverse',
  },
}));
