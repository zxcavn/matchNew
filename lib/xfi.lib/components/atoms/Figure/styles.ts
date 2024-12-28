import { Box, styled } from '@mui/material';

import { shouldForwardProp } from '../../../helpers';

export const StyledFigure = styled(Box, { shouldForwardProp, name: 'StyledFigure' })<{
  $size: number;
  $color: 'primary' | 'secondary';
}>(({ theme, $size, $color }) => {
  const backgroundColor = {
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
  }[$color];

  return {
    position: 'relative',
    width: `${$size}rem`,
    height: `${$size}rem`,
    flexShrink: 0,
    flexGrow: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '64% 36% 65% 38% / 38% 35% 37% 38%',
    backgroundColor,
  };
});
