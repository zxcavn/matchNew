import { Theme } from '@mui/material';

import { AppThemeVariant } from '@/lib/xfi.lib/theme';

export const getIconColor = (theme: Theme) =>
  theme.palette.mode === AppThemeVariant.dark ? theme.palette.background.light : theme.palette.primary.main;
