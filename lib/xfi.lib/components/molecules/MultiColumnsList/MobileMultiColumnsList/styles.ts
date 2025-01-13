import { Stack, styled } from '@mui/material';

export const StyledDetails = styled(Stack, { name: 'StyledDetails' })<{ $isClickable: boolean }>(
  ({ $isClickable }) => ({
    cursor: $isClickable ? 'pointer' : 'default',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',

    '& .column': {
      width: '100%',
    },

    '& .divider': {
      width: '100%',
    },
  })
);
