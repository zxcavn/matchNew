import { styled } from '@mui/material';

import { shouldForwardProp } from '@/lib/xfi.lib/helpers';

export const StyledResourcesLink = styled('a', { name: 'StyledResourcesLink', shouldForwardProp })<{
  $selected?: boolean;
}>(({ theme, $selected }) => ({
  display: 'inline-flex',
  gap: '1.5rem',
  alignItems: 'flex-end',
  fontFamily: 'Infynyte',
  fontSize: '3rem',
  lineHeight: '3rem',
  fontWeight: '600',

  [theme.breakpoints.up('lg')]: {
    color: $selected ? theme.palette.primary.main : theme.palette.common.white,
  },

  [theme.breakpoints.down('md')]: {
    fontSize: '2rem',
    lineHeight: '2rem',
    gap: '1rem',
  },

  '&:hover': {
    color: theme.palette.primary.main,

    '.linkWrapper svg *': {
      stroke: theme.palette.primary.main,
    },
  },

  '&.small': {
    fontSize: '1.5rem',
    lineHeight: '1.5rem',
    gap: '0.5rem',

    [theme.breakpoints.down('md')]: {
      fontSize: '1rem',
      lineHeight: '1rem',
    },

    '.linkWrapper svg': {
      marginLeft: '0.5rem',
      fontSize: '0.75rem',

      [theme.breakpoints.down('md')]: {
        fontSize: '0.625rem',
      },
    },
  },

  '.linkWrapper': {
    textTransform: 'lowercase',
    color: $selected ? theme.palette.primary.main : theme.palette.background.light,
    transition: LINK_TRANSITION,

    '&:hover': {
      color: theme.palette.primary.main,
    },

    [theme.breakpoints.down(430)]: {
      maxWidth: '20rem',
    },

    svg: {
      marginLeft: '1.5rem',
      fontSize: '1.5rem',

      [theme.breakpoints.up('lg')]: {
        '> *': {
          transition: LINK_TRANSITION,
          stroke: $selected ? theme.palette.primary.main : theme.palette.background.light,
        },
      },

      [theme.breakpoints.down('md')]: {
        marginLeft: '1rem',
        fontSize: '0.625rem',
      },
    },
  },
}));

const LINK_TRANSITION = 'all 0.3s';
