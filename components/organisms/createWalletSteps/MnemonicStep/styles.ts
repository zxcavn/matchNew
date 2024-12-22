import { Box, Stack, styled } from '@mui/material';

export const MnemonicStepContainer = styled(Stack, { name: 'MnemonicStepContainer' })(({ theme }) => ({
  alignItems: 'flex-start',
  justifyContent: 'center',
  flex: '1 0 auto',
  maxWidth: '30.875rem',
  padding: '6rem 0',
  width: '100%',

  '& .heading': {
    marginBottom: '2rem',
  },

  '& .downloadButton': {
    ...theme.typography.link,

    cursor: 'pointer',
    marginTop: '1rem',
    textDecoration: 'underline',
  },

  [theme.breakpoints.down('md')]: {
    padding: '2.5rem 0',
  },
}));

export const ButtonsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  paddingTop: '2rem',
  gap: '1rem',
  width: '100%',

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column-reverse',
  },

  '& .buttonBack': {
    backdropFilter: 'blur(1rem)',
  },
}));
