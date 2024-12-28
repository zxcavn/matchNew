import { Box, styled } from '@mui/material';

export const MultisendFormContainer = styled('form', { name: 'MultisendFormContainer' })(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '2.5fr 6fr',
  gap: '1.5rem',

  '& .input': {
    maxHeight: '5rem',
    height: 'max-content',

    '& .captionWrapper': {
      textWrap: 'nowrap',
    },
  },

  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
  },
}));

export const IconContainer = styled(Box, { name: 'IconContainer' })({
  minWidth: '1.5rem',
  minHeight: '1.5rem',
  marginRight: '0.75rem',
  display: 'flex',
  alignItems: 'center',
});

export const CoinRowContainer = styled(Box, { name: 'CoinRowContainer' })(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '9fr 12fr',
  gap: '1.5rem',
  alignItems: 'flex-end',
  justifyContent: 'flex-end',

  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
  },
}));

export const AmountContainer = styled(Box, { name: 'AmountContainer' })(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '5fr minmax(6.5rem, auto)',
  gap: '1.5rem',
  height: 'max-content',

  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
  },
}));

export const ButtonsContainer = styled(Box, { name: 'ButtonsContainer' })(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
  gap: '1rem',
  width: '6.5rem',

  [theme.breakpoints.down('md')]: {
    justifyContent: 'center',
    width: '100%',
  },
}));
