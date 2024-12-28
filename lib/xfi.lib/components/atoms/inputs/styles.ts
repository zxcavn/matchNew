import { styled } from '@mui/material';

import { shouldForwardProp } from '../../../helpers';

export const StyledSelectContainer = styled('div', { name: 'StyledSelectContainer', shouldForwardProp })<{
  $isFullWidth?: boolean;
}>(({ theme, $isFullWidth }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
  position: 'relative',
  width: $isFullWidth ? '100%' : 'auto',

  '& .title': {
    paddingLeft: '1rem',
  },

  '& .captionWrapper': {
    position: 'absolute',
    bottom: '-1.56rem',
    paddingLeft: '1rem',
    color: theme.palette.neutrals.secondaryText,

    '&.isError': {
      color: theme.palette.alerts.error,
    },
  },
}));
