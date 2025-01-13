import { styled } from '@mui/material';

import { AppThemeVariant } from '../../../../theme';

export const StyledPageLoaderContainer = styled('div', { name: 'StyledPageLoaderContainer' })(({ theme }) => ({
  height: '100%',
  width: '100%',
  position: 'fixed',
  top: 0,
  left: 0,
  overflow: 'hidden',
  background: theme.palette.background.dark,

  '& .loadingIcon': {
    width: '22rem',
    height: '5rem',
    color: theme.palette.mode === AppThemeVariant.dark ? theme.palette.common.white : theme.palette.neutrals.main,

    [theme.breakpoints.down('md')]: {
      width: '16rem',
      height: '2.5rem',
    },
  },
}));
