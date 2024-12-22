import { Box, styled } from '@mui/material';

export const StyledFormContainer = styled(Box, { name: 'StyledFormContainer' })(() => ({
  '& .isRow': {
    flexDirection: 'row',
    justifyContent: 'end',
    alignItems: 'center',
    gap: '1rem',

    label: {
      marginTop: 0,
      padding: 0,
    },
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
