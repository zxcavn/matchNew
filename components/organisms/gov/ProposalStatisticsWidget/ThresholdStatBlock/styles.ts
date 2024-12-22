import { Stack, styled } from '@mui/material';

export const StyledThresholdStatBlock = styled(Stack, { name: 'StyledThresholdStatBlock' })(({ theme }) => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  gap: '0.5rem',
  color: theme.palette.alerts.error,
}));
