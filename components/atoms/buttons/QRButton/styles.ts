import { Box, Popover as MUIPopover, styled } from '@mui/material';

import { AppThemeVariant } from '@/lib/xfi.lib/theme';

export const StyledIconContainer = styled(Box, { name: 'StyledIconContainer' })(({ theme }) => ({
  width: '1.25rem',
  height: '1.25rem',

  svg: {
    path: {
      stroke: theme.palette.mode === AppThemeVariant.dark ? theme.palette.common.white : theme.palette.primary.main,
    },
  },
}));

export const StyledQRCode = styled(Box, { name: 'StyledQRCode' })(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '1.5rem',
  padding: '1.5rem',
  position: 'relative',
  maxWidth: '9.75rem',
  maxHeight: '9.75rem',
  backdropFilter: 'blur(10px)',

  ...(theme.palette.mode === AppThemeVariant.dark
    ? {
        border: `1px solid ${theme.palette.neutrals.border}`,
        background: theme.palette.gradient.card,
      }
    : {
        background: theme.palette.common.white,
      }),
}));

export const StyledPopover = styled(MUIPopover, { name: 'StyledPopover' })(({ theme }) => ({
  touchAction: 'none',
  transform: 'translateY(0.5rem)',

  '& .MuiPaper-root': {
    zIndex: theme.zIndex.tooltip,
    height: '9.75rem',
    background: 'none',
    touchAction: 'none',
  },

  '&& .MuiPopover-paper': {
    borderRadius: '1.5rem',
    boxShadow: theme.palette.shadow.primary,
  },
}));
