import { Stack, styled } from '@mui/material';

import { HASH_CHECK_CUSTOM_BREAKPOINTS } from '@/shared/constants';

export const StyledHashCheckStep = styled(Stack, { name: 'StyledHashCheckStep' })(({ theme }) => ({
  gap: '2rem',
  marginTop: '3rem',

  [theme.breakpoints.down(HASH_CHECK_CUSTOM_BREAKPOINTS.md)]: {
    marginTop: '1.5rem',
    width: '21.125rem',
  },

  '.stepCard': {
    position: 'relative',

    '.stepDescription': {
      position: 'absolute',
      top: '2rem',
      left: '3.5625rem',
      width: '14.0625rem',
    },
  },

  '.overlineIcon': {
    width: '21.125rem',
    height: '2.125rem',
    [theme.breakpoints.down(HASH_CHECK_CUSTOM_BREAKPOINTS.md)]: {
      display: 'none',
    },
  },
}));
