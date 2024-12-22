import { alpha, Box, Collapse, Stack, styled } from '@mui/material';

import { BlockLoader } from '@/lib/xfi.lib/components/atoms';

export const StyledContainer = styled(Stack, { name: 'StyledContainer' })(() => ({
  position: 'relative',
  width: '100%',
  zIndex: 2,
}));

export const StyledDropdown = styled(Box, { name: 'StyledDropdown' })(({ theme }) => ({
  borderRadius: '1.5rem',
  padding: '0.5rem',
  boxShadow: theme.palette.shadow.primary,
  backgroundColor: theme.palette.neutrals.dark,
  position: 'relative',
  minHeight: '3.375rem',
  overflow: 'hidden',
}));

export const StyledCollapse = styled(Collapse, { name: 'StyledCollapse' })(({ theme }) => ({
  position: 'absolute',
  borderRadius: '1.5rem',
  transform: 'translateY(100%)',
  bottom: '-0.15rem',
  left: 0,
  right: 0,
  boxShadow: theme.palette.shadow.primary,
}));

export const StyledDropdownLoader = styled(BlockLoader, { name: 'StyledDropdownLoader' })(() => ({
  transform: `scale(0.5)`,
}));

export const StyledLoaderContainer = styled(Stack, { name: 'StyledLoaderContainer' })(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: alpha(theme.palette.background.dark, 0.4),
}));
