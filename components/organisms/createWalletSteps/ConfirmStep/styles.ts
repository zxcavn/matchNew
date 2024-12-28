import { Box, Stack, styled } from '@mui/material';

export const CheckingSeedWrapper = styled(Stack, { name: 'CheckingSeedBlock' })(({ theme }) => ({
  alignItems: 'center',
  maxWidth: '27.875rem',
  width: '100%',
  padding: '6rem 0',

  '& .title': {
    alignSelf: 'start',
  },

  '& .formBlock': {
    width: '100%',
    paddingTop: '2rem',
    minWidth: '20rem',

    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },

  [theme.breakpoints.down('md')]: {
    padding: '2.5rem 0',
  },
}));

export const ButtonsContainer = styled(Box, { name: 'ButtonsContainer' })(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '1rem',
  width: '100%',
  paddingTop: '1rem',
  alignSelf: 'start',

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column-reverse',
    alignSelf: 'auto',
  },

  '& .buttonBack': {
    backdropFilter: 'blur(1rem)',
  },
}));
