import { Box, ButtonBase, Stack, styled } from '@mui/material';
import Link from 'next/link';

import { shouldForwardProp } from '../../../../helpers';

const NOT_THEME_INDICATOR_COLOR = '#0CC2FF';

export const StyledButton = styled(ButtonBase, { name: 'StyledButton', shouldForwardProp })<{ $isActive?: boolean }>(
  ({ theme, $isActive }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: '3.5rem',
    height: '3.5rem',
    borderRadius: '50%',
    background: theme.palette.gradient.mobileSidebar,

    ...($isActive && {
      '&:before': {
        content: "''",
        position: 'absolute',
        top: '0.75rem',
        right: '0.75rem',
        background: NOT_THEME_INDICATOR_COLOR,
        borderRadius: '50%',
        width: '0.25rem',
        height: '0.25rem',
      },
    }),
  })
);

export const StyledBottomNavigation = styled(Box, { name: 'StyledBottomNavigation', shouldForwardProp })<{
  $isOverflow?: boolean;
}>(({ theme, $isOverflow }) => ({
  width: '100%',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem 2rem',
  borderRadius: '1rem 1rem 0 0',
  background: $isOverflow ? 'none' : theme.palette.gradient.mobileSidebar,
  boxShadow: $isOverflow ? 'none' : theme.palette.shadow.primary,
}));

export const StyledSideItemsContainer = styled('div', { name: 'StyledSideItemsContainer' })(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '1.5rem',
  maxHeight: '2rem',
  zIndex: 1,
}));

export const StyledCenterItemsContainer = styled('div', { name: 'StyledCenterItemsContainer' })(() => ({
  width: '100%',
  maxWidth: '31.25rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  gap: '1.5rem',
  maxHeight: '2rem',
  zIndex: 1,
}));

export const StyledLink = styled(Link, { name: 'StyledLink' })(() => ({
  padding: '0.5rem',
  margin: '-0.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledOverflowContainer = styled(Stack, { name: 'StyledOverflowContainer' })(({ theme }) => ({
  position: 'relative',
  width: '100%',
  flexDirection: 'row',
  alignItem: 'center',
  justifyContent: 'space-between',
  zIndex: theme.zIndex.appBar,

  '& .round': {
    position: 'absolute',
    left: '50%',
    top: 0,
    transform: 'translate(-50%, -90%)',
    borderRadius: '50%',
    boxShadow: theme.palette.shadow.primary,
  },
}));
