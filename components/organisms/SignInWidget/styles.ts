import { Box, styled } from '@mui/material';

export const StyledSignInContainer = styled(Box, { name: 'StyledSignInContainer' })(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  maxWidth: '27.875rem',
  width: '100%',
  padding: '6rem 0',

  '& .formBlock': {
    '& .inputsContainer': {
      gap: '2rem',
    },
  },

  [theme.breakpoints.down('md')]: {
    padding: '2.5rem 0',
  },
}));
