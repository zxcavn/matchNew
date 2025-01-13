import { Box, useTheme } from '@mui/material';

import { AppThemeVariant } from '../../../../theme';

const NOT_THEME_BG_COLOR = '#151929';

export const Background = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === AppThemeVariant.dark;

  return (
    <>
      <Box
        borderRadius="1rem 0 0 0"
        sx={{ background: theme.palette.gradient.mobileSidebar }}
        position="absolute"
        top={0}
        left={0}
        bottom={0}
        right="calc(50% + 3.0625rem)"
      />
      <Box
        borderRadius="0 1rem 0 0"
        sx={{ background: theme.palette.gradient.mobileSidebar }}
        position="absolute"
        top={0}
        right={0}
        bottom={0}
        left="calc(50% + 3.0625rem)"
        boxShadow={theme.palette.shadow.primary}
      />
      <Box position="absolute" top={0} bottom={0} right="calc(50% - 3.125rem)" left="calc(50% - 3.125rem)">
        <svg width="100" height="64" viewBox="0 0 100 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 64V0H3.43903C10.5731 0 16.4423 5.27145 20.1865 11.3439C26.3491 21.3383 37.3965 28 50 28C62.6035 28 73.6509 21.3383 79.8135 11.3439C83.5577 5.27147 89.4269 0 96.561 0H100V64H0Z"
            fill={isDarkMode ? NOT_THEME_BG_COLOR : theme.palette.common.white}
          />
        </svg>
      </Box>
    </>
  );
};
