import { Stack, styled } from '@mui/material';

export const StyledCopyTooltipTitleWrapper = styled(Stack, { name: 'StyledCopyTooltipTitleWrapper' })(() => ({
  cursor: 'pointer',
  flexDirection: 'row',
  gap: '0.25rem',
  alignItems: 'center',
}));
