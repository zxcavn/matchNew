import { Box, styled } from '@mui/material';

export const FormContainer = styled(Box, { name: 'FormContainer' })({
  '& .inputsContainer': {
    gap: '2rem',
  },
});

export const ButtonsContainer = styled(Box, { name: 'ButtonsContainer' })(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '1rem',

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));
