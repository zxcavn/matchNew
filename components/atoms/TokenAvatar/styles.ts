import { styled } from '@mui/material';

import { shouldForwardProp } from '@/lib/xfi.lib/helpers';

export const StyledTokenAvatar = styled('div', { name: 'StyledTokenAvatar', shouldForwardProp })<{
  $backgroundColor: string;
}>(({ $backgroundColor }) => ({
  width: '1.5rem',
  height: '1.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  backgroundColor: $backgroundColor,
  flexShrink: 0,

  '& .letter': {
    lineHeight: 1,
    textTransform: 'uppercase',
  },
}));
