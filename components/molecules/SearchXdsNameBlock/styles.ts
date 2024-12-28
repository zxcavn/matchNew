import { Stack, styled } from '@mui/material';

export const StyledContainer = styled(Stack, { name: 'StyledContainer' })(({ theme }) => ({
  flexDirection: 'row',
  gap: '1.5rem',
  alignItems: 'center',
  justifyContent: 'space-between',

  '& .searchInputContainer': {
    maxWidth: '24.5rem',
    width: '100%',

    [theme.breakpoints.down('md')]: {
      maxWidth: '100%',
    },
  },

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

export const StyledDescriptionContainer = styled(Stack, { name: 'StyledDescriptionContainer' })(({ theme }) => ({
  gap: '1.5rem',
  position: 'relative',
  maxWidth: '31rem',

  img: {
    maxBlockSize: 'initial',
  },

  '& .xdsBgImage1': {
    position: 'absolute',
    top: '-10rem',
    left: '-6.5rem',
    width: '37.5rem',
    height: '37.5rem',

    [theme.breakpoints.down(1460)]: {
      left: '0rem',
    },

    [theme.breakpoints.down('md')]: {
      right: '-1rem',
      top: '-9rem',
      left: 'initial',
      opacity: '0.65',
    },
  },

  '& .xdsBgImage2': {
    position: 'absolute',
    top: '-7.5rem',
    right: '-33rem',
    width: '37.5rem',
    height: '37.5rem',

    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },

  '& .title': {
    [theme.breakpoints.down('md')]: {
      fontSize: '1.875rem',
    },
  },

  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
  },
}));
