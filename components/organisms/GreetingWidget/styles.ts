import { Box, Stack, styled } from '@mui/material';

export const StyledContainer = styled(Stack, { name: 'StyledContainer' })(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem 0 16rem',
  maxWidth: 'max-content',
  zIndex: 2,

  [theme.breakpoints.down('lg')]: {
    maxWidth: '29.5rem',
    padding: '2rem 0 12rem',
  },

  [theme.breakpoints.down('md')]: {
    padding: '3.62rem 0 5.31rem',
  },

  '& > svg': {
    width: '19.25rem',
    height: '4.43rem',
  },

  '& .heading': {
    marginBottom: '2.5rem',
    textAlign: 'center',
    maxWidth: '43.875rem',
  },

  '& .slogan': {
    marginBottom: '3rem',
    textAlign: 'center',
  },

  '&& .button': {
    [theme.breakpoints.down('sm')]: {
      padding: '0.5rem 1rem 0.75rem 1rem',
    },
  },
}));

export const StyledButtonsContainer = styled(Box, { name: 'StyledButtonsContainer' })(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',

  [theme.breakpoints.down('lg')]: {
    flexDirection: 'column',
    width: '100%',
  },

  '& .keplrButton': {
    backdropFilter: 'blur(1rem)',

    '& .buttonChildren': {
      svg: {
        marginLeft: '0.375rem',
        width: '0.9375rem',
        height: '0.9375rem',
        transform: 'translateY(0.2rem)',
      },
    },
  },
}));
