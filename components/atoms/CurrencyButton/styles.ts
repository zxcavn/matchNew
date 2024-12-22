import { alpha, styled } from '@mui/material';

import { shouldForwardProp } from '@/lib/xfi.lib/helpers';

const BUTTON_BACKGROUND = '#010516';
const BOX_SHADOW = ['4px 4px 20px 0px #0CC2FF4D', '-4px -4px 10px 0px #0CC2FF1A', '2px 2px 2px 0px #0CC2FF'];

export const StylesCurrencyButton = styled('button', { name: 'StylesCurrencyButton', shouldForwardProp })<{
  $isActive: boolean;
}>(({ theme, $isActive, disabled }) => ({
  cursor: disabled ? 'cursor' : 'pointer',
  padding: '0.5rem 1rem 0.5rem 0.5rem',
  display: 'flex',
  flexDirection: 'row',
  gap: '0.5rem',
  alignItems: 'center',
  backgroundColor: alpha(BUTTON_BACKGROUND, 0.05),
  border: `1px solid ${alpha(theme.palette.neutrals.border, 0.25)}`,
  borderRadius: '1.5rem',
  borderColor: $isActive ? alpha(theme.palette.primary.lighter!, 1) : undefined,
  transition: '0.5s',
  boxShadow: $isActive ? BOX_SHADOW : undefined,

  '.icon': {
    opacity: disabled ? 0.5 : 1,
  },

  '& .currency': {
    opacity: disabled ? 0.5 : 1,
  },

  '&:hover': {
    borderColor: !disabled && alpha(theme.palette.primary.lighter!, 1),
    boxShadow: !disabled && BOX_SHADOW,
  },
}));
