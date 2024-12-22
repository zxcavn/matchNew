import { Box, styled } from '@mui/material';

import { Spinner } from '@/lib/xfi.lib/components/atoms';
import { shouldForwardProp } from '@/lib/xfi.lib/helpers';

export const StyledSearchInputContainer = styled(Box, { name: 'StyledSearchInputContainer' })({
  width: '100%',
  position: 'relative',
  zIndex: 3,

  '& .collapse': {
    position: 'absolute',
    borderRadius: '1.5rem',
    transform: 'translateY(100%)',
    bottom: '-0.375rem',
    left: 0,
    right: 0,
    zIndex: 3,
  },
});

export const StyledDropdown = styled('div', { name: 'StyledDropdown' })(({ theme }) => ({
  borderRadius: '1.5rem',
  padding: '0.875rem 1.25rem',
  boxShadow: theme.palette.shadow.primary,
  backgroundColor: theme.palette.neutrals.dark,
}));

export const StyledSearchResultItemContainer = styled(Box, {
  name: 'StyledSearchResultItemContainer',
  shouldForwardProp,
})<{
  $isCursorPointer?: boolean;
}>(({ $isCursorPointer }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '0.5rem',
  cursor: $isCursorPointer ? 'pointer' : 'initial',
}));

export const StyledSpinner = styled(Spinner, {
  name: 'StyledSpinner',
})(({ theme }) => ({
  borderTop: `2px solid ${theme.palette.primary.main}`,
}));
