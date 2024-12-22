import { Stack, styled } from '@mui/material';

import { Block } from '@/lib/xfi.lib/components/atoms';

export const StyledBlock = styled(Block, { name: 'StyledBlock' })(({ theme }) => ({
  border: 'none',
  padding: '2.5rem',

  '& .nameHeading': {
    marginBottom: '1.5rem',
    textTransform: 'lowercase',
    color: 'inherit',
    overflowWrap: 'break-word',
  },

  '& .title': {
    color: 'inherit',
    textAlign: 'center',
    marginBottom: '2.5rem',

    [theme.breakpoints.down('md')]: {
      marginBottom: '2rem',
    },
  },

  '& .description': {
    maxWidth: '32.375rem',
    textAlign: 'center',
    marginBottom: '1.5rem',
    marginTop: '2.5rem',
    color: theme.palette.neutrals.secondaryText,

    [theme.breakpoints.down('md')]: {
      marginTop: '1.5rem',
    },
  },

  [theme.breakpoints.down('md')]: {
    padding: '1rem',
  },
}));

export const StyledButtonsContainer = styled(Stack, { name: 'StyledButtonsContainer' })(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '0.5rem',
  color: theme.palette.background.light,

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column-reverse',
    gap: '1rem',
    width: '100%',

    '& .button': {
      width: '100%',
    },
  },
}));
