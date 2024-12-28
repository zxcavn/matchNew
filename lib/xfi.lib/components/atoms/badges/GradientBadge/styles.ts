import { Box, styled } from '@mui/material';

import { shouldForwardProp } from '../../../../helpers/common';
import type { GradientBadgeType } from '../../../../theme/theme';

const WHITE_LINEAR_GRADIENT = 'linear-gradient(180deg, rgba(255, 255, 255, 0.64) 0%, rgba(255, 255, 255, 0) 79.41%)';

export const StyledBadgeContainer = styled(Box, { name: 'StyledBadgeContainer', shouldForwardProp })<{
  $color: keyof GradientBadgeType;
}>(({ theme, $color }) => {
  const { color, background } = theme.palette.gradientBadge[$color];

  return {
    ...theme.typography.subtitle2,
    color,
    background,
    padding: '0.4rem 1rem',
    position: 'relative',
    borderRadius: '4.375rem',
    width: 'fit-content',
    height: 'fit-content',

    '&:after': {
      content: '""',
      position: 'absolute',
      top: '0.75px',
      left: '0.625rem',
      right: '0.625rem',
      height: '0.75rem',
      borderRadius: '7.5rem',
      background: WHITE_LINEAR_GRADIENT,
    },
  };
});
