import { Stack, styled } from '@mui/material';

import { Block } from '@/lib/xfi.lib/components/atoms';
import { AppThemeVariant } from '@/lib/xfi.lib/theme';

export const StyledFaucetWidget = styled(Block, { name: 'StyledFaucetWidget' })(({ theme }) => ({
  width: '100%',
  minWidth: '29.25rem',
  background: 'none',
  backgroundImage: `${
    theme.palette.mode === AppThemeVariant.dark
      ? 'url(/images/background/faucet-bg-dark.webp)'
      : 'url(/images/background/faucet-bg-light.webp)'
  }`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'calc(100% - 10%) top',
  backgroundSize: '19rem',
  border: `1px solid ${theme.palette.neutrals.border}`,

  [theme.breakpoints.down(1400)]: {
    backgroundSize: '50%',
  },

  '& .backgroundSpacer': {
    width: '16.5rem',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      height: '12.3125rem',
    },
  },

  '& .blockChildren': {
    height: '100%',
  },

  [theme.breakpoints.down('md')]: {
    height: '100%',
    maxWidth: '100%',
    minWidth: 'auto',
    backgroundPosition: 'top center',
    backgroundSize: '16rem',
  },
}));

export const StyledTextContent = styled(Stack, { name: 'StyledTextContent' })(({ theme }) => ({
  gap: '2rem',
  flexGrow: 1,
  alignSelf: 'end',

  [theme.breakpoints.down('md')]: {
    width: '100%',
    alignSelf: 'start',
  },
}));
