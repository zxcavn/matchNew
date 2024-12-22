import { Box, styled } from '@mui/material';

import { Block } from '@/lib/xfi.lib/components/atoms';

export const StyledStepContainer = styled(Box, { name: 'StyledStepContainer' })(({ theme }) => ({
  padding: '6rem 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  maxWidth: '30.875rem',
  width: '100%',

  '& .privacyPolicyForm': {
    '& .MuiCheckbox-root': {
      padding: 0,
    },

    '& .MuiFormControlLabel-root': {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      gap: '0.75rem',
      color: theme.palette.neutrals.secondaryText,
    },

    '& .MuiFormControlLabel-label': {
      position: 'relative',
      top: '-0.0625rem',
    },
  },

  '& .inputsContainer': {
    gap: '2rem',
  },

  [theme.breakpoints.down('md')]: {
    padding: '2.5rem 0',
  },
}));

export const StyledFormBlock = styled(Block, { name: 'StyledFormBlock' })(({ theme }) => ({
  backdropFilter: 'blur(1rem)',

  [theme.breakpoints.down('md')]: {
    padding: '1rem',
  },
}));

export const StyledButtonsContainer = styled(Box, { name: 'StyledButtonContainer' })(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '1rem',

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column-reverse',
  },

  '& .buttonBack': {
    backdropFilter: 'blur(1rem)',
  },
}));
