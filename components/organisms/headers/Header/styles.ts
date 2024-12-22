import { alpha, styled } from '@mui/material';

import { shouldForwardProp } from '@/lib/xfi.lib/helpers';

export const StyledHeader = styled('header', { name: 'StyledHeader', shouldForwardProp })<{ $isBlur: boolean }>(
  ({ theme, $isBlur }) => ({
    position: 'sticky',
    top: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1.5rem 2rem .5rem',
    width: '100%',
    zIndex: theme.zIndex.appBar,
    background: alpha(theme.palette.background.dark, 0.2),
    backdropFilter: $isBlur ? 'blur(0.75rem)' : 'initial',

    [theme.breakpoints.down('lg')]: {
      width: '100vw',
      padding: '1.5rem 1.5rem 0.5rem 1.5rem',
      marginLeft: '-0.9375rem',
    },

    [theme.breakpoints.down('md')]: {
      paddingTop: '0.25rem',
      paddingBottom: '0.25rem',
    },

    '& .logoContainer': {
      width: '2.5rem',
      height: '2.5rem',
    },

    '& .toggle': {
      marginRight: '0.5rem',

      [theme.breakpoints.down('sm')]: {
        marginRight: 0,
      },
    },
  })
);

export const StyledActionsBlock = styled('div', { name: 'StyledActionsBlock' })(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '1rem',
  width: '100%',
  height: '2.5rem',
  maxWidth: '46.5rem',

  [theme.breakpoints.down('lg')]: {
    width: 'fit-content',
  },

  [theme.breakpoints.down('sm')]: {
    gap: '0.875rem',
    alignItems: 'center',
  },
}));
