import { useMediaQuery as useMediaQueryHook } from '@mui/material';
import { Components, createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

import { LocalStorageService } from '../services';
import { AppThemeVariant } from './types';
import { darkTheme, getComponentsSettings, lightTheme } from './variants';

const GlobalStyles = dynamic(() => import('@mui/material/GlobalStyles').then(m => m.default), { ssr: false });

export type ThemeContextValue = {
  themeVariant: AppThemeVariant;
  toggleTheme: () => void;
};

const ThemeContext = createContext({
  themeVariant: AppThemeVariant.dark,
  toggleTheme: () => {},
});

export const useTheme = () => useContext<ThemeContextValue>(ThemeContext);

const userTheme = LocalStorageService.getAppTheme();
const initialTheme = userTheme === AppThemeVariant.light ? lightTheme : darkTheme;
const initialThemeState = userTheme === AppThemeVariant.light ? AppThemeVariant.light : AppThemeVariant.dark;

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [themeVariant, setThemeVariant] = useState<AppThemeVariant>(initialThemeState);

  useEffect(() => {
    if (!LocalStorageService.getAppTheme()) {
      LocalStorageService.setAppTheme(AppThemeVariant.dark);
    } else {
      const userTheme = LocalStorageService.getAppTheme();

      setThemeVariant(userTheme === AppThemeVariant.light ? AppThemeVariant.light : AppThemeVariant.dark);
    }
  }, []);

  const toggleTheme = () => {
    const newThemeVariantState = themeVariant === AppThemeVariant.light ? AppThemeVariant.dark : AppThemeVariant.light;
    const isLight = newThemeVariantState === AppThemeVariant.light;

    theme = createTheme(isLight ? lightTheme : darkTheme);
    LocalStorageService.setAppTheme(isLight ? AppThemeVariant.light : AppThemeVariant.dark);

    theme.components = getComponentsSettings(theme);
    setThemeVariant(newThemeVariantState);
  };

  return (
    <ThemeContext.Provider value={{ themeVariant, toggleTheme }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
      <GlobalStyles
        styles={{
          body: {
            background: theme.palette.background.dark,
            color: theme.palette.background.light,
          },
        }}
      />
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export const useMediaQuery = useMediaQueryHook<typeof theme>;

export let theme = createTheme({ ...initialTheme });

const common: Components = getComponentsSettings(theme);

theme.components = common;
