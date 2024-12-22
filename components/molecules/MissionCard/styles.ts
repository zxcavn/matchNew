import { Box, styled, Theme, Typography } from '@mui/material';

import { AppThemeVariant } from '@/lib/xfi.lib/theme';

const CARD_BLUE_MOBILE_BG_GRADIENT =
  'linear-gradient(359.97deg, rgba(13, 184, 242, 0.35) 0.02%, rgba(13, 184, 242, 0) 103.68%)';

const CARD_VIOLET_DESKTOP_BG_GRADIENT =
  'linear-gradient(90.11deg, rgba(37, 18, 52, 0.4) 0.08%, rgba(110, 54, 154, 0.4) 99.41%)';
const CARD_VIOLET_MOBILE_BG_GRADIENT =
  'linear-gradient(176.28deg, rgba(37, 18, 52, 0.4) 3.05%, rgba(110, 54, 154, 0.4) 96.48%)';
const CARD_VIOLET_BORDER_COLOR = '#9996E0';

const CARD_STYLES = {
  desktop: {
    background: {
      default: (theme: Theme) =>
        theme.palette.mode === AppThemeVariant.dark
          ? theme.palette.gradient.menuItemActive
          : theme.palette.gradient.card,
      socialNetwork: (theme: Theme) =>
        theme.palette.mode === AppThemeVariant.dark ? CARD_VIOLET_DESKTOP_BG_GRADIENT : 'transparent',
    },
  },
  mobile: {
    background: {
      default: (theme: Theme) =>
        theme.palette.mode === AppThemeVariant.dark ? CARD_BLUE_MOBILE_BG_GRADIENT : theme.palette.gradient.card,
      socialNetwork: (theme: Theme) =>
        theme.palette.mode === AppThemeVariant.dark ? CARD_VIOLET_MOBILE_BG_GRADIENT : 'transparent',
    },
  },
  border: {
    socialNetwork: (theme: Theme) =>
      theme.palette.mode === AppThemeVariant.light ? `1px solid ${CARD_VIOLET_BORDER_COLOR}` : 'none',
  },
};

export const StyledMissionCard = styled(Box, { name: 'StyledMissionCard' })<{
  $isSocialNetworkCard: boolean;
}>(({ theme, $isSocialNetworkCard }) => {
  const cardDesktopBackground =
    CARD_STYLES.desktop.background[$isSocialNetworkCard ? 'socialNetwork' : 'default'](theme);
  const cardMobileBackground = CARD_STYLES.mobile.background[$isSocialNetworkCard ? 'socialNetwork' : 'default'](theme);
  const cardBorder = $isSocialNetworkCard ? CARD_STYLES.border.socialNetwork(theme) : 'none';

  return {
    display: 'flex',
    alignItems: 'normal',
    borderRadius: '1.5rem',
    border: cardBorder,
    background: cardDesktopBackground,

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      background: cardMobileBackground,
    },
  };
});

export const StyledImageContainer = styled(Box, { name: 'StyledImageContainer' })(({ theme }) => ({
  background: theme.palette.background.dark,
  borderRadius: '1.5rem',
  width: '17.875rem',
  position: 'relative',
  overflow: 'hidden',
  flexShrink: 0,

  img: {
    objectFit: 'cover',
  },

  [theme.breakpoints.down('md')]: {
    height: 0,
    width: '100%',
    paddingTop: '65%',
  },
}));

export const StyledContentContainer = styled(Box, { name: 'StyledContentContainer' })(({ theme }) => ({
  width: '100%',
  height: '100%',
  padding: '2rem 2rem 2rem 2.5rem',
  display: 'flex',
  minHeight: '12.25rem',

  [theme.breakpoints.down('md')]: {
    padding: '3rem 1rem 1.5rem',
    minHeight: 'initial',
  },
}));

export const StyledDescriptionText = styled(Typography, { name: 'StyledDescriptionText' })(({ theme }) => ({
  '&': {
    fontWeight: 400,
    fontSize: '1.5rem',
    lineHeight: '2rem',
    color: theme.palette.background.light,

    [theme.breakpoints.down('lg')]: {
      fontSize: '1.25rem',
      lineHeight: '1.75rem',
    },
  },
}));
