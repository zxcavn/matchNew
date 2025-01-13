import { ThemeOptions } from '@mui/material';

import { lightPalette } from '../palette';
import commonThemeSettings from './commonThemeSettings';

const lightTheme: ThemeOptions = {
  ...commonThemeSettings,
  palette: lightPalette,
};

export default lightTheme;
