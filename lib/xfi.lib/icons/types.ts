import { PaletteMode } from '@mui/material';
import { ElementType } from 'react';

export type ThemeIcon = Readonly<Record<PaletteMode, ElementType>>;

export const isThemeIcon = (icon: unknown): icon is ThemeIcon => {
  const isNotNull = icon !== null;
  const isObject = typeof icon === 'object';
  const hasLightProperty = isNotNull && isObject && 'light' in icon;
  const hasDarkProperty = isNotNull && isObject && 'dark' in icon;

  return isNotNull && hasLightProperty && hasDarkProperty;
};
