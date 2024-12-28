import { Box, Stack, styled } from '@mui/material';

export const StyledDetails = styled(Stack, { name: 'StyledDetails' })(() => ({
  gap: '0.75rem',
  marginTop: '0.88rem',
}));

export const StyledDetailsRow = styled(Box, { name: 'StyledDetailsRow' })(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '0.75rem',
}));
