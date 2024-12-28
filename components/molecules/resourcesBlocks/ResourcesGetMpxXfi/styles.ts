import { Stack, styled } from '@mui/material';

import { AppThemeVariant } from '@/lib/xfi.lib/theme';

export const StyledResourcesGetMpxXfi = styled(Stack, { name: 'StyledResourcesGetMpxXfi' })(({ theme }) => ({
  position: 'relative',
  padding: '0 7.0625rem 0 10rem',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '2rem',

  [theme.breakpoints.down(1300)]: {
    padding: '0 3.5rem 0 5rem',
  },

  [theme.breakpoints.down('md')]: {
    padding: '0',
    gap: '1rem',
    flexDirection: 'column',
  },

  '& .getMpxFontStyle': {
    fontSize: '1.5rem',
    fontWeight: 600,
    lineHeight: '2rem',

    [theme.breakpoints.down('md')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
  },

  '& .getMpxButton': {
    '&:hover': {
      [theme.breakpoints.up('lg')]: {
        '& path': {
          stroke: theme.palette.primary.main,
        },

        '& .getMpxFontStyle': {
          color: theme.palette.primary.main,
        },
      },
    },
  },

  '.imageWrapper': {
    position: 'relative',
    minWidth: '25.3125rem',
    height: '25.3125rem',

    '& > img': {
      zIndex: 1,
    },

    [theme.breakpoints.down('md')]: {
      minWidth: '15.3125rem',
      height: '15.3125rem',
    },
  },

  '& .link': {
    zIndex: 10,
    position: 'relative',
    height: '11rem',
    width: '100%',
    display: 'inline-flex',
    gap: '1.5rem',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Infynyte',
    border: `1px solid ${theme.palette.neutrals.border}`,
    borderRadius: '0.75rem',
    fontSize: '3rem',
    lineHeight: '3rem',
    fontWeight: '600',
    overflow: 'hidden',

    [theme.breakpoints.down('md')]: {
      minWidth: '9.75rem',
      maxHeight: '4.625rem',
      fontSize: '2rem',
      lineHeight: '2rem',
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

    '&:hover': {
      [theme.breakpoints.up('lg')]: {
        border: `1px solid transparent`,
        borderBottom: `2px solid ${theme.palette.primary.light}`,
        color: theme.palette.primary.main,

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
          bottom: '-40%',
          animation: 'background 0.3s linear',
          backgroundImage:
            theme.palette.mode === AppThemeVariant.dark ? 'url(/images/background/resourcesLinkBg.webp)' : 'initial',
        },
      },
    },
  },

  '.resourceBgImage': {
    display: theme.palette.mode === AppThemeVariant.dark ? 'initial' : 'none',
    position: 'absolute',
    top: '-12rem',
    left: '-13rem',
    height: '45rem',
    width: '45rem',
    overflow: 'hidden',

    [theme.breakpoints.down('md')]: {
      display: 'none',
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
