import { Box, styled } from '@mui/material';

import { theme } from '@/lib/xfi.lib/theme';

export const StyledIconContainer = styled(Box, { name: 'StyledIconContainer' })(() => ({
  position: 'relative',
  display: 'flex',
  width: 'fit-content',
  height: 'fit-content',
  borderRadius: '50%',
  overflow: 'hidden',

  '.lightStripeAnimation': {
    transform: 'rotate(325deg)',
    background: 'linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0.5) 50%, transparent 100%)',
    animation: 'lightStripe 1.3s linear',
  },

  '@keyframes lightStripe': {
    '0%': { left: '-30%' },
    '100%': { left: '120%' },
  },
}));

export const StyledAnimationContainer = styled(Box, { name: 'StyledAnimationContainer' })(() => ({
  position: 'absolute',
  top: '0.1rem',
  left: '0.1rem',
  overflow: 'hidden',
  borderRadius: '50%',
  height: '1rem',
  width: '1rem',

  [theme.breakpoints.down('lg')]: {
    top: '0.1875rem',
    left: '0.1875rem',
    height: '1.6rem',
    width: '1.6rem',
  },
}));

export const StyledIconAnimation = styled(Box, { name: 'StyledIconAnimation' })(() => ({
  position: 'absolute',
  top: '-0.5rem',
  left: 0,
  borderRadius: '50%',
  height: '3rem',
  width: '40%',
}));
