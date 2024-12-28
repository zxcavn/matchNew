import { ThemeOptions } from '@mui/material';

import { darkPalette } from '../palette';
import commonThemeSettings from './commonThemeSettings';

const darkTheme: ThemeOptions = {
  ...commonThemeSettings,
  palette: darkPalette,
};

export default darkTheme;
