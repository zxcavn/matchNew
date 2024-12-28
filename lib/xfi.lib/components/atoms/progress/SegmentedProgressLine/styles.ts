import { alpha, Stack, styled } from '@mui/material';

import { shouldForwardProp } from '../../../../helpers';

export const StyledSegmentedProgressLine = styled(Stack, { name: 'StyledSegmentedProgressLine', shouldForwardProp })<{
  $isEmpty: boolean;
}>(({ theme, $isEmpty }) => ({
  position: 'relative',
  flexDirection: 'row',
  gap: '0.25rem',
  width: '100%',
  height: '0.375rem',
  alignItems: 'start',

  '&::before': {
    content: "''",
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: '0.5px',
    borderRadius: '0.5625rem',
    background: $isEmpty ? alpha(theme.palette.background.light, 0.1) : 'transparent',
  },

  '.progress': {
    position: 'relative',
    maxWidth: '100%',
    height: '100%',
    borderRadius: '0.5625rem',
  },
}));
