import type { SxProps } from '@mui/material';

import type { theme } from './ThemeProvider';

export enum AppThemeVariant {
  dark = 'dark',
  light = 'light',
}

export type Theme = typeof theme;

export type ThemeSxProps = SxProps<Theme>;
