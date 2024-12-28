import { styled } from '@mui/material';

import { AppThemeVariant } from './../../../theme';

export const StyledFigureContainer = styled('div', { name: 'StyledFigureContainer' })(({ theme }) => ({
  width: '25rem',
  height: '25rem',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 0,

  [theme.breakpoints.down('md')]: {
    width: '18rem',
    height: '18rem',
  },

  '&:after': theme.palette.mode === AppThemeVariant.dark && {
    content: "''",
    position: 'absolute',
    width: '21.8rem',
    height: '21.8rem',
    borderRadius: '21.8rem',
    background: 'rgba(0, 64, 95, 0.80)',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -55%)',
    filter: 'blur(4.938rem)',
    zIndex: 1,
  },

  '& img': {
    zIndex: 2,
  },
}));
