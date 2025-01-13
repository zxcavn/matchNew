import { styled } from '@mui/material';

import { shouldForwardProp } from '../../../../helpers';

type Props = {
  $color?: string;
  $backgroundColor?: string;
};
export const StyledBadge = styled('span', { shouldForwardProp, name: 'StyledBadge' })<Props>(
  ({ theme, $color, $backgroundColor }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '2rem',
    padding: '0 1rem',
    borderRadius: '2rem',
    width: 'fit-content',
    whiteSpace: 'nowrap',
    color: $color,
    backgroundColor: $backgroundColor,
    ...theme.typography.body2,
  })
);
