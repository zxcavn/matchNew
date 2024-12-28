import { Menu, menuClasses, styled, SxProps } from '@mui/material';

import { shouldForwardProp } from '../../../helpers/';

export const StyledMenu = styled<typeof Menu>(props => <Menu {...props} />, {
  name: 'StyledMenu',
  shouldForwardProp,
})<{ $minWidth?: string | number; $paperSx?: SxProps }>(({ theme, $minWidth = 'auto', $paperSx = {} }) => ({
  [`& .${menuClasses.paper}`]: {
    minWidth: $minWidth,
    display: 'flex',
    padding: '0.5rem',
    borderRadius: '1.5rem',
    backgroundColor: theme.palette.neutrals.dark,
    ...$paperSx,
  },

  [`& .${menuClasses.list}`]: {
    '&.MuiList-root': {
      padding: 0,
      boxShadow: 'none',
    },
  },
}));
