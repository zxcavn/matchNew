import { Box, styled } from '@mui/material';

import { AppThemeVariant } from '@/lib/xfi.lib/theme';

export const StyledEcosystemCard = styled(Box, { name: 'StyledEcosystemCard' })(({ theme }) => ({
  position: 'relative',
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  overflow: 'hidden',
  gap: '1.5rem',

  '& .ecosystemCardLogo': {
    alignSelf: 'start',
    filter: 'grayscale(100%)',
  },

  '& .ecosystemCardLink': {
    '&:hover': {
      [theme.breakpoints.up('lg')]: {
        color: theme.palette.primary.main,

        '& .ecosystemCardArrow': {
          path: { stroke: theme.palette.primary.main },
        },
      },
    },
  },

  '& .ecosystemButtonLink': {
    width: '100%',
    height: '7.875rem',
    padding: '2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    zIndex: 1,
  },

  '.bg': {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'transparent',
  },

  '.bgHover': {
    display: 'none',
  },

  a: {
    '&:hover': {
      [theme.breakpoints.up('lg')]: {
        color: theme.palette.primary.main,
      },
    },
  },

  '& .textWrapper': {
    position: 'relative',
    maxWidth: '30rem',
  },

  '&:hover': {
    [theme.breakpoints.up('lg')]: {
      '& .ecosystemCardLogo': {
        filter: 'grayscale(0%)',
      },
    },
  },

  '@keyframes background': {
    from: {
      opacity: '0',
    },
    to: {
      opacity: '1',
    },
  },
}));

export const StyledHoverCard = styled(Box, { name: 'StyledHoverCard' })(({ theme }) => ({
  width: '100%',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  border: `1px solid ${theme.palette.neutrals.border}`,
  borderRadius: '0.75rem',
  overflow: 'hidden',
  gap: '1.5rem',
  zIndex: 100,

  '&:hover': {
    [theme.breakpoints.up('lg')]: {
      borderColor: 'transparent',
      borderBottom: `2px solid ${theme.palette.primary.light}`,
      margin: '-0.5px 0',

      '.bg': {
        animation: 'background 0.5s linear',
        background:
          theme.palette.mode === AppThemeVariant.dark
            ? 'linear-gradient(0deg, rgba(1, 5, 22, 0.05), rgba(1, 5, 22, 0.05)), linear-gradient(121.78deg, rgba(255, 255, 255, 0.1) 24.4%, rgba(255, 255, 255, 0) 69.12%)'
            : 'linear-gradient(0deg, rgba(10, 165, 217, 0.08), rgba(10, 165, 217, 0.08)),linear-gradient(121.78deg, rgba(255, 255, 255, 0.1) 24.4%, rgba(255, 255, 255, 0) 69.12%)',
      },

      '.bgHover': {
        display: 'block',
        position: 'absolute',
        width: '100%',
        height: '100%',
        bottom: '-52%',
        animation: 'background 0.3s linear',
        backgroundImage:
          theme.palette.mode === AppThemeVariant.dark ? 'url(/images/background/resourcesLinkBg.webp)' : 'initial',
      },
    },
  },
}));
