import { alpha, Stack, styled } from '@mui/material';

import { AppThemeVariant } from '@/lib/xfi.lib/theme';

export const StyledResourcesImageLinks = styled(Stack, { name: 'StyledResourcesImageLinks' })(({ theme }) => ({
  minHeight: '30.75rem',
  overflow: 'hidden',
  borderRadius: '1rem',
  alignItems: 'center',
  background: theme.palette.mode === AppThemeVariant.dark ? 'initial' : alpha(theme.palette.common.white, 0.5),

  [theme.breakpoints.down('lg')]: {
    minHeight: 'initial',
  },

  '&.isMirrored': {
    justifyContent: 'flex-end',

    '.list': {
      paddingRight: '2rem',
    },
  },

  '&:not(.isMirrored)': {
    '.list': {
      paddingLeft: '2rem',
    },
  },

  '.list': {
    zIndex: 1,
    gap: '2.5rem',
    minWidth: '30rem',

    [theme.breakpoints.down(1380)]: {
      minWidth: 'initial',
      width: '24rem',
    },

    [theme.breakpoints.down('lg')]: {
      maxWidth: 'initial',
      minWidth: 'initial',
      width: '100%',
      gap: '1rem',
    },
  },

  '.resourceLink': {
    paddingBottom: '1rem',
    borderBottom: `1px solid ${theme.palette.neutrals.border}`,
  },

  '.canvasWrapper': {
    maxWidth: '40.625rem',
    maxHeight: '37.1875',
    position: 'absolute',
    right: '-2%',
    top: '-10%',
    mask: 'linear-gradient(270deg, #7d94a7 50%, rgba(175, 193, 209, 0))',

    '&.isMirrored': {
      left: '-2%',
      right: 0,
      mask: 'linear-gradient(90deg, #7d94a7 50%, rgba(175, 193, 209, 0))',
    },

    [theme.breakpoints.down('lg')]: {
      display: 'none',
    },
  },
}));
